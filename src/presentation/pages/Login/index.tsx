import React from 'react'

import Spinner from '@/presentation/components/Spinner'

import Styles from './styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader'

const Login: React.FC = () => {
  return (
    <div className={Styles.container}>
      <LoginHeader/>
      <form className={Styles.form}>
        <h2>Login</h2>
        <span className={Styles.error}>Erro</span>
        <input type="email" name="email" placeholder="E-mail"/>
        <input type="password" name="password" placeholder="Senha"/>
        <button type="submit"><Spinner/> Entrar</button>
        <span className={Styles.link}>criar conta</span>
      </form>
      <footer className={Styles.footer}/>
    </div>
  )
}

export default Login
