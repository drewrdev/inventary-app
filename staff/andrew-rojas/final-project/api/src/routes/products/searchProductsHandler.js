const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { products: { searchProducts } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
  runWithErrorHandling(() => {
    const userId = verifyToken(req)

    const { query: { q: query }} = req

    return searchProducts(userId, query)
      .then(products => res.status(200).json(products))

  }, res, logger)
}