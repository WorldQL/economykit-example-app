import {
  type CommodityStack,
  type UniqueItem,
} from '@worldql/economykit-client'
import { useMemo } from 'react'

type UniqueItems = readonly UniqueItem[]
type CommodityStacks = readonly CommodityStack[]

interface UseItemSet {
  uniqueItems: UniqueItems
  commodityStacks: CommodityStacks
}

export const useItemSet: (
  uniqueItems: UniqueItems,
  commodityStacks: CommodityStacks,
  set: Set<string>,
  filter: 'exclude' | 'include',
) => UseItemSet = (uniqueItemsInput, commodityStacksInput, set, filter) => {
  const uniqueItems = useMemo<UniqueItems>(
    () =>
      uniqueItemsInput.filter(({ id }) => {
        const inSet = set.has(id)
        return filter === 'include' ? inSet : !inSet
      }),
    [uniqueItemsInput, set, filter],
  )

  const commodityStacks = useMemo<CommodityStacks>(
    () =>
      commodityStacksInput.filter(({ id }) => {
        const inSet = set.has(id)
        return filter === 'include' ? inSet : !inSet
      }),
    [commodityStacksInput, set, filter],
  )

  return { uniqueItems, commodityStacks }
}
