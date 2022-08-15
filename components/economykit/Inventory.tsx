import { type FC } from 'react'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Card } from '~/components/ui/Card'

interface Props {
  // TODO: Match to API model
  items: unknown[]
  commodities: unknown[]
}

export const Inventory: FC<Props> = ({ items, commodities }) => (
  <Card>
    <div className='flex flex-col'>
      <h2 className='text-lg font-bold'>Inventory</h2>

      <div className='flex w-full'>
        <div className='grid grid-rows-5 grid-cols-5 gap-2'>
          {items.map((_, i) =>
            i % 2 === 0 ? <UniqueItem /> : <CommodityStack quantity={i} />
          )}
        </div>

        <div className='flex-grow'>content</div>
      </div>
    </div>
  </Card>
)
