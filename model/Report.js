const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const model = mongoose.model('Report', {
      userID:{
        type:Schema.ObjectId,
      },
      message:{
        type:String
      },
      postID:{
        type:Schema.ObjectId
      },

});

module.exports = model;
