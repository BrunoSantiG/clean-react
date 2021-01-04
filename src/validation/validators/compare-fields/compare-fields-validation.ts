import { FieldValidation } from '@/validation/protocols/field-validation'
import { CompareFieldsError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error {
    return this.valueToCompare === value ? null : new CompareFieldsError()
  }
}
