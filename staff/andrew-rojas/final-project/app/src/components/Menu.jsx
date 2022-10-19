import plus from '../assets/plus.jpg'
import products from '../assets/products.jpg'
import input from '../assets/input.jpg'
import output from '../assets/output.jpg'
import remove from '../assets/remove.jpg'
import report from '../assets/reports.jpg'
import settings from '../assets/settings.jpg'
import logout from '../assets/logout.jpg'
import './Menu.css'


function Menu({onArticleClick, onProductsClick, onInputsClick, onOutputsClick, onRemoveClick, onReportsClick, onSettingsClick, onLogoutClick}){

  const handleArticleClick = () => {
    //console.log('pepito')
    onArticleClick()
  };

  const handleProductsClick = () => {
    
    onProductsClick()
  }

  const handleInputsClick = () => {

    onInputsClick()
  }

  const handleOutputsClick = () => {

    onOutputsClick()
  }

  const handleRemoveClick = () => {

    onRemoveClick()
  }

  const handleReportsClick = () => {

    onReportsClick()
  }

  const handleSettingsClick = () => {

    onSettingsClick()
  }

  const handleLogoutClick = () => {
    delete sessionStorage.token

    onLogoutClick()
  }




  return(
    
    <div className="grid-container">
        <div className="grid-item">
          <button className="button-menu" onClick={handleArticleClick}>
            <img src={plus} alt="logo de add" className="logo-plus"/>
            <p>New Product</p>
          </button>
        </div>
        <div className="grid-item">
          <button className="button-menu" onClick={handleProductsClick}>
            <img src={products} alt="logo mis productos" className="logo-products"/>
            <p>My Products</p>
          </button>
        </div>
        <div className="grid-item">
          <button className="button-menu" onClick={handleInputsClick}>
            <img src={input} alt="logo de agregar" className="logo-input"/>
            <p>Product Input</p>
          </button>
        </div>  
        <div className="grid-item">
          <button className="button-menu" onClick={handleOutputsClick}>
            <img src={output} alt="logo de output " className="logo-output"/>
            <p>Product Output</p>
          </button>
        </div>
        <div className="grid-item">
          <button className="button-menu" onClick={handleRemoveClick}>
            <img src={remove} alt="logo de remove" className="logo-remove"/>
            <p>Remove Product</p>
          </button>
        </div>
        <div className="grid-item">
          <button className="button-menu" onClick={handleReportsClick}>
            <img src={report} alt="logo de reportes" className="logo-report"/>
            <p>Report</p>
          </button>
        </div>  
        <div className="grid-item">
          <button className="button-menu" onClick={handleSettingsClick}>
            <img src={settings} alt="logo de settings" className="logo-plus"/>
            <p>Settings</p>
          </button>
        </div>
        <div className="grid-item">
          <button className="button-menu" onClick={handleLogoutClick}>
            <img src={logout} alt="logo logout" className="logo-logout"/>
            <p>Logout</p>
          </button>
        </div>
      </div> 
  )
}

export default Menu