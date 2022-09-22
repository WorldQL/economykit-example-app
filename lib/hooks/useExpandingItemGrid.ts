import {
  type CommodityStack,
  type UniqueItem,
} from '@worldql/economykit-client'
import { useMemo } from 'react'

type UniqueItems = readonly UniqueItem[]
type CommodityStacks = readonly CommodityStack[]

type AllItems = (CommodityStack | UniqueItem | undefined)[]

export const useExpandingItemGrid = (
  uniqueItems: UniqueItems,
  commodityStacks: CommodityStacks,
  width = 4,
) => {
  return useMemo<AllItems>(() => {
    const combined = [...uniqueItems, ...commodityStacks]
    const nearest = Math.ceil(combined.length / width) * width

    const pad = nearest === 0 ? width : nearest - combined.length
    const padding = Array.from({ length: pad }).map(() => undefined)

    return [...combined, ...padding]
  }, [uniqueItems, commodityStacks, width])
}
