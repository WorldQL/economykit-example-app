import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'
import { players as fetchPlayers, type Player } from '~/lib/economykit/players'
import { type AuthResponse } from '~/pages/api/login'

interface UsePlayers {
  players: Player[] | undefined
  loading: boolean
  error: AxiosError | undefined
}

export const usePlayers: (
  auth: AuthResponse | undefined,
  filterSelf?: boolean
) => UsePlayers = (auth, filterSelf = true) => {
  const { data: allPlayers, error } = useSWR<Player[], AxiosError>(
    auth && [`/players/`, auth],
    async (_, auth) => fetchPlayers(auth)
  )

  const loading = useMemo<boolean>(
    () => allPlayers === undefined && error === undefined,
    [allPlayers, error]
  )

  const players = filterSelf
    ? allPlayers?.filter(player => player.id !== auth?.id)
    : allPlayers

  return { players, loading, error }
}
