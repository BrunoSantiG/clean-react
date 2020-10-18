import React, { useEffect, useState } from 'react'

import { Spinner, LoginHeader, Footer } from '@/presentation/components'
import Styles from './styles.scss'
import Input from '@/presentation/components/Input'
import { Validation } from '@/presentation/protocols/Validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: ''
  })
  const [error] = useState({
    message: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório'
  })

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <div className={Styles.container}>
      <LoginHeader/>
      <form className={Styles.form} data-testid="form">
        <h2>Login</h2>
        {error.message && <span className={Styles.error} data-testid="error-msg">{error.message}</span>}
        <Input type="email" name="email" state={{ state, setState }} placeholder="E-mail" error={error.email}/>
        <Input type="password" name="password" state={{ state, setState }} placeholder="Senha" error={error.password}/>
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
