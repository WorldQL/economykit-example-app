import { type AxiosError } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'
import {
  inventory as fetchInventory,
  type Inventory,
} from '~/lib/economykit/inventory'
import { type AuthResponse } from '~/pages/api/login'

interface UseInventory {
  inventory: Inventory | undefined
  loading: boolean
  error: AxiosError | undefined
}

export const useInventory: (
  auth: AuthResponse | undefined,
  id?: string
) => UseInventory = (auth, player) => {
  const id = player ?? auth?.id
  const { data: inventory, error } = useSWR<Inventory, AxiosError>(
    auth && id && [`/inventory/${id}`, auth, id],
    async (_, auth, id) => fetchInventory(auth, id)
  )

  const loading = useMemo<boolean>(
    () => inventory === undefined && error === undefined,
    [inventory, error]
  )

  return { inventory, loading, error }
}
