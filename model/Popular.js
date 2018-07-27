const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const model = mongoose.model('Polular', {
      value:{
        type:Number
      },
      postID:{
        type:Schema.ObjectId
      },

});

module.exports = model;
