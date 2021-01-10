import faker from 'faker'

import { CompareFieldsError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if fields are not equal', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new CompareFieldsError())
  })

  test('Should return null if fields are equal', () => {
    const value = faker.random.word()
    const sut = makeSut(value)
    const compare = sut.validate(value)
    expect(compare).toBeNull()
  })
})