import { baseURL } from '~/lib/economykit/env'
import { paginated } from '~/lib/economykit/http'
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
  type: 'commodity_stack'
  commodity_stack: {
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
) => Promise<Inventory> = async (auth, id) => {
  const player = id ?? auth.id

  const uniqueItems: UniqueItem[] = []
  const commodityStacks: CommodityStack[] = []

  const results = await paginated<InventoryItem>(
    '/inventories/api/v1/player-inventory/',
    auth,
    {
      params: { player },
    }
  )

  for (const item of results) {
    if (item.type === 'unique_item') {
      const unique = item.unique_item
      const uniqueItem: UniqueItem = {
        type: 'uniqueItem',

        id: unique.id,
        name: unique.display_name,
        image: new URL(unique.image, baseURL).toString(),
        metadata: unique.metadata,
      }

      uniqueItems.push(uniqueItem)
    } else if (item.type === 'commodity_stack') {
      const stack = item.commodity_stack
      const commodityStack: CommodityStack = {
        type: 'commodityStack',

        id: stack.commodity.id,
        name: stack.commodity.display_name,
        image: new URL(stack.commodity.image, baseURL).toString(),
        quantity: stack.quantity,
        metadata: stack.commodity.metadata,
      }

      commodityStacks.push(commodityStack)
    }
  }

  return { id: player, uniqueItems, commodityStacks }
}
