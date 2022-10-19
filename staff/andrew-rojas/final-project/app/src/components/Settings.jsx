import './Settings.css'

function Settings(){
  return ( 
   
    <>
    <div className="grid-settings">
      <div className="item-settings">
        <div className="container-form-4">  
  
        <form className="form-settings">

        <div className="form__field">
          <label htmlFor="name">Dark mode :</label>
        </div>
  
        <div className="form__field">
          <label htmlFor="name">Security</label>
        </div>

        <div className="form__field">
          <label htmlFor="name">About Us</label>
        </div>

        <div className="form__field">
          <label htmlFor="name">Terms & conditions </label>
        </div>

        <div className="form__field">
          <label htmlFor="name">Back</label>
        </div>
  
       </form>
        </div>   
      </div>
    </div>
  </>
  )  
}

export default Settings