const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const model = mongoose.model('Comment', {
      id:{
        type:Schema.ObjectId,
      },
      comments:{
          type:[String]
      },
      postID:{
        type:Schema.ObjectId
      },

});

module.exports = model;
