import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import Input from '.'

const makeSut = (fieldName: string): RenderResult => (
  render(
    <Input
      name={fieldName}
      error=""
      state={{ state: {}, setState: () => {} }}
    />
  )
)

describe('Input component', () => {
  test('Should begin with readOnly ', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)

    const input = getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should change readOnly to false onFocus', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)

    const input = getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
