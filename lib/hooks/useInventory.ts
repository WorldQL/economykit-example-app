import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'
import {
  type Inventory,
  type PlayerScopedClient,
} from '@worldql/economykit-client'

interface UseInventory {
  inventory: Inventory | undefined
  loading: boolean
  error: AxiosError | undefined
}

export const useInventory: (
  client: PlayerScopedClient | undefined,
  id?: string
) => UseInventory = (client, player) => {
  const id = player ?? client?.id
  const { data: inventory, error } = useSWR<Inventory, AxiosError>(
    client && id && [`/inventory/${id}`, client, id],
    async (_, client: PlayerScopedClient, id: string) => client.inventory(id)
  )

  const loading = useMemo<boolean>(
    () => inventory === undefined && error === undefined,
    [inventory, error]
  )

  return { inventory, loading, error }
}
