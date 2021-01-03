
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { Authentication } from '@/domain/useCases'

export const makeRemoteAuthentication = (): Authentication => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  return new RemoteAuthentication(url, makeAxiosHttpClient())
}
