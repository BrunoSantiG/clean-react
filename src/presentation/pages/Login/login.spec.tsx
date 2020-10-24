import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'

import Login from '.'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy}/>)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}
const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateInputStatus = (sut: RenderResult, fieldName: string, validationSpy?: ValidationSpy): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationSpy ? validationSpy.errorMessage : 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationSpy ? '🔴' : '🟢')
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const button = sut.getByRole('button')
  fireEvent.click(button)
}

describe('Login component', () => {
  afterEach(cleanup)
  test('Should not render error message on mount', () => {
    const { sut } = makeSut()
    expect(sut.queryByTestId('error-msg')).toBeFalsy()
  })

  test('Should not render spinner on mount', () => {
    const { sut } = makeSut()
    expect(sut.queryByTestId('spinner')).toBeFalsy()
  })

  test('Button should be disable on mount', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const button = sut.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBeTruthy()
  })

  test('Input should start with inital values', () => {
    const validationError = faker.random.words()
    const { sut, validationSpy } = makeSut({ validationError })
    simulateInputStatus(sut, 'email', validationSpy)
    simulateInputStatus(sut, 'password', validationSpy)
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    populateEmailField(sut, email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    populatePasswordField(sut, password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut, validationSpy } = makeSut({ validationError })
    populateEmailField(sut)
    simulateInputStatus(sut, 'email', validationSpy)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut, validationSpy } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateInputStatus(sut, 'password', validationSpy)
  })

  test('Should show valid email state if Validation succeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateInputStatus(sut, 'email')
  })

  test('Should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateInputStatus(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    populateEmailField(sut)
    const button = sut.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    expect(sut.queryByTestId('spinner')).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
