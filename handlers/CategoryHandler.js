const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const CategoryModel = require('../model/Category.js')
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

module.exports.getCategory = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    CategoryModel
      .find()
      .then(category => callback(null, { statusCode: 200, body: JSON.stringify(category) }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.createCategory = (event, context, callback) => {
    const data = JSON.parse(event.body)
    const id = event.pathParameters.id
    const category = new  CategoryModel({
      name: data.name,
      subType: data.subType,
      type: data.type,
    })

    dbConnectAndExecute(mongoString, () => (
      category
        .save()
        .then(() => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ id: category.id }),
        }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ))
  }

  module.exports.deleteCategory = (event, context, callback) => {
    if (!validator.isAlphanumeric(event.pathParameters.id)) {
      callback(null, createErrorResponse(400, 'Incorrect id'))
      return
    }

    dbConnectAndExecute(mongoString, () => (
      CategoryModel
        .remove({ _id: event.pathParameters.id })
        .then(() => callback(null, { statusCode: 200, body: JSON.stringify('Ok') }))
        .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
    ))
  }

  module.exports.updateCategory = (event, context, callback) => {
    const data = JSON.parse(event.body)
    const id = event.pathParameters.id


    const category = new CategoryModel({
      _id: id,
      name: data.name,
      subType: data.subType,
      type: data.type,
    })


    dbConnectAndExecute(mongoString, () => (
      UserModel.findByIdAndUpdate(id, user)
        .then(() => callback(null, { statusCode: 200, body: JSON.stringify('Ok') }))
        .catch(err => callback(err, createErrorResponse(err.statusCode, err.message)))
    ))
  }
