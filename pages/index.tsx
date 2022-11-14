import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { Error } from '~/components/views/Error'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { useEnsureAuth } from '~/lib/hooks/useAuth'
import { useInventory } from '~/lib/hooks/useInventory'
import { usePlayers } from '~/lib/hooks/usePlayers'
import { useTrades } from '~/lib/hooks/useTrades'

const Root: NextPage = () => {
  const client = useEnsureAuth()
  const { push } = useRouter()
  const { inventory, error: inventoryError } = useInventory(client)
  const { players, error: playersError } = usePlayers(client)
  const { trades, error: tradesError } = useTrades(client)

  const viewInventory = useCallback(() => {
    void push('/inventory')
  }, [push])

  const error = inventoryError ?? playersError ?? tradesError
  if (error) {
    return (
      <Error>
        <p>Failed to load inventory!</p>
        {error.response ? <pre>Error {error.response.status}</pre> : null}
      </Error>
    )
  }

  if (!client || !inventory || !players || !trades) return <Loading />
  const { name } = client

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Dashboard</title>
      </Head>

      <Page username={name}>
        <Card className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div>
            <h1 className='text-lg font-semibold'>Inventory</h1>
            <p className='mb-1'>Unique Items: {inventory.uniqueItems.length}</p>
            <p className='mb-3'>
              Commodity Stacks: {inventory.commodityStacks.length}
            </p>

            <Button onClick={viewInventory}>View Full Inventory</Button>
          </div>

          <div>
            <h1 className='text-lg font-semibold'>Users</h1>
            <p className='mb-2 text-sm opacity-70'>
              Click a user to send a trade request!
            </p>

            <ul>
              {players.map(player => (
                <li key={player.id}>
                  <Link
                    className='underline'
                    href={`/trade/create/${player.id}`}
                  >
                    {player.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className='text-lg font-semibold'>Pending Trade Requests</h1>
            {/* <p className='mb-2 text-sm opacity-70'>
              Click a user to send a trade request!
            </p> */}

            <ul>
              {trades.map(trade => (
                <li key={trade.id}>
                  <Link
                    className='underline'
                    href={`/trade/pending/${trade.id}`}
                  >
                    {trade.sender.id === client.id
                      ? trade.recipient.name
                      : trade.sender.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Page>
    </>
  )
}

export default Root
