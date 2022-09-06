import { axios, type PagedResponse } from '~/lib/economykit/http'
import { AuthResponse } from '~/pages/api/login'

interface PlayerEntry {
  id: string
  display_name: string
}

export interface Player {
  id: string
  name: string
}

type ListPlayersResponse = PagedResponse<PlayerEntry>

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
