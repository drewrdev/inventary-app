const { Schema, Types: { ObjectId } } = require("mongoose")

const movement = new Schema ({

  product: {
    type: ObjectId,
    required: true,
    ref: "User"
  },

  /* Debería borrarse */
  category: {
    type: String,
    /* required: true */
    // enum: ['drinks', 'food']
  },

  quantity: {
    type: Number,
    required: true
  },

  /* it should be type */
  movement: {
    type: String,
    required: true,
    // enum: ['input', 'output']
  },

  createAt: {
    type: Date,
    default: Date.now
  },

 modifiedAt: {
    type: Date
 }

})

module.exports = movement