import { type FC } from 'react'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Card } from '~/components/ui/Card'
import { type Inventory as InventoryModel } from '~/lib/economykit/inventory'
import { useItemGrid } from '~/lib/hooks/useItemGrid'
import { ItemGrid } from './ItemGrid'

export const Inventory: FC<InventoryModel> = ({
  uniqueItems,
  commodityStacks,
}) => {
  const { items, page, pages, firstPage, lastPage, nextPage, previousPage } =
    useItemGrid(uniqueItems, commodityStacks)

  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold'>Inventory</h2>

        <div className='flex w-full gap-6'>
          <ItemGrid
            uniqueItems={uniqueItems}
            commodityStacks={commodityStacks}
            uniqueItem={item => <UniqueItem key={item.id} {...item} />}
            commodityStack={item => <CommodityStack key={item.id} {...item} />}
            blankItem={idx => <BlankItem key={idx} />}
          />

          <div className='flex-grow rounded m-1 p-2 outline outline-offset-2 outline-gray-400'>
            content
          </div>
        </div>
      </div>
    </Card>
  )
}
