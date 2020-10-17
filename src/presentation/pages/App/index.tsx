import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Login } from '@/presentation/pages'
import '@/presentation/styles/global.scss'
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App
