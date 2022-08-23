import { type NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { Inventory } from '~/components/economykit/Inventory'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { inventory as fetchInventory } from '~/lib/economykit/inventory'
import { useEnsureAuth } from '~/lib/hooks/useAuth'

const InventoryPage: NextPage = () => {
  const auth = useEnsureAuth()

  const { data: inventory } = useSWR(
    auth && ['/inventory', auth],
    async (_, auth) => fetchInventory(auth)
  )

  if (!auth || !inventory) return <Loading />

  const { displayName } = auth
  const { uniqueItems: items, commodityStacks: commodities } = inventory

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Inventory</title>
      </Head>

      <Page username={displayName}>
        <Inventory uniqueItems={items} commodityStacks={commodities} />
      </Page>
    </>
  )
}

export default InventoryPage
