const { model } = require('mongoose')
const { user, product, movement } = require('./schemas')

module.exports = {
  User: model('User', user),
  Product: model('Product', product),
  Movement: model('Movement', movement)
}