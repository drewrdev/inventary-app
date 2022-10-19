import Loggito from "../utils/Loggito"
import withContext from "../utils/withContext"
import { useEffect, useState } from "react"
import './RemoveProducts.css'
import retrieveProducts from "../logic/retrieveProducts"
import removeProducts from '../logic/removeProducts'


function RemoveProducts({ context: { handleFeedback } }) {

  const logger = new Loggito(RemoveProducts.name);

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
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
            return
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
  
      const name = nameInput.value;
  
      let productFound = products.find((product) => product.name === name);
            
      if (!productFound) {
        handleFeedback({ message: 'Product not found', level: 'error' })
  
        logger.warn()
        return
      }
  
      const productId = productFound.id;
  
      try {
        removeProducts( sessionStorage.token, productId, (error) => {
                  
            if(error) {
              handleFeedback({ message: 'does not have permission to delete', level: 'error' })
    
              logger.warn(error.message)
              return;
            }
               
            handleFeedback({ message: 'your product has been removed', level: 'success' })
            // event.target.reset()
  
          }
        );
      } catch (error) {
        handleFeedback({ message: error.message, level: "error" });
  
        logger.warn(error.message);
      }
    };


  return (
    <>
      <div className="grid-remove">
        <div className="item-remove">
          <div className="container-form-5">
            <form className="form-remove" onSubmit={handleFormSubmit}>
              
              <div className="form__field">
                <label htmlFor="name">Product Name :</label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="name"
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

              <div>
                <button className="button-update" type="submit">
                  Remove
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withContext(RemoveProducts)