const { User, Product } = require("../../../models")
const { NotFoundError, SystemError } = require("errors")
const { verifyObjectIdString } = require("../../../utils")

function retrieveProducts(userId) {
  verifyObjectIdString(userId, "user id")
  // verifyObjectIdString(productId, "product id")

  //check and retrieve users by ID
  return User.findById(userId).lean()
    .catch(error => {
      throw new SystemError(error.message)
    })
    .then(user => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`)

      // check and retrieve the products with the requested data
      return Product.find({}, 'date name quantity category createdAt modifiedAt').lean()
        .catch(error => {
          throw new SystemError(error.message)
        })
    })
    .then(products => {
      products.forEach(product => {
        //sanitize
        product.id = product._id.toString()
        delete product._id

        delete product.__v
      })

      return products
    })
}

module.exports = retrieveProducts
