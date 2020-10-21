import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'

import Login from '.'
import { ValidationSpy } from '@/presentation/test'
import { Authentication, AuthenticationParams } from '@/domain/useCases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}

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
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut, validationSpy } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut, validationSpy } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const button = sut.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const button = sut.getByRole('button')
    fireEvent.click(button)
    expect(sut.queryByTestId('spinner')).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const button = sut.getByRole('button')
    fireEvent.click(button)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
