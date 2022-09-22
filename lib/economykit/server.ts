import { createAppScopedClient } from '@worldql/economykit-client'

const ECONOMYKIT_APP_URL = process.env.NEXT_PUBLIC_ECONOMYKIT_APP_URL
const ECONOMYKIT_APP_TOKEN = process.env.ECONOMYKIT_APP_TOKEN

if (!ECONOMYKIT_APP_TOKEN) {
  throw new Error('ECONOMYKIT_APP_TOKEN not specified')
}

export const appClient = createAppScopedClient(
  ECONOMYKIT_APP_TOKEN,
  ECONOMYKIT_APP_URL
)
