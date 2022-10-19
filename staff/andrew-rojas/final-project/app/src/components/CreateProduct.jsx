import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import './CreateProduct.css'
import createProduct from '../logic/createProduct'


function CreateProduct({ context:{handleFeedback} }) {
  const  logger = new Loggito(CreateProduct.name)

  logger.info('constructor')

  logger.info('return')

  const handleFormSubmit = event => {
       
    event.preventDefault()

    const form = event.target

    const nameInput = form.name 
    const categoryInput = form.category
    const quantityInput = form.quantity 
    const descriptionInput = form.description

    const name = nameInput.value
    const category = categoryInput.value
    const quantity = quantityInput.value
    const description = descriptionInput.value

      try {
        createProduct(sessionStorage.token, name, category, parseInt(quantity), description, (error) => {
             
          if(error) {
          handleFeedback({ message: error.message, level: 'error' })

          logger.warn(error.message)
          return
        }
            
        handleFeedback({ message: 'Your product has been registered', 
        level: 'success' })
            event.target.reset()

      })
    }catch (error) {
      handleFeedback({ message: error.message, level: 'error' })

      logger.warn(error.message)
    }
  }

  logger.info('return')

  return ( 
  <>
  <div className="grid-create">
    <div className="item-create">
      <div className="container-form-2">  

      <form className="form-create" onSubmit={handleFormSubmit}>
      <div className="form__field">
        <label htmlFor="name">Product name :</label>
        <input className="input" type="text" name="name" placeholder="name" id="name"/>
      </div>

      <div className="form__field">
        <label htmlFor="category">Category :</label>
        <input className="input" type="text" name="category" placeholder="category" id="category"/>
      </div>

      <div className="form__field">
        <label htmlFor="quantity">Quantity :</label>
        <input className="input" type="number" name="quantity" placeholder="quantity" id="quantity"/>
      </div>

      <div className="form__field">
        <label htmlFor="description">Description :</label>
        <input className="input" type="text" name="description" placeholder="description" id="description"/>
      </div>

      <div>   
      <button className="button-create" type="submit" >Create</button>
      </div>

     </form>
      </div>   
    </div>
  </div>
  </>
  )  
}

export default withContext(CreateProduct)