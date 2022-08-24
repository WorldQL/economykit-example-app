import { type FC, type ReactNode } from 'react'
import {
  type CommodityStack,
  type UniqueItem,
} from '~/lib/economykit/inventory'
import { useExpandingItemGrid } from '~/lib/hooks/useExpandingItemGrid'

interface Props {
  width?: number

  uniqueItems: readonly UniqueItem[]
  commodityStacks: readonly CommodityStack[]

  uniqueItem: (item: UniqueItem) => ReactNode
  commodityStack: (stack: CommodityStack) => ReactNode
  blankItem: (idx: number) => ReactNode
}

export const ExpandingItemGrid: FC<Props> = ({
  width = 5,
  uniqueItems,
  commodityStacks,
  uniqueItem,
  commodityStack,
  blankItem,
}) => {
  const items = useExpandingItemGrid(uniqueItems, commodityStacks, width)

  return (
    <div
      className='grid gap-2'
      style={{
        gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
      }}
    >
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

export { type Props as ExpandingItemGridProps }
