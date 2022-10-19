// import { useLocation } from "react-router-dom";
import Search from "./SearchProducts"
import { useEffect } from 'react'
import Loggito from '../utils/Loggito'
import retrieveProducts from '../logic/retrieveProducts'
import searchProducts from '../logic/searchProducts'
import './MyProducts.css'



function MyProducts({ name, category, quantity,  query, productsList }) {

  const logger = new Loggito('Products List')


    logger.info()
    
    useEffect(() => {
      logger.info('componentDidMount')

      try {
        if (!query)
          retrieveProducts( sessionStorage.token, (error) => {
            if(error) {

              logger.warn(Error.message)
              
              return
          }
        })
        else 
          searchProducts( sessionStorage.token, query, (error) => {
            if(error) {

              logger.warn(Error.message)
            
              return
        }
      }) 
      } catch (Error) {
         logger.warn(Error.message)
      }

    }, )

    // function productsList() {
    //   return products && products.map( products => {
        
    //     return <> <div className="product-name">name:{name}</div>
    //     <div className="product-category">name:{category}</div>
    //     <div className="product-quantity">name:{quantity}</div>
    //     </>
    //   })
    // }

    const handleSearch = query

  return (
     <>  
      <div className="search">
        <Search onSearch={handleSearch} />
      </div>

        <div className="products-container">
          <div className="my-products">
            <div class="div1">Product</div>
            <div class="div2">Category</div>
            <div class="div3">Quantity</div>
          </div>
        </div>
      </>  
  )
}

export default MyProducts

  // const location = useLocation()