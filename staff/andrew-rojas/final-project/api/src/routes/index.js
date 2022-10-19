const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler } = require('./users')
const { createProductHandler, retrieveProductsHandler, removeProductsHandler, searchProductsHandler } = require('./products')
const { movementInputHandler, movementOutputHandler } = require('./movement')



const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)
usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/users', retrieveUserHandler)
// TODO usersRouter.patch('/users/email', jsonBodyParser, updateUserEmailHandler)
// TODO usersRouter.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)
// TODO usersRouter.patch('/users/info', jsonBodyParser, updateUserInfoHandler)

const productRouter = Router()

productRouter.post('/product', jsonBodyParser, createProductHandler)
productRouter.get('/products', retrieveProductsHandler)
productRouter.delete('/product/:productId', removeProductsHandler)
productRouter.get('/products/search', searchProductsHandler)

const movementRouter = Router()

movementRouter.post('/movement/inputs/:productId', jsonBodyParser, movementInputHandler)
movementRouter.post('/movement/outputs/:productId', jsonBodyParser, movementOutputHandler)

module.exports = {
  usersRouter,
  productRouter,
  movementRouter
}