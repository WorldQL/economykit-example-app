import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import { type FC, useCallback } from 'react'
import { Card } from '~/components/ui/Card'
import {
  type CommodityStack as CommodityStackModel,
  type Inventory,
  type UniqueItem as UniqueItemModel,
} from '~/lib/economykit/inventory'
import { useItemFilter } from '~/lib/hooks/useItemFilter'
import { useItemSet } from '~/lib/hooks/useItemSet'
import { Button } from '../ui/Button'
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

  const confirm = useCallback(() => {
    // TODO
  }, [])

  return (
    <Card>
      <div className='flex'>
        <TradeInterface
          title='Your Items'
          id={originator.id}
          uniqueInventory={originUniqueInventory}
          stackInventory={originStackInventory}
          uniqueTrade={originUniqueTrade}
          stackTrade={originStackTrade}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        />

        <div className='flex flex-grow flex-col items-center justify-center px-4'>
          <div className='flex flex-grow items-center justify-center'>
            <h2>Drag and Drop items into the Trade Box Below</h2>
          </div>

          <Button onClick={confirm}>Send Trade Request</Button>
        </div>

        <TradeInterface
          title='Their Items'
          id={recipient.id}
          uniqueInventory={recipUniqueInventory}
          stackInventory={recipStackInventory}
          uniqueTrade={recipUniqueTrade}
          stackTrade={recipStackTrade}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        />
      </div>
    </Card>
  )
}

// #region Trade Interface
interface TradeInterfaceProps {
  title: string
  id: string

  uniqueInventory: readonly UniqueItemModel[]
  stackInventory: readonly CommodityStackModel[]

  uniqueTrade: readonly UniqueItemModel[]
  stackTrade: readonly CommodityStackModel[]

  onDragOver: (ev: DragOverEvent) => void
  onDragEnd: (ev: DragEndEvent) => void
}

const TradeInterface: FC<TradeInterfaceProps> = ({
  title,
  id,
  uniqueInventory,
  stackInventory,
  uniqueTrade,
  stackTrade,
  onDragOver,
  onDragEnd,
}) => (
  <div className='flex flex-col'>
    <h2 className='mb-3 text-center text-lg font-semibold'>{title}</h2>

    <DndContext onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <DragItemGrid
        id={`${id}/items`}
        height={3}
        uniqueItems={uniqueInventory}
        commodityStacks={stackInventory}
      />

      <h3 className='my-3 text-center text-sm font-semibold text-black/60'>
        Items up for trade
      </h3>

      <DragExpandingItemGrid
        id={`${id}/trade`}
        uniqueItems={uniqueTrade}
        commodityStacks={stackTrade}
      />
    </DndContext>
  </div>
)
// #endregion

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
