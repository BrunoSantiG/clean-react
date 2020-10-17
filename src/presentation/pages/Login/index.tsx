import React, { useState } from 'react'

import { Spinner, LoginHeader, Footer } from '@/presentation/components'
import Styles from './styles.scss'
import Input from '@/presentation/components/Input'
const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })
  const [error] = useState({
    message: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório'
  })
  return (
    <div className={Styles.container}>
      <LoginHeader/>
      <form className={Styles.form} data-testid="form">
        <h2>Login</h2>
        {error.message && <span className={Styles.error} data-testid="error-msg">{error.message}</span>}
        <Input type="email" name="email" placeholder="Digite seu e-mail" error={error.email}/>
        <Input type="password" name="password" placeholder="Digite sua senha" error={error.password}/>
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
