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
  auth: AuthResponse | undefined
) => UsePlayers = auth => {
  const { data: players, error } = useSWR<Player[], AxiosError>(
    auth && [`/players/`, auth],
    async (_, auth) => fetchPlayers(auth)
  )

  const loading = useMemo<boolean>(
    () => players === undefined && error === undefined,
    [players, error]
  )

  return { players, loading, error }
}
