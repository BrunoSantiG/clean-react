import React from 'react'

import Logo from '../Logo'

import Styles from './styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo/>
      <h1>Enquete para programadores</h1>
    </header>
  )
}

export default React.memo(LoginHeader)
