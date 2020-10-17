import React from 'react'

import { Spinner, LoginHeader, Footer } from '@/presentation/components'

import Styles from './styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.container}>
      <LoginHeader/>
      <form className={Styles.form}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="E-mail"/>
        <span className={Styles.error}>Erro</span>
        <input type="password" name="password" placeholder="Senha"/>
        <button type="submit"><Spinner/> Entrar</button>
        <span className={Styles.link}>criar conta</span>
      </form>
      <Footer/>
    </div>
  )
}

export default Login
