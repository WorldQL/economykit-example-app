import { env } from 'node:process'
import { URL } from 'node:url'

const { NEXT_PUBLIC_ECONOMYKIT_APP_URL, ECONOMYKIT_APP_TOKEN } = env

export const baseURL = new URL(
  NEXT_PUBLIC_ECONOMYKIT_APP_URL ?? 'https://app.economykit.com/'
).toString()

export { ECONOMYKIT_APP_TOKEN }
