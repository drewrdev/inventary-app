require("dotenv").config();


const { connect, disconnect, Types: { ObjectId }, default: mongoose } = require("mongoose");
const { User, Product } = require("../../../models");
const { NotFoundError } = require("errors");
const retrieveProducts = require(".");

const { MONGO_URL_TEST } = process.env

describe("retrieveProducts", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

  // beforeEach(() => Promise.all([User.deleteMany({}), Product.deleteMany({})]));

  beforeEach(() => mongoose.connection.db.dropDatabase())

  it("succeeds on existing user and product", () => {
    // happy path

    // const name = "Michael Jordan";
    // const email = "michael@jordan.com";
    // const password = "123123123";

    const productName = "Fanta";
    const category = "drink";
    const quantity = 30;
    const description = "";

    const user1 = new User({ 
      name : "Mango Perdido",
      email : "mango@perdido.com",
      password : "123123123" });

    const product1 = new Product({
      user: user1.id,
      name: productName + 1,
      category: category + 1,
      quantity: quantity + 1,
      description: description 
    });
    const product2 = new Product({
      user: user1.id,
      name: productName + 2,
      category: category + 2,
      quantity: quantity + 2,
      description: description 
    });

    const user2 = new User({ 
      name: "Magic Johnson",
      email: "magic@johnson.com",
      password: "123123123", });

    const product3 = new Product({
      user: user2.id,
      name: productName + 3,
      category: category + 3,
      quantity: quantity + 3,
      description: description
    });
    const product4 = new Product({
      user: user2.id,
      name: productName + 4,
      category: category + 4,
      quantity: quantity + 4,
      description: description
    });

    return Promise.all([
      user1.save(),
      product1.save(),
      product2.save(),
      user2.save(),
      product3.save(),
      product4.save(),
    ])
    .then(([user1, product1, product2, user2, product3, product4]) => {

      return retrieveProducts(user1.id).then((products) => {
        expect(products).toHaveLength(4);
  
        const _product1 = products.find(
          (product) => product.id === product1.id
        );
    
        expect(_product1).toBeDefined();
        expect(_product1.name).toEqual(product1.name);
        expect(_product1.category).toEqual(product1.category);
        expect(_product1.quantity).toEqual(product1.quantity);
        expect(_product1.description).toBeUndefined();

        const _product2 = products.find(
          (product) => product.id === product2.id
        );
      
        expect(_product2).toBeDefined();
        expect(_product2.name).toEqual(product2.name);
        expect(_product2.category).toEqual(product2.category);
        expect(_product2.quantity).toEqual(product2.quantity);
        expect(_product2.description).toBeUndefined();

        const _product3 = products.find(
          (product) => product.id === product3.id
        );
      
        expect(_product3).toBeDefined();
        expect(_product3.name).toEqual(product3.name);
        expect(_product3.category).toEqual(product3.category);
        expect(_product3.quantity).toEqual(product3.quantity);
        expect(_product3.description).toBeUndefined();

        const _product4 = products.find(
          (product) => product.id === product4.id
        );
        // expect(_product.user.toString()).toEqual(user2.id)
        expect(_product4).toBeDefined();
        expect(_product4.name).toEqual(product4.name);
        expect(_product4.category).toEqual(product4.category);
        expect(_product4.quantity).toEqual(product4.quantity);
        expect(_product4.description).toBeUndefined();


      });
    });
  });


  // afterEach(() => Promise.all([User.deleteMany({}), Product.deleteMany({})]))
  afterEach(() => mongoose.connection.db.dropDatabase())

  afterAll(() => disconnect());
});
