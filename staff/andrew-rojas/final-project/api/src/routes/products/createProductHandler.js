const { runWithErrorHandling, createLogger, verifyToken } = require("../../utils")
const { products: { createProduct } } = require("../../logic")
const logger = createLogger(module)

module.exports = (req, res) => {
  runWithErrorHandling(() => {
    const userId = verifyToken(req)
    
    const { body: { name, category, quantity, description } } = req

    return createProduct(userId, name , category, quantity, description)
      .then(products => res.status(201).send(products))
    }, res, logger)
}