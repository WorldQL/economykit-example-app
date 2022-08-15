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
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold'>Inventory</h2>

      <div className='flex w-full gap-6'>
        <div className='grid grid-rows-5 grid-cols-5 gap-2'>
          {items.map((_, i) =>
            i % 2 === 0 ? (
              <UniqueItem name={`${i}`} />
            ) : (
              <CommodityStack name={`${i}`} quantity={i} />
            )
          )}
        </div>

        <div className='flex-grow rounded outline outline-offset-2'>
          content
        </div>
      </div>
    </div>
  </Card>
)
