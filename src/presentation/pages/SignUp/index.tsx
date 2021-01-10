import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Spinner, LoginHeader, Footer } from '@/presentation/components'
import Input from '@/presentation/components/Input'

import Styles from './styles.scss'

const SignUp: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: ''
  })
  const [error] = useState({
    message: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  return (
    <div className={Styles.container}>
      <LoginHeader/>
      <form className={Styles.form} >
        <h2>Cadastro</h2>
        {error.message && <span className={Styles.error}>{error.message}</span>}
        <Input type="text" name="name" state={{ state, setState }} placeholder="Nome" error={error.name}/>
        <Input type="email" name="email" state={{ state, setState }} placeholder="E-mail" error={error.email}/>
        <Input type="password" name="password" state={{ state, setState }} placeholder="Senha" error={error.password}/>
        <Input type="password" name="passwordConfirmation" state={{ state, setState }} placeholder="Repita sua senha" error={error.passwordConfirmation}/>
        <button type="submit" disabled={!!(error.email || error.password)}>
          {state.isLoading && <Spinner /> }
            Cadastrar
        </button>
        <Link to="/login" className={Styles.link}>Voltar para o login</Link>
      </form>
      <Footer/>
    </div>
  )
}

export default SignUp
