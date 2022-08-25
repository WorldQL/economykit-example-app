import { DndContext, useDroppable } from '@dnd-kit/core'
import { type FC, type Reducer, useReducer } from 'react'
import { Card } from '~/components/ui/Card'
import {
  type CommodityStack as CommodityStackModel,
  type Inventory,
  type UniqueItem as UniqueItemModel,
} from '~/lib/economykit/inventory'
import { useItemFilter } from '~/lib/hooks/useItemFilter'
import { useItemSet } from '~/lib/hooks/useItemSet'
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
  const [originSet, dispatchOrigin] = useItemFilter()
  const [recipientSet, dispatchRecipient] = useItemFilter()

  const {
    uniqueItems: originUniqueInventory,
    commodityStacks: originStackInventory,
  } = useItemSet(
    originator.uniqueItems,
    originator.commodityStacks,
    originSet,
    'exclude'
  )

  const { uniqueItems: originUniqueTrade, commodityStacks: originStackTrade } =
    useItemSet(
      originator.uniqueItems,
      originator.commodityStacks,
      originSet,
      'include'
    )

  const {
    uniqueItems: recipUniqueInventory,
    commodityStacks: recipStackInventory,
  } = useItemSet(
    recipient.uniqueItems,
    recipient.commodityStacks,
    recipientSet,
    'exclude'
  )

  const { uniqueItems: recipUniqueTrade, commodityStacks: recipStackTrade } =
    useItemSet(
      recipient.uniqueItems,
      recipient.commodityStacks,
      recipientSet,
      'include'
    )

  return (
    <Card>
      <div className='flex'>
        <div className='flex flex-col gap-6'>
          <h2 className='-mb-3 text-center text-lg font-semibold'>
            Your Items
          </h2>

          <DndContext>
            <DragItemGrid
              id={`${originator.id}/items`}
              height={3}
              uniqueItems={originUniqueInventory}
              commodityStacks={originStackInventory}
            />

            <DragExpandingItemGrid
              id={`${originator.id}/trade`}
              uniqueItems={originUniqueTrade}
              commodityStacks={originStackTrade}
            />
          </DndContext>
        </div>

        <div className='flex-grow' />

        <div className='flex flex-col gap-6'>
          <h2 className='-mb-3 text-center text-lg font-semibold'>
            Their Items
          </h2>

          <DragItemGrid
            id={`${recipient.id}/items`}
            height={3}
            uniqueItems={recipUniqueInventory}
            commodityStacks={recipStackInventory}
          />

          <DragExpandingItemGrid
            id={`${recipient.id}/trade`}
            uniqueItems={recipUniqueTrade}
            commodityStacks={recipStackTrade}
          />
        </div>
      </div>
    </Card>
  )
}

// #region Drag Grids
interface DropProps {
  id: string
}

type DragGridProps = Omit<
  ItemGridProps,
  'commodityStack' | 'uniqueItem' | 'blankItem'
> &
  DropProps

const DragItemGrid: FC<DragGridProps> = ({ ...props }) => (
  <ItemGrid
    uniqueItem={item => <UniqueItem key={item.id} draggable {...item} />}
    commodityStack={item => (
      <CommodityStack key={item.id} draggable {...item} />
    )}
    blankItem={idx => <BlankItem key={idx} />}
    {...props}
  />
)

type DragExpandingGridProps = Omit<
  ExpandingItemGridProps,
  'commodityStack' | 'uniqueItem' | 'blankItem'
> &
  DropProps

const DragExpandingItemGrid: FC<DragExpandingGridProps> = ({
  id,
  ...props
}) => {
  const x = useDroppable({ id })

  return (
    <ExpandingItemGrid
      uniqueItem={item => <UniqueItem key={item.id} draggable {...item} />}
      commodityStack={item => (
        <CommodityStack key={item.id} draggable {...item} />
      )}
      blankItem={idx => <BlankItem key={idx} />}
      {...props}
    />
  )
}
// #endregion
