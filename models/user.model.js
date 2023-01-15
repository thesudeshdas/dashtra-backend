const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name must be less than 50 characters long'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  status: {
    type: String,
    enum: ['Active', 'Deprecated'],
    default: 'Active',
  },
});

module.exports = mongoose.model('User', UserSchema);
