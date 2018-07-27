const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const CommentModel = require('../model/Comment.js')
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


module.exports.createComment = (event, context, callback) => {
    const data = JSON.parse(event.body)
    const id = event.pathParameters.id

    const comment = new  CommentModel({
      userID: data.userID,
      postID: id,
      comments: data.comments,
    })

    dbConnectAndExecute(mongoString, () => (
      comment
        .save()
        .then(() => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: comment.id }),
        }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ))
  }
