import { validateCallback } from "validators"
import { ClientError, ServerError, AuthError, UnknownError } from "errors"

const API_URL = process.env.REACT_APP_API_URL

function retrieveProducts(token, callback) {

  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  // response
  xhr.onload = function () {
    const status = xhr.status;

    const json = xhr.responseText;

    const products = JSON.parse(json);
    const { error } = products;
     
    switch (true) {
      case status >= 500:
        callback(new ServerError(error));
        break;
      case status === 401:
        callback(new AuthError(error));
        break;
      case status >= 400:
        callback(new ClientError(error));
        break;
      case status === 200:
        callback(null, products);
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
    }
  };

  // request

  xhr.open("GET", `${API_URL}/products/`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send();
}

export default retrieveProducts
