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
});

module.exports = model;
