import { type Inventory as InventoryModel } from '@worldql/economykit-client'
import { type FC } from 'react'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { ItemGrid } from '~/components/economykit/ItemGrid'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Card } from '~/components/ui/Card'

export const Inventory: FC<InventoryModel> = ({
  playerID: id,
  uniqueItems,
  commodityStacks,
}) => (
  <Card>
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold'>Inventory</h2>

      <div className='flex w-full flex-col items-center gap-6 lg:flex-row lg:items-stretch'>
        <ItemGrid
          blankItem={idx => <BlankItem key={idx} />}
          commodityStack={item => <CommodityStack key={item.id} {...item} />}
          commodityStacks={commodityStacks}
          id={id}
          uniqueItem={item => <UniqueItem key={item.id} {...item} />}
          uniqueItems={uniqueItems}
        />

        <div className='m-1 w-full flex-grow rounded p-2 outline outline-offset-2 outline-gray-400 lg:w-auto'>
          content
        </div>
      </div>
    </div>
  </Card>
)
