import { baseURL } from '~/lib/economykit/env'
import { axios, type PagedResponse } from '~/lib/economykit/http'
import { type AuthResponse } from '~/pages/api/login'

interface UniqueInventoryItem {
  type: 'unique_item'
  unique_item: {
    id: string
    display_name: string
    metadata: Record<string, unknown>
    image: string
  }
}

interface CommodityInventoryItem {
  type: 'commodity'
  commodity: {
    quantity: number
    commodity: {
      id: string
      display_name: string
      metadata: Record<string, unknown>
      image: string
    }
  }
}

type InventoryItem = UniqueInventoryItem | CommodityInventoryItem
type InventoryResponse = PagedResponse<InventoryItem>

export interface UniqueItem {
  type: 'uniqueItem'

  id: string
  name: string
  image: string

  metadata: Record<string, unknown>
}

export interface CommodityStack {
  type: 'commodityStack'

  id: string
  name: string
  image: string
  quantity: number

  metadata: Record<string, unknown>
}

export interface Inventory {
  id: string
  uniqueItems: readonly UniqueItem[]
  commodityStacks: readonly CommodityStack[]
}

export const inventory: (
  auth: AuthResponse,
  id?: string
) => Promise<Inventory> = async ({ id: inventoryID, token }, id) => {
  const player = id ?? inventoryID
  const { data } = await axios.get<InventoryResponse>(
    '/inventories/api/v1/player-inventory/',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { player },
    }
  )

  // TODO: Pagination
  const uniqueItems: UniqueItem[] = []
  const commodityStacks: CommodityStack[] = []

  for (const item of data.results) {
    if (item.type === 'unique_item') {
      const uniqueItem: UniqueItem = {
        type: 'uniqueItem',

        id: item.unique_item.id,
        name: item.unique_item.display_name,
        image: new URL(item.unique_item.image, baseURL).toString(),
        metadata: item.unique_item.metadata,
      }

      uniqueItems.push(uniqueItem)
    } else if (item.type === 'commodity') {
      const commodityStack: CommodityStack = {
        type: 'commodityStack',

        id: item.commodity.commodity.id,
        name: item.commodity.commodity.display_name,
        image: new URL(item.commodity.commodity.image, baseURL).toString(),
        quantity: item.commodity.quantity,
        metadata: item.commodity.commodity.metadata,
      }

      commodityStacks.push(commodityStack)
    }
  }

  return { id: player, uniqueItems, commodityStacks }
}
