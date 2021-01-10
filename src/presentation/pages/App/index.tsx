import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import '@/presentation/styles/global.scss'
import { SignUp } from '../'

type Props = {
  makeLogin: React.FC
}
const App: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={makeLogin}/>
        <Route exact path="/signup" component={SignUp}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App
