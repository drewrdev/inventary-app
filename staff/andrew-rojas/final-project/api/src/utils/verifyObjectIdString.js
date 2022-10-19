const { Types: { ObjectId } } = require("mongoose")
const { validateString } = require("validators")
const { FormatError } = require("errors")

function verifyObjectIdString( objectIdString, explain = 'Id') {
  validateString(objectIdString, explain)
  if ( !ObjectId.isValid(objectIdString)) throw new FormatError(`${explain} is not valid`)
}

module.exports = verifyObjectIdString