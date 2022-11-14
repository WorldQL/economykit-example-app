import type { Trade } from '@worldql/economykit-client'
import {
  type CommodityStack as CommodityStackModel,
  type UniqueItem as UniqueItemModel,
} from '@worldql/economykit-client'
import { type FC, useMemo } from 'react'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { ExpandingItemGrid } from '~/components/economykit/ExpandingItemGrid'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'

interface Props {
  trade: Trade
  clientID: string
}

const TradeComponent: FC<Props> = ({ trade, clientID }) => {
  const sending = useMemo<boolean>(
    () => trade.sender.id === clientID,
    [trade, clientID],
  )

  const you = useMemo(
    () => (sending ? trade.sender : trade.recipient),
    [sending, trade],
  )

  const them = useMemo(
    () => (!sending ? trade.sender : trade.recipient),
    [sending, trade],
  )

  return (
    <Card>
      <div className='flex flex-col gap-8 lg:flex-row lg:gap-4'>
        <TradeInterface
          commodityStacks={them.commodityStacks}
          id={them.id}
          title='You Will Recieve'
          uniqueItems={them.uniqueItems}
        />

        <div className='flex flex-grow flex-col items-center justify-center'>
          {sending ? (
            <div className='text-neutral-800'>
              Waiting for <b>{them.name}</b> to respond...
            </div>
          ) : (
            // TODO: Style buttons
            // TODO: Implement buttons
            <div className='flex flex-col gap-2'>
              <Button className='mt-4 lg:mt-0' onClick={() => void 0}>
                Accept Trade Request
              </Button>

              <Button className='mt-4 lg:mt-0' onClick={() => void 0}>
                Deny Trade Request
              </Button>
            </div>
          )}
        </div>

        <TradeInterface
          commodityStacks={you.commodityStacks}
          id={you.id}
          title='They Will Recieve'
          uniqueItems={you.uniqueItems}
        />
      </div>
    </Card>
  )
}

// #region Trade Interface
interface TradeInterfaceProps {
  title: string
  id: string

  uniqueItems: readonly UniqueItemModel[]
  commodityStacks: readonly CommodityStackModel[]
}

const TradeInterface: FC<TradeInterfaceProps> = ({
  title,
  id,
  uniqueItems,
  commodityStacks,
}) => (
  <div className='flex flex-col items-center'>
    <h2 className='mb-3 text-center text-lg font-semibold'>{title}</h2>

    <ExpandingItemGrid
      blankItem={idx => <BlankItem key={idx} />}
      commodityStack={item => (
        <CommodityStack draggable key={item.id} {...item} />
      )}
      commodityStacks={commodityStacks}
      id={id}
      uniqueItem={item => <UniqueItem draggable key={item.id} {...item} />}
      uniqueItems={uniqueItems}
    />
  </div>
)
// #endregion

export { TradeComponent as Trade }
