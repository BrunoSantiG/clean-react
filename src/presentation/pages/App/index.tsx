import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import '@/presentation/styles/global.scss'

type Props = {
  makeLogin: React.FC
}
const App: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={makeLogin}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App
