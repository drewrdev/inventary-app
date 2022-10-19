const { runWithErrorHandling, createLogger, verifyToken } = require("../../utils")
const { movement: { movementOutput } } = require("../../logic")
const logger = createLogger(module)

module.exports = (req, res) => {
  const userId = verifyToken(req)
  runWithErrorHandling(() => {
    
    const { body: { quantity }, params: { productId } } = req

    return movementOutput(userId, productId, quantity)
      .then(() => res.status(200).send())
    }, res, logger)
}