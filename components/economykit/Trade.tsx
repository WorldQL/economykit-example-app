import type { PlayerScopedClient, Trade } from '@worldql/economykit-client'
import {
  type CommodityStack as CommodityStackModel,
  TradeStatus,
  type UniqueItem as UniqueItemModel,
} from '@worldql/economykit-client'
import Link from 'next/link'
import { type FC, useCallback, useMemo } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import type { KeyedMutator } from 'swr'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { ExpandingItemGrid } from '~/components/economykit/ExpandingItemGrid'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'

const ReactSwal = withReactContent(Swal)

interface Props {
  client: PlayerScopedClient
  trade: Trade
  mutate: KeyedMutator<Trade>
}

const TradeComponent: FC<Props> = ({ client, trade, mutate }) => {
  const complete = useMemo<boolean>(
    () =>
      trade.status === TradeStatus.ACCEPTED ||
      trade.status === TradeStatus.DECLINED,
    [trade.status],
  )

  const accepted = useMemo<boolean>(
    () => trade.status === TradeStatus.ACCEPTED,
    [trade.status],
  )

  const sending = useMemo<boolean>(
    () => trade.sender.id === client.id,
    [trade, client.id],
  )

  const you = useMemo(
    () => (sending ? trade.sender : trade.recipient),
    [sending, trade],
  )

  const them = useMemo(
    () => (!sending ? trade.sender : trade.recipient),
    [sending, trade],
  )

  const handleAction = useCallback(
    async (action: 'accept' | 'deny') => {
      if (sending) return
      if (complete) return

      const { isConfirmed } = await ReactSwal.fire({
        title: 'Trade Request',
        icon: 'question',
        text: `Are you sure you want to ${action} this trade request from ${them.name}?`,
        confirmButtonText: 'Confirm',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      })

      if (!isConfirmed) return

      try {
        const updated = await (action === 'accept'
          ? client.acceptTradeRequest(trade.id)
          : client.denyTradeRequest(trade.id))

        await mutate(updated, { revalidate: true })
      } catch (error) {
        console.error(error)

        await ReactSwal.fire({
          title: 'Error Responding to Trade Request',
          icon: 'error',
          text: 'Something went wrong! Please try again later.',
        })
      }
    },
    [client, trade.id, them.name, sending, complete, mutate],
  )

  const handleAccept = useCallback(
    async () => handleAction('accept'),
    [handleAction],
  )

  const handleDeny = useCallback(
    async () => handleAction('deny'),
    [handleAction],
  )

  return (
    <Card>
      <div className='flex flex-col gap-8 lg:flex-row lg:gap-4'>
        <TradeInterface
          commodityStacks={them.commodityStacks}
          id={them.id}
          title={
            accepted
              ? 'You Recieved'
              : complete
              ? 'They Offered'
              : 'You Will Recieve'
          }
          uniqueItems={them.uniqueItems}
        />

        <div className='flex flex-grow flex-col items-center justify-center'>
          {complete ? (
            <div className='flex flex-col items-center gap-2'>
              <div className='font-bold italic text-neutral-800'>
                The trade was {trade.status}.
              </div>

              <Link className='underline' href='/inventory'>
                View Inventory
              </Link>
            </div>
          ) : sending ? (
            <div className='text-neutral-800'>
              Waiting for <b>{them.name}</b> to respond...
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <Button className='mt-4 lg:mt-0' onClick={handleAccept}>
                Accept
              </Button>

              <Button
                className='mt-4 bg-red-500 enabled:hover:bg-red-600 enabled:active:bg-red-700 lg:mt-0'
                onClick={handleDeny}
              >
                Deny
              </Button>
            </div>
          )}
        </div>

        <TradeInterface
          commodityStacks={you.commodityStacks}
          id={you.id}
          title={
            accepted
              ? 'You Sent'
              : complete
              ? 'You Offered'
              : 'They Will Recieve'
          }
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
