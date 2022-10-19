const { runWithErrorHandling, createLogger, verifyToken } = require("../../utils")
const { movement: { movementInput } } = require("../../logic")
const logger = createLogger(module)

module.exports = (req, res) => {
  const userId = verifyToken(req)
  runWithErrorHandling(() => {
    
    const { body: { quantity }, params: { productId } } = req

    return movementInput(userId, productId, quantity)
      .then(() => res.status(200).send())
    }, res, logger)
}