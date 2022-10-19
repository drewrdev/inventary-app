const { Product } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { validateString } = require('validators')
const verifyObjectIdString = require('../../../utils/verifyObjectIdString')

function searchProducts(userId, query) {
    verifyObjectIdString(userId, 'user id')
    validateString(query)

    return Product.find({ name: { $regex: new RegExp(query) } }, 'name type').lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
      
              .then(products => {
            if (!products) throw new NotFoundError(`product with ${query} characters does not exist`)

            products.forEach(product => {
        
                product.id = product._id.toString()
                delete product._id

                delete product.__v
            })
                        
            return products
        })
}

module.exports = searchProducts