const mongoose = require('mongoose')
const validator = require('validator')

const model = mongoose.model('Category', {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subType:{
    type: String,
    required: true,
  }
})

module.exports = model;
