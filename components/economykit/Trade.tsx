import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import {
  type CommodityStack as CommodityStackModel,
  type Inventory,
  type UniqueItem as UniqueItemModel,
} from '@worldql/economykit-client'
import { type FC, useCallback } from 'react'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import {
  ExpandingItemGrid,
  type ExpandingItemGridProps,
} from '~/components/economykit/ExpandingItemGrid'
import { ItemGrid, type ItemGridProps } from '~/components/economykit/ItemGrid'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { useItemFilter } from '~/lib/hooks/useItemFilter'
import { useItemSet } from '~/lib/hooks/useItemSet'

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
    'exclude',
  )

  const { uniqueItems: originUniqueTrade, commodityStacks: originStackTrade } =
    useItemSet(
      originator.uniqueItems,
      originator.commodityStacks,
      originSet,
      'include',
    )

  const {
    uniqueItems: recipUniqueInventory,
    commodityStacks: recipStackInventory,
  } = useItemSet(
    recipient.uniqueItems,
    recipient.commodityStacks,
    recipientSet,
    'exclude',
  )

  const { uniqueItems: recipUniqueTrade, commodityStacks: recipStackTrade } =
    useItemSet(
      recipient.uniqueItems,
      recipient.commodityStacks,
      recipientSet,
      'include',
    )

  const onDragOver = useCallback((ev: DragOverEvent) => {
    // TODO
  }, [])

  const onDragEnd = useCallback(
    (ev: DragEndEvent) => {
      const rawID = ev.active.id
      const over = ev.over?.id

      if (!over) return
      if (typeof rawID !== 'string') return
      if (typeof over !== 'string') return

      type Data = CommodityStackModel | UniqueItemModel | undefined
      const data = ev.active.data.current as Data
      if (data === undefined) {
        throw new Error('data is undefined')
      }

      const isOriginator = over.startsWith(originator.playerID)
      const isOverTrade = over.endsWith('/trade')

      const [id] = data.id.split('/')
      const entity: CommodityStackModel | UniqueItemModel = { ...data, id }
      const dispatch = isOriginator ? dispatchOrigin : dispatchRecipient

      if (isOverTrade) {
        console.log('aa')
        dispatch({ action: 'add', entity, quantity: 1 })
      } else {
        dispatch({ action: 'remove', entity, quantity: 1 })
      }
    },
    [originator.playerID, dispatchOrigin, dispatchRecipient],
  )

  const confirm = useCallback(() => {
    // TODO
  }, [])

  return (
    <Card>
      <div className='flex flex-col gap-8 lg:flex-row lg:gap-4'>
        <TradeInterface
          id={originator.playerID}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          stackInventory={originStackInventory}
          stackTrade={originStackTrade}
          title='Your Items'
          uniqueInventory={originUniqueInventory}
          uniqueTrade={originUniqueTrade}
        />

        <div className='flex flex-grow flex-col items-center justify-center'>
          <div className='flex flex-grow items-center justify-center'>
            <h2 className='text-center'>
              Drag and Drop items into the Trade Box Below
            </h2>
          </div>

          <Button className='mt-4 lg:mt-0' onClick={confirm}>
            Send Trade Request
          </Button>
        </div>

        <TradeInterface
          id={recipient.playerID}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          stackInventory={recipStackInventory}
          stackTrade={recipStackTrade}
          title='Their Items'
          uniqueInventory={recipUniqueInventory}
          uniqueTrade={recipUniqueTrade}
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

  onDragOver(ev: DragOverEvent): void
  onDragEnd(ev: DragEndEvent): void
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
  <div className='flex flex-col items-center'>
    <h2 className='mb-3 text-center text-lg font-semibold'>{title}</h2>

    <DndContext onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <DragItemGrid
        commodityStacks={stackInventory}
        height={3}
        id={`${id}/items`}
        uniqueItems={uniqueInventory}
      />

      <h3 className='my-3 text-center text-sm font-semibold text-black/60'>
        Items up for trade
      </h3>

      <DragExpandingItemGrid
        commodityStacks={stackTrade}
        id={`${id}/trade`}
        uniqueItems={uniqueTrade}
      />
    </DndContext>
  </div>
)
// #endregion

// #region Drag Grids
type IgnoreFields = 'blankItem' | 'commodityStack' | 'uniqueItem'

type DragGridProps = Omit<ItemGridProps, IgnoreFields>
const DragItemGrid: FC<DragGridProps> = ({ ...props }) => (
  <ItemGrid
    blankItem={idx => <BlankItem key={idx} />}
    commodityStack={item => (
      <CommodityStack draggable key={item.id} {...item} />
    )}
    droppable
    uniqueItem={item => <UniqueItem draggable key={item.id} {...item} />}
    {...props}
  />
)

type DragExpandingGridProps = Omit<ExpandingItemGridProps, IgnoreFields>
const DragExpandingItemGrid: FC<DragExpandingGridProps> = ({ ...props }) => (
  <ExpandingItemGrid
    blankItem={idx => <BlankItem key={idx} />}
    commodityStack={item => (
      <CommodityStack draggable key={item.id} {...item} />
    )}
    droppable
    uniqueItem={item => <UniqueItem draggable key={item.id} {...item} />}
    {...props}
  />
)
// #endregion
