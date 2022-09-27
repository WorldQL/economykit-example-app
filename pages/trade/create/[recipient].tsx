import { type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Trade } from '~/components/economykit/Trade'
import { Error } from '~/components/views/Error'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { useEnsureAuth } from '~/lib/hooks/useAuth'
import { useInventory } from '~/lib/hooks/useInventory'

const TradeCreate: NextPage = () => {
  const client = useEnsureAuth()

  const { query, isReady } = useRouter()
  const recipientID = useMemo<string | undefined>(() => {
    if (!isReady) return undefined
    const value = query.recipient

    if (Array.isArray(value)) return value[0]
    return value
  }, [isReady, query])

  const {
    inventory: originator,
    loading: originLoading,
    error: originError,
  } = useInventory(client)

  const {
    inventory: recipient,
    loading: recipLoading,
    error: recipError,
  } = useInventory(client, recipientID)

  const loading = useMemo<boolean>(
    () => originLoading || recipLoading,
    [originLoading, recipLoading],
  )

  if (originError) {
    return (
      <Error>
        <p>Failed to load your inventory!</p>
        {originError.response ? (
          <pre>Error {originError.response.status}</pre>
        ) : null}
      </Error>
    )
  }

  if (recipError) {
    return (
      <Error>
        <p>Failed to load target&apos;s inventory!</p>
        {recipError.response ? (
          <pre>Error {recipError.response.status}</pre>
        ) : null}
      </Error>
    )
  }

  if (!client || loading || !originator || !recipient) return <Loading />
  const { name } = client

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Create Trade</title>
      </Head>

      <Page username={name}>
        <Trade originator={originator} recipient={recipient} />
      </Page>
    </>
  )
}

export default TradeCreate
