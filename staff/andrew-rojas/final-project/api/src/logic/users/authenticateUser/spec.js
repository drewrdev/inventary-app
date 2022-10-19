require("dotenv").config();


const { connect, disconnect, Types: { ObjectId }, default: mongoose } = require("mongoose")
const { User } = require("../../../models")
const { NotFoundError, AuthError } = require("errors")
const authenticateUser = require(".")

const { MONGO_URL_TEST } = process.env

describe("authenticateUser", () => {
  beforeAll(() => connect(MONGO_URL_TEST))

  beforeEach(() => mongoose.connection.db.dropDatabase())

  it("succeeds on existing user", () => { // happy path
    const name = "Mango Pequeño"
    const email = "mango@pequeño.com"
    const password = "123123123"

    return User.create({ name, email, password })
      .then(user =>
        authenticateUser(email, password)
          .then(userId =>
            expect(userId).toEqual(user.id)
      )
    )
  })

  afterEach(() => mongoose.connection.db.dropDatabase())

  afterAll(() => disconnect())
})
