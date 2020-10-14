import faker from 'faker'

import { AuthenticationParams } from '../useCases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
