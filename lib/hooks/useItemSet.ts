import {
  type CommodityStack,
  type UniqueItem,
} from '@worldql/economykit-client'
import { useMemo } from 'react'
import type { ItemFilter } from './useItemFilter'

type UniqueItems = readonly UniqueItem[]
type CommodityStacks = readonly CommodityStack[]

interface UseItemSet {
  uniqueItems: UniqueItems
  commodityStacks: CommodityStacks
}

export const useItemSet: (
  uniqueItems: UniqueItems,
  commodityStacks: CommodityStacks,
  set: ItemFilter,
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
      commodityStacksInput
        .map(stack => {
          const [cleanID] = stack.id.split('/')
          const filterQuantity = set.get(cleanID) ?? 0

          const quantity =
            filter === 'include'
              ? filterQuantity
              : stack.quantity - filterQuantity

          const splitID = `${stack.id}/${filter}`
          const useSplit = quantity !== 0 || quantity !== stack.quantity
          const id = useSplit ? splitID : stack.id

          return { ...stack, id, quantity }
        })
        .filter(stack => stack.quantity > 0),
    [commodityStacksInput, set, filter],
  )

  return { uniqueItems, commodityStacks }
}
