const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const RatingModel = require('../model/Rating.js')
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
// List All Rating With POST ID from params
module.exports.getRatings = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    RatingModel
      .find({ postID: event.pathParameters.id })
      .then(rating => callback(null, { statusCode: 200, body: JSON.stringify(rating) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.createRating = (event, context, callback) => {
    const data = JSON.parse(event.body)
    const id = event.pathParameters.id

    const rating = new  RatingModel({
      userID: data.userID,
      postID: id,
      value: data.value,
      like: data.like,
    })

    dbConnectAndExecute(mongoString, () => (
      rating
        .save()
        .then(() => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: rating.id }),
        }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ))
  }
