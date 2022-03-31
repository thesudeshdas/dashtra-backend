const express = require('express');
const mongoose = require('mongoose');

const mongooseConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://thesudeshdas:clusterCR7@clusterneog.qjpf2.mongodb.net/e-commerce?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    var db = mongoose.connection;
  } catch (err) {
    db.on(
      'error',
      console.error.bind(console, 'MongoDB connection error: ' + err)
    );
  }
};

exports.mongooseConnection = mongooseConnection;
