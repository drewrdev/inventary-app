import { validateString, validateCallback,validateQuantity } from 'validators'
import { AuthError, ClientError, ServerError, UnknownError } from 'errors'

const API_URL = process.env.REACT_APP_API_URL

/**
 * Checks create Product database
 * 
 * @param {string} name The product name
 * @param {string} category The category product
 * @param {number} quantity The quantity product
 * @param {string} description The description product
 * @param {function} callback The function expression that provides a result
 * 
 * @throws {FormatError | TypeError} On invalid inputs
 */

function createProduct(token, name, category, quantity, description, callback) {
  //validateText(token)
  validateString(name, "name")
  validateString(category, "category")
  validateQuantity(quantity, "quantity")
  validateString(description, "description")
  validateCallback(callback, "callback")

  const xhr = new XMLHttpRequest()

    // response

    xhr.onload = function() {
      const status = xhr.status

      switch(true) {
        case (status >= 500):
          callback(new ServerError('server error'))
          break
        case (status === 401):
          callback(new AuthError('aunthentica error'))
          break
        case (status >= 400): 
          callback(new ClientError('client error'))
          break
        case (status === 201):
          callback(null, token)
          break
        default:
          callback(new UnknownError(`unexpected status ${status}`))  
      }
  }

  xhr.onerror =function() {
    callback(new ServerError('connection failed'))
  }

   // request

   xhr.open('POST', `${API_URL}/product`)

   xhr.setRequestHeader('Authorization', `Bearer ${token}`)

   xhr.setRequestHeader('Content-type', 'application/json')

   const json = JSON.stringify({ name, category, quantity, description, callback })
    
    xhr.send(json)
}

export default createProduct