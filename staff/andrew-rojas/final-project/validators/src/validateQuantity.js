function validateQuantity(number, quantity = 'number') {
  if (typeof number !== 'number') throw new TypeError(`${quantity} is not valid`)
}

module.exports = validateQuantity