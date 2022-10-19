require('dotenv').config()

const {
  connect,
  disconnect,
  Types: { ObjectId },
  default: mongoose,
} = require("mongoose");
const { User, Product, Movement } = require("../../../models");
const createMovementOutput = require(".");

const { MONGO_URL_TEST } = process.env

describe("createMovementOutputs", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

  //beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany(), Movement.deleteMany()]));

  beforeEach(() => mongoose.connection.db.dropDatabase())

  it("succeeds on correct data (user, product and movement", () => {
    // happy path

    const user2 = new User({
      name: "Mango Alto",
      email: "mango@alto.com",
      password: "123123123",
    });

    const product2 = new Product({
      user: user2.id,
      name: "Fanta naranja",
      category: "drink",
      quantity: 40,
    });

    return Promise.all([
      user2.save(),
      product2.save(),

    ]).then(([user2, product2]) => {
      return createMovementOutput(user2.id, product2.id, 10).then((result) => {
        expect(result).toBeUndefined();

        return Product.findById(product2._id)
          .then(productModified => {
            expect(productModified).toBeDefined();
            expect(productModified.name).toEqual(product2.name);
            expect(productModified.category).toEqual(product2.category);
            expect(productModified.quantity).toEqual(30);

            return Movement.find({}).then((movements) => {
              expect(movements).toHaveLength(1);

              const movement = movements[0];

              expect(movement.quantity).toEqual(10);
              expect(movement.movement).toEqual("output");
              expect(movement.createAt).toBeInstanceOf(Date);
              expect(movement.product.toString()).toEqual(product2._id.toString());
            });

          })

      });
    });
  });

  //afterEach(() => Promise.all([User.deleteMany(), Product.deleteMany(), Movement.deleteMany()]));
  afterEach(() => mongoose.connection.db.dropDatabase())

  afterAll(() => disconnect());
});
