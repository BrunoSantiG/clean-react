import React from 'react'
import { render } from '@testing-library/react'
import Login from '.'
describe('Login component', () => {
  test('Should not render error message on mount', () => {
    const { queryByTestId } = render(<Login/>)
    expect(queryByTestId('error-msg')).toBeFalsy()
  })

  test('Should not render spinner on mount', () => {
    const { queryByTestId } = render(<Login/>)
    expect(queryByTestId('spinner')).toBeFalsy()
  })

  test('Button should be disable on mount', () => {
    const { getByRole } = render(<Login/>)
    const button = getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBeTruthy()
  })
})
