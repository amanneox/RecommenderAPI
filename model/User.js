const mongoose = require('mongoose');
const validator = require('validator');

const model = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  }
  username:{
    type: String,
    unique: true,
  }
});

module.exports = model;
