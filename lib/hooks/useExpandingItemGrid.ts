import { useMemo } from 'react'
import {
  type CommodityStack,
  type UniqueItem,
} from '~/lib/economykit/inventory'

type UniqueItems = readonly UniqueItem[]
type CommodityStacks = readonly CommodityStack[]

type AllItems = Array<UniqueItem | CommodityStack | undefined>

export const useExpandingItemGrid = (
  uniqueItems: UniqueItems,
  commodityStacks: CommodityStacks,
  width = 4
) => {
  const items = useMemo<AllItems>(() => {
    const combined = [...uniqueItems, ...commodityStacks]
    const nearest = Math.ceil(combined.length / width) * width

    const pad = nearest === 0 ? width : nearest - combined.length
    const padding = Array.from({ length: pad }).map(() => undefined)

    return [...combined, ...padding]
  }, [uniqueItems, commodityStacks, width])

  return items
}
