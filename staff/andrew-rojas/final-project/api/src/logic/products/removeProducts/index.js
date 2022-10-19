const { NotFoundError, AuthError, SystemError } = require("errors");
const { User, Product } = require("../../../models");
const { verifyObjectIdString } = require("../../../utils");

function removeProducts(userId, productId) {
  verifyObjectIdString(userId, "user id");
  verifyObjectIdString(productId, "product id");

  //check and retrieve users by ID only looking for the Admin
  return User.findById(userId)
    .then((user) => {
      if (user.role !== "admin") {
        throw new Error(`${user.name} does not have permission to delete`);
      }

      //retrieves the list of products and performs the operation (deleted) on the selected product
      return Product.findById(productId).then((productFound) => {
        if (!productFound) {
          throw new Error(`No product found with id ${productId}`);
        }
        return productFound.delete();
      });
    })
    .catch((error) => {
      throw new SystemError(error.message);
    });
}
module.exports = removeProducts;
