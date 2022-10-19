const { User, Product, Movement } = require("../../../models");
const { NotFoundError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

function createMovementInput(userId, productId, quantity, movement = "input") {
  verifyObjectIdString(userId, "user id");
  verifyObjectIdString(productId, "product id");
  // TODO VALIDATE QUANTITY (integer number)

  //check and retrieve users by ID
  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      //check and retrieve the products by the Id
      return Product.findById(productId).then((product) => {
        if (!product)
          throw new NotFoundError(`Product with id ${productId} not found`);

        //creates the movement with the requested parameters
        return Movement.create({ product: productId, quantity, movement })
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((movement) => {
            //if (!movement) throw new NotFoundError(`Movement creation failed`);

            product.quantity += quantity;

            return product.save();
          })
          .then(product => {});
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = createMovementInput;
