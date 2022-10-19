require("dotenv").config();

const {
  connect,
  disconnect,
  Types: { ObjectId },
  default: mongoose,
} = require("mongoose");
const { User, Product } = require("../../../models");
const { NotFoundError } = require("errors");
const searchProducts = require(".");

const { MONGO_URL_TEST } = process.env;

describe("searchProducts", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

  // beforeEach(() => Promise.all([User.deleteMany({}), Product.deleteMany({})]));

  beforeEach(() => mongoose.connection.db.dropDatabase())

  it("succeeds on existing user and products", () => {
    // happy path


    const name = "Mango Encontrado";
    const email = "mango@encontrado.com";
    const password = "123123123";

    const user = new User({ name, email, password });

    const product1 = new Product({
      user: user.id,
      name: 'Nestea limon',
      category: 'drink',
      quantity: 30,
      description: ''
    })

    const product2 = new Product({
      user: user.id,
      name: 'Fanta naranja',
      category: 'drink',
      quantity: 60,
      description: ''
    })

    const product3 = new Product({
      user: user.id,
      name: 'Coca Cola',
      category: 'drink',
      quantity: 90,
      description: ''
    })
    const query = "Fan";

    return Promise.all([
      user.save(),
      product1.save(),
      product2.save(),
      product3.save()

    ]).then(([user, product1, product2, product3]) => {
      return searchProducts(user.id, query)
        .then((products) => {
          expect(products).toHaveLength(1);

          const [product] = products;

          expect(product).toBeDefined();
          expect(product.user).toBeUndefined();
          expect(product.text).toEqual(product2.text);
          expect(product.visibility).toEqual(product2.visibility);
          expect(product.createdAt).toEqual(product2.createdAt);
          expect(product.modifiedAt).toBeUndefined();
        })
    })
});


  // afterEach(() => Promise.all([User.deleteMany({}), Product.deleteMany({})]))
  afterEach(() => mongoose.connection.db.dropDatabase())

  afterAll(() => disconnect());
});
