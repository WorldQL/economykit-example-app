import chunk from 'chunk'
import { type Reducer, useCallback, useMemo, useReducer } from 'react'
import {
  type CommodityStack,
  type UniqueItem,
} from '@worldql/economykit-client'

type UniqueItems = readonly UniqueItem[]
type CommodityStacks = readonly CommodityStack[]

type AllItems = Array<UniqueItem | CommodityStack | undefined>

export const useItemGrid = (
  uniqueItems: UniqueItems,
  commodityStacks: CommodityStacks,
  width = 5,
  height = width
) => {
  const squared = width * height

  const allItems = useMemo<AllItems>(() => {
    const combined = [...uniqueItems, ...commodityStacks]
    const nearest = Math.ceil(combined.length / squared) * squared

    const pad = nearest === 0 ? squared : nearest - combined.length
    const padding = Array.from({ length: pad }).map(() => undefined)

    return [...combined, ...padding]
  }, [uniqueItems, commodityStacks, squared])

  const pages = useMemo<number>(
    () => allItems.length / squared,
    [allItems, squared]
  )

  type Action = 'next' | 'prev'
  const [page, dispatchPage] = useReducer<Reducer<number, Action>>(
    (previousState, action) => {
      console.log(pages, previousState)
      switch (action) {
        case 'next':
          return Math.min(previousState + 1, pages)

        case 'prev':
          return Math.max(previousState - 1, 1)

        default:
          return previousState
      }
    },
    1
  )

  const chunkedItems = useMemo<AllItems[]>(
    () => chunk(allItems, squared),
    [allItems, squared]
  )

  const currentPage = useMemo<AllItems>(
    () => chunkedItems[page - 1],
    [chunkedItems, page]
  )

  const firstPage = useMemo<boolean>(() => page === 1, [page])
  const lastPage = useMemo<boolean>(() => page === pages, [page, pages])

  const nextPage = useCallback(() => dispatchPage('next'), [dispatchPage])
  const previousPage = useCallback(() => dispatchPage('prev'), [dispatchPage])

  return {
    items: currentPage,

    page,
    pages,

    firstPage,
    lastPage,

    nextPage,
    previousPage,
  }
}
