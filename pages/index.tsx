import { type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { Error } from '~/components/views/Error'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { useEnsureAuth } from '~/lib/hooks/useAuth'
import { useInventory } from '~/lib/hooks/useInventory'

const Root: NextPage = () => {
  const auth = useEnsureAuth()
  const { inventory, error } = useInventory(auth)
  const { push } = useRouter()

  const viewInventory = useCallback(() => {
    void push('/inventory')
  }, [push])

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
        <title>EconomyKit Example App | Dashboard</title>
      </Head>

      <Page username={displayName}>
        <Card className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
            <p>TODO: List users to trade with</p>
          </div>
        </Card>
      </Page>
    </>
  )
}

export default Root
