import React from 'react'

import Styles from './styles.scss'

type stateProps ={
  state: object
  setState: React.Dispatch<React.SetStateAction<object>>
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string
  state: stateProps
}

const Input: React.FC<Props> = ({ error, name, state, ...rest }: Props) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    state.setState({
      ...state.state,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div className={Styles.inputWrap}>
      <input name={name} data-testid={name} {...rest} readOnly onFocus={enableInput} onChange={handleChange}/>
      <span title={error || 'Tudo certo!'} className={Styles.status} data-testid={`${name}-status`}>{error ? '🔴' : '🟢'}</span>
    </div>
  )
}
export default Input
