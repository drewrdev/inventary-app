require('dotenv').config()

const { connect, disconnect, Types: { ObjectId }, default: mongoose, } = require("mongoose")
const { User } = require("../../../models")
const { NotFoundError } = require("errors")
const retrieveUser = require(".")

const { MONGO_URL_TEST } = process.env

describe("retrieveUser", () => {
  // jest.setTimeout(30000);
  beforeAll(() => connect(MONGO_URL_TEST))

  // beforeEach(() => User.deleteMany({}))

  beforeEach(() => mongoose.connection.db.dropDatabase())

  it("succeeds on existing user", () => { // happy path
    const name = "Mongo Bajito"
    const email = "mongo@bajito.com"
    const password = "123123123"

    return User.create({ name, email, password })
      .then(user =>
        retrieveUser(user.id)
          .then(user => {
            expect(user).toBeDefined()
            expect(user.name).toEqual(name)
            expect(user.email).toEqual(email)

            expect(user.password).toBeUndefined()
          })
      )
  })

  it("fails on non-existing user", () => { // unhappy path
    const userId = new ObjectId().toString()

    return retrieveUser(userId)
      .catch(error => {
        expect(error).toBeInstanceOf(NotFoundError)
        expect(error.message).toEqual(`user with id ${userId} not found`)
      })
  })

  afterEach(() => mongoose.connection.db.dropDatabase())

  afterAll(() => disconnect())
})
