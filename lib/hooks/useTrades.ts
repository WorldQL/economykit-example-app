import { type PlayerScopedClient, type Trade } from '@worldql/economykit-client'
import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'

interface UseTrades {
  trades: readonly Trade[] | undefined
  loading: boolean
  error: AxiosError | undefined
}

export const useTrades: (
  client: PlayerScopedClient | undefined,
  activeOnly?: boolean,
) => UseTrades = (client, activeOnly = false) => {
  const active = useMemo(() => (activeOnly ? 'active' : 'all'), [activeOnly])
  const { data: trades, error } = useSWR<readonly Trade[], AxiosError>(
    client && [`/trades/${active}`, client, active],
    async (
      _: unknown,
      client: PlayerScopedClient,
      active: 'active' | 'all',
    ) => {
      return client.listTrades(active === 'active')
    },
  )

  const loading = useMemo<boolean>(
    () => trades === undefined && error === undefined,
    [trades, error],
  )

  return { trades, loading, error }
}
