const { User, Product } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { validateString, validateQuantity } = require("validators");
const { verifyObjectIdString } = require("../../../utils");

function createProduct(userId, name, category, quantity, description = "") {
  verifyObjectIdString(userId, "user id");
  validateString(name, "name");
  validateString(category, "category");
  validateString(description, "description");
  validateQuantity(quantity, "number");

  //check and retrieve users by ID
  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      //creates the product with the requested parameters
      return Product.create({ user: user._id, name, category, quantity, description,
      })
      .catch((error) => { throw new SystemError(error.message) });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = createProduct;
