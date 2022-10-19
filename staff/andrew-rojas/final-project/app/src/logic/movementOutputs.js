import { validateCallback, } from 'validators'
import { AuthError, ClientError, ServerError, UnknownError } from 'errors'

const API_URL = process.env.REACT_APP_API_URL

/**
 * Checks create Product database
 * 
 * @param {string} name The product name
 * @param {number} quantity The quantity product
 * @param {function} callback The function expression that provides a result
 * 
 * @throws {FormatError | TypeError} On invalid inputs
 */

function movementOutputs(token, productId, quantity, callback) {
  // verifyObjectIdString(userId, "user id")
  //validateText(token)
    
  validateCallback(callback)

    
  const xhr = new XMLHttpRequest()

    // response
  
    xhr.onload = function () {
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
        case (status === 200):
          callback(null)
          break
        default:
          callback(new UnknownError(`unexpected status ${status}`))  
      }
  }

   // request

   xhr.open('POST', `${API_URL}/movement/outputs/${productId}`)

   xhr.setRequestHeader('Authorization', `Bearer ${token}`)

   xhr.setRequestHeader('Content-type', 'application/json')

  const json = JSON.stringify({ quantity })
    
  xhr.send(json)
}

export default movementOutputs