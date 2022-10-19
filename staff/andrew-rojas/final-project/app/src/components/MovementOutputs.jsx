import Loggito from "../utils/Loggito";
import withContext from "../utils/withContext";
import { useEffect, useState } from "react";
import { ServerError } from "errors";
import './MovementOutputs.css'
import retrieveProducts from "../logic/retrieveProducts";
import movementOutputs from "../logic/movementOutputs";

function MovementOutputs({ context: { handleFeedback } }) {
  const logger = new Loggito(MovementOutputs.name);

  logger.info("constructor");

  logger.info("return");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    logger.info("componentDidMount");
    //   
    try {
      retrieveProducts(sessionStorage.token, 
        (error, products) => {
         
          if (error) {
          if (error instanceof ServerError) {
            handleFeedback({ message: error.message, level: "error" });

            logger.warn(error.message);

            return;
          }
          //    
        }
        setProducts(products);
        logger.info("Products retrieved on component mount");
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const nameInput = form.name;
    const quantityInput = form.quantity;

    const name = nameInput.value;
    const quantity = quantityInput.value;

    const productFound = products.find((product) => product.name === name);
         
    if (!productFound) {
      handleFeedback({ message: 'Product not found', level: 'error' })

      logger.warn()
      return
    }

    const productId = productFound.id;

    try {
      movementOutputs(
        sessionStorage.token,
        productId,
        parseInt(quantity),
        (error) => {
             
          if(error) {
            handleFeedback({ message: error.message, level: 'error' })
  
            logger.warn(error.message)
            return
          }
          handleFeedback({ message: 'Your movement has been registered', level: 'success' })
          event.target.reset()
        }
      );
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  logger.info('return')

  return (
    <>
      <div className="grid-movement">
        <div className="item-movement">
          <div className="container-form-2">
            <form className="form-movement" onSubmit={handleFormSubmit}>
              <div className="form__field">
                <label htmlFor="name">Product Name :</label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  autoComplete="off"
                  list="productsList"
                />
                <datalist id="productsList">
                  {products.map(({ name, id }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="form__field">
                <label htmlFor="name">Add Quantity :</label>
                <input
                  className="input"
                  type="number"
                  name="quantity"
                  placeholder="quantity"
                  id="quantity"
                />
              </div>

              <div>
                <button className="button-update" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withContext(MovementOutputs);
