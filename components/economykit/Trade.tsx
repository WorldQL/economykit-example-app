import { type FC } from 'react'
import { Card } from '~/components/ui/Card'
import { Inventory } from '~/lib/economykit/inventory'
import { BlankItem } from './BlankItem'
import { CommodityStack } from './CommodityStack'
import {
  ExpandingItemGrid,
  type ExpandingItemGridProps,
} from './ExpandingItemGrid'
import { ItemGrid, type ItemGridProps } from './ItemGrid'
import { UniqueItem } from './UniqueItem'

interface Props {
  originator: Inventory
  recipient: Inventory
}

export const Trade: FC<Props> = ({ originator, recipient }) => {
  // TODO: Drag and drop

  return (
    <Card>
      <div className='flex'>
        <div className='flex flex-col gap-6'>
          <h2 className='-mb-3 text-center text-lg font-semibold'>
            Your Items
          </h2>
          <DragItemGrid
            height={3}
            uniqueItems={originator.uniqueItems}
            commodityStacks={originator.commodityStacks}
          />

          <DragExpandingItemGrid
            uniqueItems={originator.uniqueItems}
            commodityStacks={originator.commodityStacks}
          />
        </div>

        <div className='flex-grow' />

        <div className='flex flex-col gap-6'>
          <h2 className='-mb-3 text-center text-lg font-semibold'>
            Their Items
          </h2>

          <DragItemGrid
            height={3}
            uniqueItems={recipient.uniqueItems}
            commodityStacks={recipient.commodityStacks}
          />

          <DragExpandingItemGrid
            uniqueItems={recipient.uniqueItems}
            commodityStacks={recipient.commodityStacks}
          />
        </div>
      </div>
    </Card>
  )
}

type DragGridProps = Omit<
  ItemGridProps,
  'commodityStack' | 'uniqueItem' | 'blankItem'
>

const DragItemGrid: FC<DragGridProps> = ({ ...props }) => (
  <ItemGrid
    uniqueItem={item => <UniqueItem key={item.id} {...item} />}
    commodityStack={item => <CommodityStack key={item.id} {...item} />}
    blankItem={idx => <BlankItem key={idx} />}
    {...props}
  />
)

type DragExpandingGridProps = Omit<
  ExpandingItemGridProps,
  'commodityStack' | 'uniqueItem' | 'blankItem'
>

const DragExpandingItemGrid: FC<DragExpandingGridProps> = ({ ...props }) => (
  <ExpandingItemGrid
    uniqueItem={item => <UniqueItem key={item.id} {...item} />}
    commodityStack={item => <CommodityStack key={item.id} {...item} />}
    blankItem={idx => <BlankItem key={idx} />}
    {...props}
  />
)
