import { useDroppable } from '@dnd-kit/core'
import {
  type CommodityStack,
  type UniqueItem,
} from '@worldql/economykit-client'
import { type FC, type ReactNode } from 'react'
import { useExpandingItemGrid } from '~/lib/hooks/useExpandingItemGrid'

interface Props {
  id: string
  droppable?: boolean

  width?: number

  uniqueItems: readonly UniqueItem[]
  commodityStacks: readonly CommodityStack[]

  uniqueItem(item: UniqueItem): ReactNode
  commodityStack(stack: CommodityStack): ReactNode
  blankItem(idx: number): ReactNode
}

export const ExpandingItemGrid: FC<Props> = ({
  id,
  droppable = false,
  width = 5,
  uniqueItems,
  commodityStacks,
  uniqueItem,
  commodityStack,
  blankItem,
}) => {
  const { setNodeRef } = useDroppable({ id, disabled: !droppable })
  const items = useExpandingItemGrid(uniqueItems, commodityStacks, width)

  return (
    <div
      ref={setNodeRef}
      className='grid gap-2'
      style={{
        gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item, idx) =>
        item === undefined
          ? blankItem(idx)
          : item.type === 'uniqueItem'
          ? uniqueItem(item)
          : commodityStack(item),
      )}
    </div>
  )
}

export { type Props as ExpandingItemGridProps }
