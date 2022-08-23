/* eslint-disable n/prefer-global/process */

export const ECONOMYKIT_APP_TOKEN = process.env.ECONOMYKIT_APP_TOKEN
const ECONOMYKIT_APP_URL = process.env.NEXT_PUBLIC_ECONOMYKIT_APP_URL

export const baseURL = new URL(
  ECONOMYKIT_APP_URL ?? 'https://app.economykit.com/'
).toString()
