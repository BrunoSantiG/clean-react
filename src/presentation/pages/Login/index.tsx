import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Spinner, LoginHeader, Footer } from '@/presentation/components'
import Input from '@/presentation/components/Input'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/useCases'

import Styles from './styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    message: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    setError((oldError) => ({
      ...oldError,
      email: validation.validate('email', state.email)
    }))
  }, [state.email, state.password])

  useEffect(() => {
    setError((oldError) => ({
      ...oldError, password: validation.validate('password', state.password)
    }))
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || error.email || error.password) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false })
      setError({ ...error, message: error.message })
    }
  }

  return (
    <div className={Styles.container}>
      <LoginHeader/>
      <form className={Styles.form} data-testid="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error.message && <span className={Styles.error} data-testid="error-msg">{error.message}</span>}
        <Input type="email" name="email" state={{ state, setState }} placeholder="E-mail" error={error.email}/>
        <Input type="password" name="password" state={{ state, setState }} placeholder="Senha" error={error.password}/>
        <button type="submit" disabled={!!(error.email || error.password)}>
          {state.isLoading && <Spinner /> }
            Entrar
        </button>
        <Link to="/signup" data-testid="signup" className={Styles.link}>criar conta</Link>
      </form>
      <Footer/>
    </div>
  )
}

export default Login
