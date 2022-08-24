import { type FC, type ReactNode } from 'react'
import { Button } from '~/components/ui/Button'
import {
  type CommodityStack,
  type UniqueItem,
} from '~/lib/economykit/inventory'
import { useItemGrid } from '~/lib/hooks/useItemGrid'

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
  const grid = useItemGrid(uniqueItems, commodityStacks)

  return (
    <div className='flex flex-col gap-3'>
      <div className='grid grid-rows-5 grid-cols-5 gap-2'>
        {grid.items.map((item, i) =>
          item === undefined
            ? blankItem(i)
            : item.type === 'uniqueItem'
            ? uniqueItem(item)
            : commodityStack(item)
        )}
      </div>

      {grid.pages <= 1 ? null : (
        <div className='w-full flex items-center justify-between'>
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
