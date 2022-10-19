const { runWithErrorHandling, createLogger } = require("../../utils")
const { users: { registerUser } } = require("../../logic")
const logger = createLogger(module)

module.exports = (req, res) => {
  runWithErrorHandling(() => {
    const { body: { adminEmail, adminPassword, name, email, password } } = req

    return registerUser(adminEmail, adminPassword, name, email, password)
      .then(() => res.status(201).send())

    }, res, logger)
}