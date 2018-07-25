const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const PostModel = require('../model/Post.js')
require('dotenv').config()
mongoose.Promise = Promise;

const mongoString = process.env.MONGO_URI // MongoDB Url

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn)
}

module.exports.getPosts = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    PostModel
      .find()
      .then(post => callback(null, { statusCode: 200, body: JSON.stringify(post) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.createPost = (event, context, callback) => {
    const data = JSON.parse(event.body)
    console.log(data)
    const id = event.pathParameters.id
    const post = new  PostModel({
      name: data.name,
      location:{
        lat: data.lat,
        lng: data.lng,
        street: data.street,
        city: data.city,
        pincode: data.pincode,
        country: data.country,
      },
      reviews:{
        rating: data.rating,
        comment: data.comment,
      },
      value: data.value,
      category: id,
    })
    dbConnectAndExecute(mongoString, () => (
      post
        .save()
        .then(() => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: post.id }),
        }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ))
  }

  module.exports.deletePost = (event, context, callback) => {
    if (!validator.isAlphanumeric(event.pathParameters.id)) {
      callback(null, createErrorResponse(400, 'Incorrect id'))
      return
    }

    dbConnectAndExecute(mongoString, () => (
      PostModel
        .remove({ _id: event.pathParameters.id })
        .then(() => callback(null, { statusCode: 200, body: JSON.stringify('Ok') }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ))
  }

  module.exports.updatePost = (event, context, callback) => {
    const data = JSON.parse(event.body)
    const id = event.pathParameters.id

    if (!validator.isAlphanumeric(id)) {
      callback(null, createErrorResponse(400, 'Incorrect id'))
      return
    }

    const post = new PostModel({
      _id: id,
      name: data.name,
      location:{
        lat: data.lat,
        lng: data.lng,
        street: data.street,
        city: data.city,
        pincode: data.pincode,
        country: data.country,
      },
      reviews:{
        rating: data.rating,
        comment: data.comment,
      },
      value: data.value,
      category: id,
    })

    dbConnectAndExecute(mongoString, () => (
      PostModel.findByIdAndUpdate(id, user)
        .then(() => callback(null, { statusCode: 200, body: JSON.stringify('Ok') }))
        .catch(err => callback(err, createErrorResponse(err.statusCode, err.message)))
    ))
  }
