const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
// const { sanitiseList, sanitiseObject } = require('../utils/functions');

exports.user_list_get = async (req, res) => {
  try {
    const usersList = await User.find();

    res.status(200).json({
      title: 'Users List',
      success: true,
      message: 'Fetching user list was successful.',
      usersList 
    });
  } catch (err) {
    res.status(500).json({
      title: 'Users List',
      success: false,
      message: 'Uh Oh :( Users could not be fetched. ' + err.message,
    });
  }
};

exports.user_create_post = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      return res.status(409).json({
        title: 'Create new user',
        success: false,
        message: 'This user already exists in database',
      });
    } else {
      const createdUser = await newUser.save();
      // const sanitisedCreatedUser = sanitiseObject(createdUser);

      return res.status(200).json({
        title: 'Create new user',
        success: true,
        message: 'This new user was created in database',
        createdUser
      });
    }
  } catch (err) {
    res.status(500).json({
      title: 'Create new user',
      success: false,
      message: 'Eror while creating user. ' + err.message,
    });
  }
};

exports.user_find_list_param = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        title: 'Find User',
        success: false,
        message: 'User not found by this Id',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      title: 'Find User',
      success: false,
      message: 'Error while retrieving user. ' + err.message,
    });
  }
};

exports.user_detail_get = async (req, res) => {
  let { user } = req;
  // user = sanitiseObject(user);

  res.status(200).json({
    title: 'User Detail',
    success: true,
    message: 'User detail is fetched successfully',
    user
  });
};

exports.user_sign_in_post = async (req, res) => {
  const attemptingUser = req.body;
  
  const secret = process.env.AUTH_SECRET

  try {
    const foundUser = await User.findOne({ email: attemptingUser.email });

    if (!foundUser) {
      return res.status(404).json({
        title: 'User Sign-In',
        success: false,
        message: 'No registered user by this email',
      });
    } else {
      const foundPassword = foundUser.password;

      if (attemptingUser.password === foundPassword) {
        const accessToken = jwt.sign({ userId: foundUser._id }, secret);

        return res.status(200).json({
          title: 'User Sign-In',
          success: true,
          message: 'Successfully signed in',
          signedUser: foundUser,
          accessToken,
        });
      }

      res.status(401).json({
        title: 'User Sign-In',
        success: false,
        message: 'Password incorrect',
      });
    }
  } catch (err) {
    res.status(500).json({
      title: 'User Sign-In',
      success: false,
      message: 'Error while signing in. ' + err.message,
    });
  }
};

/*
TODO -
1. when the user successfully signs in, do not provide the password in json, only email, name & id
*/
