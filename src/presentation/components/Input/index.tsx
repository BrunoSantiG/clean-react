import React from 'react'

import Styles from './styles.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string
}

const Input: React.FC<Props> = ({ error, name, ...rest }: Props) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input name={name} {...rest} readOnly onFocus={enableInput} />
      <span title={error} className={Styles.status} data-testid={`${name}-status`}>🔴</span>
    </div>
  )
}
export default Input
