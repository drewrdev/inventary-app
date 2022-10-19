import Loggito from '../utils/Loggito'
import authenticateUser from '../logic/authenticateUser'
import withContext from '../utils/withContext'
import { AuthError, ClientError, ServerError } from 'errors'
import logo from '../assets/logo-login.png'

function LoginPage({ onLinkClick, onLogIn, context: {handleFeedback} }) {
  const logger = new Loggito(LoginPage.name)

  // const context = useContext(Context)
  // const handleFeedback = context.handleFeedback
 
  logger.info('constructor')

  logger.info('return')

  const handleLinkClick = event => {
    event.preventDefault()

    onLinkClick()
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    const form = event.target

    const emailInput = form.email 
    const passwordInput = form.password

    const email = emailInput.value
    const password = passwordInput.value

    try {
      authenticateUser(email, password, (error, token) => {
        if (error) {
          if (error instanceof ServerError) { 
          handleFeedback({ message: error.message, level: 'error' })

          logger.warn(error.message)
        } else if (error instanceof ClientError || error instanceof AuthError) {   
          handleFeedback({ message: error.message, level: 'warning'})

          logger.warn(error.message)
        }

        return
      }

      logger.debug('user logged in')

      sessionStorage.token = token

      onLogIn()
    }) 
  }catch (error) {
      handleFeedback({ message: error.message, level: 'error' })

      logger.warn(error.message)
  }
}

return <main className="login-page ">
<div className="container-login">
  <img src={logo} alt="logo de carreta" className="logo-login"/> 
  <h2 className="title-welcome">Welcome!</h2>
  </div>

<div className="container-form">   
  <form className="form" method="get" onSubmit={handleFormSubmit}>
    <div className="form__field">
      <label htmlfor="email">Email</label>
      <input className="input" type="email" name="email" placeholder="email" id="email"/>
    </div>

    <div className="form__field">
      <label htmlfor="password">Password</label>
      <input className="input" type="password" name="password" placeholder="password" id="password"/>
    </div>

    <button className="button" type="submit">Login</button>
  </form>

  <p className="question-login">Don't have an account ?</p>
  <a className="anchor" href="register.html" onClick={handleLinkClick}>Register</a>
</div>
</main>


}

export default withContext(LoginPage)

  
