import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError())
  })
})
