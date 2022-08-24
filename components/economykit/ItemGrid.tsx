import { type FC, type ReactNode } from 'react'
import { Button } from '~/components/ui/Button'
import {
  type CommodityStack,
  type UniqueItem,
} from '~/lib/economykit/inventory'
import { useItemGrid } from '~/lib/hooks/useItemGrid'

interface Props {
  width?: number
  height?: number

  uniqueItems: readonly UniqueItem[]
  commodityStacks: readonly CommodityStack[]

  uniqueItem: (item: UniqueItem) => ReactNode
  commodityStack: (stack: CommodityStack) => ReactNode
  blankItem: (idx: number) => ReactNode
}

export const ItemGrid: FC<Props> = ({
  width = 5,
  height = width,
  uniqueItems,
  commodityStacks,
  uniqueItem,
  commodityStack,
  blankItem,
}) => {
  const grid = useItemGrid(uniqueItems, commodityStacks, width, height)
  console.log(grid)

  return (
    <div className='flex flex-col gap-3'>
      <div
        className='grid gap-2'
        style={{
          gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
        }}
      >
        {grid.items.map((item, i) =>
          item === undefined
            ? blankItem(i)
            : item.type === 'uniqueItem'
            ? uniqueItem(item)
            : commodityStack(item)
        )}
      </div>

      {grid.pages <= 1 ? null : (
        <div className='flex w-full items-center justify-between'>
          <Button disabled={grid.firstPage} onClick={grid.previousPage}>
            &lt;
          </Button>

          <span>
            {grid.page} / {grid.pages}
          </span>

          <Button disabled={grid.lastPage} onClick={grid.nextPage}>
            &gt;
          </Button>
        </div>
      )}
    </div>
  )
}

export { type Props as ItemGridProps }
