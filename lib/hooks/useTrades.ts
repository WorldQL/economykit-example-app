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
) => UseTrades = client => {
  const { data: trades, error } = useSWR<readonly Trade[], AxiosError>(
    client && [`/trades`, client],
    async (_: unknown, client: PlayerScopedClient) => {
      return client.listTrades()
    },
  )

  const loading = useMemo<boolean>(
    () => trades === undefined && error === undefined,
    [trades, error],
  )

  return { trades, loading, error }
}
