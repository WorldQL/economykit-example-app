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
import { Card } from '~/components/ui/Card'

interface Props {
  trade: Trade
  clientID: string
}

const TradeComponent: FC<Props> = ({ trade, clientID }) => {
  const you = useMemo(
    () => (trade.sender.id === clientID ? trade.sender : trade.recipient),
    [trade, clientID],
  )

  const them = useMemo(
    () => (trade.sender.id !== clientID ? trade.sender : trade.recipient),
    [trade, clientID],
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
          {/* <div className='flex flex-grow items-center justify-center'>
            <h2 className='text-center'>
              Drag and Drop items into the Trade Box Below
            </h2>
          </div>

          <Button
            className='mt-4 lg:mt-0'
            onClick={confirm}
          >
            Send Trade Request
          </Button> */}
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
