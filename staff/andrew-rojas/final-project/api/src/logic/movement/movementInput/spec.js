require('dotenv').config()

const {
  connect,
  disconnect,
  Types: { ObjectId },
  default: mongoose,
} = require("mongoose");
const { User, Product, Movement } = require("../../../models");
const createMovementInput = require(".");

const { MONGO_URL_TEST } = process.env

describe("createMovementInputs", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

  // beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany(), Movement.deleteMany()]));

  beforeEach(() => mongoose.connection.db.dropDatabase())

  it("succeeds on correct data (user, product and movement", () => {
    // happy path
    // const productName = "Fanta";
    // const category = "drink";
    // const quantity = 30;
    // const description = "";

    const user1 = new User({
      name: "Mango Bajito",
      email: "mango@bajito.com",
      password: "123123123",
    });

    const product1 = new Product({
      user: user1.id,
      name: "Fanta limon",
      category: "drink",
      quantity: 30,
    });

    //const movement1 = new Movement ({
    //  product: product1.id,
    //  category: 'drink',
    //  quantity: 20,
    //  movement: 'inputs'
    //})

    return Promise.all([
      user1.save(),
      product1.save(),
      //movement1.save()
    ]).then(([user1, product1]) => {
      return createMovementInput(user1.id, product1.id, 10).then((result) => {
        expect(result).toBeUndefined();

        return Product.findById(product1._id)
          .then(productModified => {
            expect(productModified).toBeDefined();
            expect(productModified.name).toEqual(product1.name);
            expect(productModified.category).toEqual(product1.category);
            expect(productModified.quantity).toEqual(40);
            // products do not have movements
            // expect(productModified.movement).toEqual(product1.movement)

            return Movement.find({}).then((movements) => {
              expect(movements).toHaveLength(1);

              const movement = movements[0];

              expect(movement.quantity).toEqual(10);
              expect(movement.movement).toEqual("input");
              expect(movement.createAt).toBeInstanceOf(Date);
              expect(movement.product.toString()).toEqual(product1._id.toString());
            });

          })

      });
    });
  });

  // afterEach(() => Promise.all([User.deleteMany(), Product.deleteMany(), Movement.deleteMany()]));
  afterEach(() => mongoose.connection.db.dropDatabase())

  afterAll(() => disconnect());
});
