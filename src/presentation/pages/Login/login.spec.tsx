import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import Login from '.'
import { Validation } from '@/presentation/protocols/Validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string
  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return {
    sut,
    validationSpy
  }
}

describe('Login component', () => {
  test('Should not render error message on mount', () => {
    const { sut } = makeSut()
    expect(sut.queryByTestId('error-msg')).toBeFalsy()
  })

  test('Should not render spinner on mount', () => {
    const { sut } = makeSut()
    expect(sut.queryByTestId('spinner')).toBeFalsy()
  })

  test('Button should be disable on mount', () => {
    const { sut } = makeSut()
    const button = sut.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBeTruthy()
  })

  test('Input should start with inital values', () => {
    const { sut } = makeSut()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordcInput = sut.getByTestId('password')
    fireEvent.input(passwordcInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
