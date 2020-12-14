import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if values is invalid', () => {
    const sut = new MinLengthValidation('field', 8)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if values is valid', () => {
    const sut = new MinLengthValidation('field', 8)
    const error = sut.validate('123456789')
    expect(error).toBeNull()
  })
})
