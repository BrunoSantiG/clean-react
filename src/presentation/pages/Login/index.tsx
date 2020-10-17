import React, { useState } from 'react'

import { Spinner, LoginHeader, Footer } from '@/presentation/components'
import Styles from './styles.scss'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })
  return (
    <div className={Styles.container}>
      <LoginHeader/>
      <form className={Styles.form} data-testid="form">
        <h2>Login</h2>
        {state.errorMessage && <span className={Styles.error} data-testid="error-msg">{state.errorMessage}</span>}
        <input type="email" name="email" placeholder="E-mail"/>
        <input type="password" name="password" placeholder="Senha"/>
        <button type="submit" disabled>
          {state.isLoading && <Spinner /> }
            Entrar
        </button>
        <span className={Styles.link}>criar conta</span>
      </form>
      <Footer/>
    </div>
  )
}

export default Login
