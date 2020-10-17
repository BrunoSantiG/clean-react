import React, { useState } from 'react'

import { Spinner, LoginHeader, Footer } from '@/presentation/components'
import Styles from './styles.scss'
import Input from '@/presentation/components/Input'

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
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
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
