import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import registerUser from '../logic/registerUser'
import createAccount from '../assets/create-account.jpg'

function RegisterPage({onRegister, onLinkClick, context: {handleFeedback}}) {
  const logger = new Loggito(RegisterPage.name)

  logger.info('constructor')
  const handleFormSubmit = event => {
    event.preventDefault()

    const { target: form } = event
    const { 
        adminEmail: { value: adminEmail },
        adminPassword: { value: adminPassword }, 
        name: { value: name },
        email: { value: email },
        password: { value: password }
    } = form

    try {
        registerUser( adminEmail, adminPassword, name, email, password, function (error) {
            if (error) {

                handleFeedback({ message: error.message, level: 'error' })

                logger.warn(error.message)

                return
            }

            handleFeedback({ message: 'your user has been registered', level: 'success' })
            event.target.reset()

            onRegister()
        })
    } catch (error) {

        handleFeedback({ message: error.message, level: 'error' })

        logger.warn(error.message)
    }
}
  const handleLinkClick = event => {
    event.preventDefault()

    onLinkClick()
  }

  logger.info('return')

  return <main className="register-page">
  <div className="container-register">
  <img src={createAccount} alt="logo de crearUsuario" className="create-account"/> 
    <h2 className="title-create">Create Account</h2>
  </div>

  <div className="container-form-1">  
    <form className="form" onSubmit={handleFormSubmit}>

    <div className="form__field">
        <label htmlFor="adminEmail">Admin Email</label>
        <input className="input" type="email" name="adminEmail" placeholder="adminEmail" id="adminEmail"/>
      </div>
      
    <div className="form__field">
        <label htmlFor="adminPassword">Admin Password</label>
        <input className="input" type="password" name="adminPassword" placeholder="adminPassword" id="adminPassword"/>
      </div>

      <div className="form__field">
        <label htmlFor="name">Name</label>
        <input className="input" type="text" name="name" placeholder="name" id="name"/>
      </div>

      <div className="form__field">
        <label htmlFor="email">Email</label>
        <input className="input" type="email" name="email" placeholder="email" id="email"/>
      </div>

      <div className="form__field">
        <label htmlFor="password">Password</label>
        <input className="input" type="password" name="password" placeholder="password" id="password"/>
      </div>

      <button className="button" type="submit">Register</button>
    </form>
  
    <p className="question-create">Ready have an account ?</p>
    <a className="anchor" href="login.html" onClick={handleLinkClick}>Login</a>
  </div>
</main>

}

export default withContext(RegisterPage)