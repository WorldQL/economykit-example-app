import { paginated } from '~/lib/economykit/http'
import { type AuthResponse } from '~/pages/api/login'

interface PlayerEntry {
  id: string
  display_name: string
}

export interface Player {
  id: string
  name: string
}

export const players: (
  auth: AuthResponse
) => Promise<Player[]> = async auth => {
  const results = await paginated<PlayerEntry>(
    '/inventories/api/v1/player/',
    auth
  )

  const players: Player[] = results.map(entry => ({
    id: entry.id,
    name: entry.display_name,
  }))

  return players
}
