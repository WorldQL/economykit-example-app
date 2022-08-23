import Axios, { type AxiosError } from 'axios'
import { baseURL, ECONOMYKIT_APP_TOKEN } from './env'

if (!ECONOMYKIT_APP_TOKEN) {
  throw new Error('ECONOMYKIT_APP_TOKEN not specified')
}

const axios = Axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${ECONOMYKIT_APP_TOKEN}`,
  },
})

// @ts-expect-error Type Assertion
export const isAxiosError: (error: unknown) => error is AxiosError = error => {
  if (typeof error !== 'object') return false
  if (error === null) return false

  // @ts-expect-error Property might not exist
  return error.isAxiosError === true
}

enum ExternalIdentifier {
  STEAM = 'ST',
  EPIC_GAMES = 'EG',
  IOS_GAME_CENTER = 'GC',
  GOOGLE_PLAY_GAMES_SERVICES = 'GS',
  MINECRAFT = 'MC',
  EMAIL = 'EM',
  DISCORD = 'DS',
  CUSTOM = 'XX',
}

interface PlayerIDRequest {
  display_name?: string
  id_type: ExternalIdentifier
  id_payload: string
}

interface PlayerIDResponse {
  player_id: string
  display_name: string
}

export const playerID = async (name: string) => {
  const body: PlayerIDRequest = {
    display_name: name,
    id_type: ExternalIdentifier.CUSTOM,
    id_payload: name,
  }

  const { data } = await axios.post<PlayerIDResponse>(
    '/inventories/api/v1/player-id/',
    body
  )

  return data
}

interface ProvisionTokenRequest {
  player?: string
  expiry: string
}

interface ProvisionTokenResponse {
  key: string
}

export const provisionToken = async (expireTimeMS: number, player?: string) => {
  const now = Date.now()
  const future = now + expireTimeMS
  const date = new Date(future)

  const body: ProvisionTokenRequest = {
    expiry: date.toISOString(),
    player,
  }

  const { data } = await axios.post<ProvisionTokenResponse>(
    '/inventories/api/v1/api-key/',
    body
  )

  return { ...data, expires: date }
}
