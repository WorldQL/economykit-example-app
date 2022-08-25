import { type NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { Trade } from '~/components/economykit/Trade'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { inventory as fetchInventory } from '~/lib/economykit/inventory'
import { useEnsureAuth } from '~/lib/hooks/useAuth'

const TradeCreate: NextPage = () => {
  const auth = useEnsureAuth()

  const { data: originator } = useSWR(
    auth && ['/inventory', auth],
    async (_, auth) => fetchInventory(auth)
  )

  if (!auth || !originator) return <Loading />

  const { displayName } = auth

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Create Trade</title>
      </Head>

      <Page username={displayName}>
        <Trade
          originator={originator}
          // TODO: Retrieve recipient's items
          recipient={{ id: 'recipient', uniqueItems: [], commodityStacks: [] }}
        />
      </Page>
    </>
  )
}

export default TradeCreate
