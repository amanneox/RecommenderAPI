const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const model = mongoose.model('Rating', {
      id:{
        type:Schema.ObjectId,
      },
      value:{
        type:Number
      },
      postID:{
        type:Schema.ObjectId
      },

});

module.exports = model;
