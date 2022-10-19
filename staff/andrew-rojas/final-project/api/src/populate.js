require('dotenv').config()

const { connect, disconnect, default: mongoose } = require("mongoose");
const { User, Product, Movement } = require('./models');


const { MONGO_URL } = process.env

connect(MONGO_URL)
  //.then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
  .then(() => mongoose.connection.dropDatabase())
  .then(() => {
    const michael = new User(
    {
      name: "Michael Jordan",
      email: "michael@jordan.com",
      password: "123123123",
      role: "admin"
    })

    const george = new User(
    {
      name: "George Russell",
      email: "george@russell.com",
      password: "123123123",
      role: "employee"
    })

    const carlos = new User(
    {
      name: "Carlos Sainz",
      email: "carlos@sainz.com",
      password: "123123123",
      role: "employee"
    })

    return Promise.all([
      michael.save(),
      george.save(),
      carlos.save(),
    ])


  })

  .then(([michael, george, carlos]) => {
    const product1 = new Product({
      user: michael.id,
      name: 'Fanta limon',
      category: 'drink',
      quantity: 30,
      description: ''
    })

    const product2 = new Product({
      user: george.id,
      name: 'Fanta naranja',
      category: 'drink',
      quantity: 60,
      description: ''
    })

    const product3 = new Product({
      user: carlos.id,
      name: 'Coca Cola',
      category: 'drink',
      quantity: 90,
      description: ''
    })

    return Promise.all([
      product1.save(),
      product2.save(),
      product3.save(),
    ])
      .then(([product1, product2, product3]) => {
        const movement1 = new Movement ({
          product: product1.id,
          category: 'drink',
          quantity: 10,
          movement: 'inputs'
        })

        const movement2 = new Movement ({
          product: product2.id,
          category: 'drink',
          quantity: 15,
          movement: 'outputs'
        })

        const movement3 = new Movement ({
          product: product3.id,
          category: 'drink',
          quantity: 20,
          movement: 'inputs'
        })

        return Promise.all([
          movement1.save(),
          movement2.save(),
          movement3.save(),
        ])
      

      })
  })

  .catch(error => {
    console.log(error)
  })
  .then(() => disconnect())
