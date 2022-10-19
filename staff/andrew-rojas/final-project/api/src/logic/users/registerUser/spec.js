require('dotenv').config()

const { connect, disconnect, Types: { ObjectId }, default: mongoose,} = require("mongoose")
const { User } = require("../../../models")
const { DuplicityError, FormatError } = require("errors")
const registerUser = require(".")

const { MONGO_URL_TEST } = process.env

describe("registerUser", () => {
  beforeAll(() => connect(MONGO_URL_TEST))

  //TODO revisar spec y probar

  beforeEach(() => mongoose.connection.db.dropDatabase())

  it("succeeds on new user",() => { // happy path
    
    const adminEmail = "michael@jordan.com"
    const adminPassword = "123123123"
    

    const name = "Mango Grande"
    const email = "mango@grande.com"
    const password = "123123123"
    

    return registerUser( adminEmail, adminPassword, name, email, password)
      .then(res => {
        expect(res).toBeUndefined()

        // return User.findOne( {email: adminEmail, password: adminPassword, role : 'admin'})
        

        return User.create ( name, email, password, role )

      })

      .then(users => {
        expect(users).toHaveLength(1)

        const [user] = users

        expect(user.adminEmail).toEqual(adminEmail)
        expect(user.adminPassword).toEqual(adminPassword)
        expect(user.name).toEqual(name)
        expect(user.email).toEqual(email)
        expect(user.password).toEqual(password)

      })
  })

  afterEach(() => mongoose.connection.db.dropDatabase())

  afterAll(() => disconnect())
})
