import { type FC, type ReactNode } from 'react'
import { Button } from '~/components/ui/Button'
import {
  type CommodityStack,
  type UniqueItem,
} from '~/lib/economykit/inventory'
import { useExpandingItemGrid } from '~/lib/hooks/useExpandingItemGrid'

interface Props {
  uniqueItems: readonly UniqueItem[]
  commodityStacks: readonly CommodityStack[]

  uniqueItem: (item: UniqueItem) => ReactNode
  commodityStack: (stack: CommodityStack) => ReactNode
  blankItem: (idx: number) => ReactNode
}

export const ItemGrid: FC<Props> = ({
  uniqueItems,
  commodityStacks,
  uniqueItem,
  commodityStack,
  blankItem,
}) => {
  const items = useExpandingItemGrid(uniqueItems, commodityStacks)

  return (
    <div className='grid grid-rows-5 grid-cols-5 gap-2'>
      {items.map((item, i) =>
        item === undefined
          ? blankItem(i)
          : item.type === 'uniqueItem'
          ? uniqueItem(item)
          : commodityStack(item)
      )}
    </div>
  )
}
