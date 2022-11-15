import { type PlayerScopedClient, type Trade } from '@worldql/economykit-client'
import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import useSWR, { type KeyedMutator } from 'swr'

interface UseTrade {
  trade: Trade | undefined
  loading: boolean
  error: AxiosError | undefined
  mutate: KeyedMutator<Trade>
}

export const useTrade: (
  client: PlayerScopedClient | undefined,
  id?: string,
) => UseTrade = (client, id) => {
  const {
    data: trade,
    error,
    mutate,
  } = useSWR<Trade, AxiosError>(
    client && id && [`/trade/${id}`, client, id],
    async (_: unknown, client: PlayerScopedClient, id: string) => {
      return client.tradeDetails(id)
    },
  )

  const loading = useMemo<boolean>(
    () => trade === undefined && error === undefined,
    [trade, error],
  )

  return { trade, loading, error, mutate }
}
