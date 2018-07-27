const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const Comment = require('./Comment.js')
const model = mongoose.model('Post', {
  name: {
    type: String,
    required: true,
  },
  location: {
    lat:{
      type:Number
    },
    lng:{
      type:Number
    },
    street:{
      type:String
    },
    pincode:{
      type:String
    },
    city:{
      type:String
    },
    country:{
      type:String
    }
  },
 images:{
   type:[String]
 },
  reviews:{
    rating:{
      type:Number
    },
    comment:{
      type:[String]
    },
  },
  value:{
    type:Number
  },
  category: {
    type:String
  },
})

module.exports = model;
