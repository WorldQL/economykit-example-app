import {
  createPlayerScopedClient,
  PlayerAuth,
} from '@worldql/economykit-client'
import { type PlayerAuthAPI } from '~/pages/api/login'

const ECONOMYKIT_APP_URL = process.env.NEXT_PUBLIC_ECONOMYKIT_APP_URL

export const createPlayerClient = (auth: PlayerAuthAPI) => {
  const mappedAuth: PlayerAuth = {
    ...auth,
    expires: new Date(auth.expires),
  }

  return createPlayerScopedClient(mappedAuth, ECONOMYKIT_APP_URL)
}
