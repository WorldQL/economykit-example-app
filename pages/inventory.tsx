import { type NextPage } from 'next'
import Head from 'next/head'
import { Inventory } from '~/components/economykit/Inventory'
import { Error } from '~/components/views/Error'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { useEnsureAuth } from '~/lib/hooks/useAuth'
import { useInventory } from '~/lib/hooks/useInventory'

const InventoryPage: NextPage = () => {
  const auth = useEnsureAuth()
  const { inventory, error } = useInventory(auth)

  if (error) {
    return (
      <Error>
        <p>Failed to load inventory!</p>
        {error.response ? <pre>Error {error.response.status}</pre> : null}
      </Error>
    )
  }

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
