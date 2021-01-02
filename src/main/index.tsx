import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/presentation/pages'
import { makeLogin } from './factories/pages/login/login-factory'

ReactDOM.render(
  <App makeLogin={makeLogin}/>,
  document.getElementById('root')
)
