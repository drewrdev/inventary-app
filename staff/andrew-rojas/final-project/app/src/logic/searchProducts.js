import { validateCallback, validateString } from "validators"
import { ClientError, ServerError, AuthError, UnknownError } from "errors"

const API_URL = process.env.REACT_APP_API_URL

function searchProducts(token, query, callback) {

  validateCallback(callback);
  validateString(query, 'query')

  const xhr = new XMLHttpRequest();

  // response
  xhr.onload = function () {
    const status = xhr.status;

    const json = xhr.responseText;

    const { error, products } = JSON.parse(json);

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

  xhr.open("GET", `${API_URL}/products/search?q=${query}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send();
}

export default searchProducts
