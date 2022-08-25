import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import { type FC, useCallback } from 'react'
import { Card } from '~/components/ui/Card'
import { type Inventory } from '~/lib/economykit/inventory'
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

  const onDragOver = useCallback((ev: DragOverEvent) => {
    // TODO
    console.log(ev)
  }, [])

  const onDragEnd = useCallback(
    (ev: DragEndEvent) => {
      const id = ev.active.id
      const over = ev.over?.id

      if (!over) return
      if (typeof id !== 'string') return
      if (typeof over !== 'string') return

      const isOriginator = over.startsWith(originator.id)
      const isOverTrade = over.endsWith('/trade')

      const dispatch = isOriginator ? dispatchOrigin : dispatchRecipient
      if (isOverTrade) dispatch({ action: 'add', id })
      else dispatch({ action: 'remove', id })
    },
    [originator.id, dispatchOrigin, dispatchRecipient]
  )

  return (
    <Card>
      <div className='flex'>
        <div className='flex flex-col gap-6'>
          <h2 className='-mb-3 text-center text-lg font-semibold'>
            Your Items
          </h2>

          <DndContext onDragOver={onDragOver} onDragEnd={onDragEnd}>
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
type IgnoreFields = 'commodityStack' | 'uniqueItem' | 'blankItem'

type DragGridProps = Omit<ItemGridProps, IgnoreFields>
const DragItemGrid: FC<DragGridProps> = ({ ...props }) => (
  <ItemGrid
    droppable
    uniqueItem={item => <UniqueItem key={item.id} draggable {...item} />}
    commodityStack={item => (
      <CommodityStack key={item.id} draggable {...item} />
    )}
    blankItem={idx => <BlankItem key={idx} />}
    {...props}
  />
)

type DragExpandingGridProps = Omit<ExpandingItemGridProps, IgnoreFields>
const DragExpandingItemGrid: FC<DragExpandingGridProps> = ({ ...props }) => (
  <ExpandingItemGrid
    droppable
    uniqueItem={item => <UniqueItem key={item.id} draggable {...item} />}
    commodityStack={item => (
      <CommodityStack key={item.id} draggable {...item} />
    )}
    blankItem={idx => <BlankItem key={idx} />}
    {...props}
  />
)
// #endregion
