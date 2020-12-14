import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 8)

describe('MinLengthValidation', () => {
  test('Should return error if values is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(7))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if values is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(8))
    expect(error).toBeNull()
  })
})
