function validateString(string, explain = 'string') {
  if (typeof string !== 'string') throw new TypeError(`${explain} is not valid`)
}

module.exports = validateString