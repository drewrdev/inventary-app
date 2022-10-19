const { Schema } = require("mongoose")

const user = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role : {
    type: String,
    enum : ['admin', 'employee']
  }

})

module.exports = user


//Hacer el usuario adm