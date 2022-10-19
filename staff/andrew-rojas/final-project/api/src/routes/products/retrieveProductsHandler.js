const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { products: { retrieveProducts } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
  runWithErrorHandling(() => {
    const userId = verifyToken(req)
    
    return retrieveProducts(userId)
      .then(products => res.status(200).json(products))
 
  }, res, logger)
}