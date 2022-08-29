import { type NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { Inventory } from '~/components/economykit/Inventory'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { inventory as fetchInventory } from '~/lib/economykit/inventory'
import { useEnsureAuth } from '~/lib/hooks/useAuth'
import { useInventory } from '~/lib/hooks/useInventory'

const InventoryPage: NextPage = () => {
  const auth = useEnsureAuth()
  const { inventory } = useInventory(auth)

  if (!auth || !inventory) return <Loading />
  const { displayName } = auth

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Inventory</title>
      </Head>

      <Page username={displayName}>
        <Inventory {...inventory} />
      </Page>
    </>
  )
}

export default InventoryPage
