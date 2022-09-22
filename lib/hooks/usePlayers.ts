import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'
import {
  type Player,
  type PlayerScopedClient,
} from '@worldql/economykit-client'

interface UsePlayers {
  players: readonly Player[] | undefined
  loading: boolean
  error: AxiosError | undefined
}

export const usePlayers: (
  client: PlayerScopedClient | undefined,
  filterSelf?: boolean
) => UsePlayers = (client, filterSelf = true) => {
  const { data: allPlayers, error } = useSWR<readonly Player[], AxiosError>(
    client && [`/players`, client],
    async (_, client: PlayerScopedClient) => client.players()
  )

  const loading = useMemo<boolean>(
    () => allPlayers === undefined && error === undefined,
    [allPlayers, error]
  )

  const players = filterSelf
    ? allPlayers?.filter(player => player.id !== client?.id)
    : allPlayers

  return { players, loading, error }
}
