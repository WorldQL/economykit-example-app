import { type NextPage } from 'next'
import Head from 'next/head'
import { Inventory } from '~/components/economykit/Inventory'
import { Error } from '~/components/views/Error'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { useEnsureAuth } from '~/lib/hooks/useAuth'
import { useInventory } from '~/lib/hooks/useInventory'

const InventoryPage: NextPage = () => {
  const client = useEnsureAuth()
  const { inventory, error } = useInventory(client)

  if (error) {
    return (
      <Error>
        <p>Failed to load inventory!</p>
        {error.response ? <pre>Error {error.response.status}</pre> : null}
      </Error>
    )
  }

  if (!client || !inventory) return <Loading />
  const { name } = client

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Inventory</title>
      </Head>

      <Page username={name}>
        <Inventory {...inventory} />
      </Page>
    </>
  )
}

export default InventoryPage
