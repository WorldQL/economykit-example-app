import { type FC } from 'react'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { ItemGrid } from '~/components/economykit/ItemGrid'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Card } from '~/components/ui/Card'
import { type Inventory as InventoryModel } from '~/lib/economykit/inventory'

export const Inventory: FC<InventoryModel> = ({
  id,
  uniqueItems,
  commodityStacks,
}) => (
  <Card>
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold'>Inventory</h2>

      <div className='flex w-full gap-6'>
        <ItemGrid
          id={id}
          uniqueItems={uniqueItems}
          commodityStacks={commodityStacks}
          uniqueItem={item => <UniqueItem key={item.id} {...item} />}
          commodityStack={item => <CommodityStack key={item.id} {...item} />}
          blankItem={idx => <BlankItem key={idx} />}
        />

        <div className='m-1 flex-grow rounded p-2 outline outline-offset-2 outline-gray-400'>
          content
        </div>
      </div>
    </div>
  </Card>
)
