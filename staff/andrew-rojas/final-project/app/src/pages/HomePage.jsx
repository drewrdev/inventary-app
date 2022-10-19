// import { useState, useEffect } from "react";
import Loggito from "../utils/Loggito";
import withContext from "../utils/withContext";
import Menu from "../components/Menu";
import CreateProduct from "../components/CreateProduct";
import MyProducts from "../components/MyProducts";
import MovementInputs from "../components/MovementInputs";
import MovementOutputs from "../components/MovementOutputs";
import RemoveProducts from "../components/RemoveProducts"
import Reports from "../components/Reports"
import Settings from "../components/Settings"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import back from "../assets/back.jpg"



function HomePage() {
  const logger = new Loggito("HomePage");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToProduct = () => {
    navigate("/product");
  };

  const handleNavigateMyProducts = () => {
    navigate("/products")
  };

   const handleNavigateInput = () => {
     navigate("/inputs")
   };

   const handleNavigateOutput = () => {
     navigate("/outputs")
   };

   const handleNavigateRemove = () => {
    navigate("/remove")
  };

   const handleNavigateReport = () => {
     navigate("/reports")
   };

   const handleNavigateSetting = () => {
     navigate("/settings")
   };

  const handleNavigateLogout = () => {
   navigate("/login")
   };
  
  const handleNavigateToHome = () => {
    navigate("/")
  };


  var title = 'Home'  
  if(location.pathname === '/product') title = 'Create Product'

  if(location.pathname === '/products') title = 'My Products'

  if(location.pathname === '/inputs') title = 'Product Input'

  if(location.pathname === '/outputs') title = 'Product Output'

  if(location.pathname === '/remove') title = 'remove'

  if(location.pathname === '/reports') title = ' Reports'

  if(location.pathname === '/settings') title = 'Settings'
  
  logger.info("return");

  return (
    <main className="register-page">
      <div className="header"> 
      <header> 
        <h2 className="title"> {title} </h2> 
      </header>
      <button className="button-back" onClick={handleNavigateToHome}><img src={back} alt="logo de back" className="logo-back"/></button>
      </div>
      <Routes>
        <Route path="/*" element={<Menu onHomeClick={handleNavigateToHome} onArticleClick={handleNavigateToProduct} onProductsClick={handleNavigateMyProducts} onInputsClick={handleNavigateInput} onOutputsClick={handleNavigateOutput} onReportsClick={handleNavigateReport} onRemoveClick={handleNavigateRemove} onSettingsClick=
        {handleNavigateSetting} onLogoutClick={handleNavigateLogout} />} />
        <Route path="/product" element={<CreateProduct/>} />
        <Route path="/products" element={<MyProducts/>} />
        <Route path="/inputs" element={<MovementInputs/>} />
        <Route path="/outputs" element={<MovementOutputs/>} />
        <Route path="/remove" element={<RemoveProducts/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/settings" element={<Settings/>} />
      

      
      </Routes>
    </main>
  );

}

export default withContext(HomePage);
