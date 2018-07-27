const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const model = mongoose.model('Rating', {
      userID:{
        type:Schema.ObjectId,
      },
      value:{
        type:Number
      },
      like:{
        type:Boolean,
        default: false
      },
      postID:{
        type:Schema.ObjectId
      },

});

module.exports = model;
