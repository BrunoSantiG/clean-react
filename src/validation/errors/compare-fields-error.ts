export class CompareFieldsError extends Error {
  constructor () {
    super('Campos devem ser iguais')
    this.name = 'CompareFieldsError'
  }
}
