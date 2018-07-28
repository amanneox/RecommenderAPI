const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const ReportModel = require('../model/Report.js')
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
// List All Report With POST ID from params
module.exports.getReports = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    ReportModel
      .find({ postID: event.pathParameters.id })
      .then(Report => callback(null, { statusCode: 200, body: JSON.stringify(Report) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.createReport = (event, context, callback) => {
    const data = JSON.parse(event.body)
    const id = event.pathParameters.id

    const Report = new  ReportModel({
      userID: data.userID,
      postID: id,
      value: data.value,
      like: data.like,
    })

    dbConnectAndExecute(mongoString, () => (
      Report
        .save()
        .then(() => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: Report.id }),
        }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ))
  }
