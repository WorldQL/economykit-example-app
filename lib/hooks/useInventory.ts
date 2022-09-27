import {
  type Inventory,
  type PlayerScopedClient,
} from '@worldql/economykit-client'
import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'

interface UseInventory {
  inventory: Inventory | undefined
  loading: boolean
  error: AxiosError | undefined
}

export const useInventory: (
  client: PlayerScopedClient | undefined,
  id?: string,
) => UseInventory = (client, player) => {
  const id = player ?? client?.id
  const { data: inventory, error } = useSWR<Inventory, AxiosError>(
    client && id && [`/inventory/${id}`, client, id],
    async (_: unknown, client: PlayerScopedClient, id: string) => {
      return client.listInventory(id)
    },
  )

  const loading = useMemo<boolean>(
    () => inventory === undefined && error === undefined,
    [inventory, error],
  )

  return { inventory, loading, error }
}
