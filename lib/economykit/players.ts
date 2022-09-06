import Axios from 'axios'
import { baseURL } from '~/lib/economykit/env'
import { AuthResponse } from '~/pages/api/login'

const axios = Axios.create({
  baseURL,
})

interface PlayerEntry {
  id: string
  display_name: string
}

export interface Player {
  id: string
  name: string
}

interface ListPlayersResponse {
  next?: string
  prev?: string
  results: PlayerEntry[]
}

export const players: (
  auth: AuthResponse,
  id?: string
) => Promise<Player[]> = async ({ token }, id) => {
  const { data } = await axios.get<ListPlayersResponse>(
    '/inventories/api/v1/player/',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const convert = (entry: PlayerEntry) => ({
    id: entry.id,
    name: entry.display_name,
  })

  const players: Player[] = data.results.map(convert)
  // TODO: Fill more results from extra pages?

  return players
}
