import { type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Trade } from '~/components/economykit/Trade'
import { Error } from '~/components/views/Error'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { useEnsureAuth } from '~/lib/hooks/useAuth'
import { useTrade } from '~/lib/hooks/useTrade'

const TradePending: NextPage = () => {
  const client = useEnsureAuth()

  const { query, isReady } = useRouter()
  const tradeID = useMemo<string | undefined>(() => {
    if (!isReady) return undefined
    const value = query.id

    if (Array.isArray(value)) return value[0]
    return value
  }, [isReady, query])

  const { trade, loading, error, mutate } = useTrade(client, tradeID)

  if (error) {
    return (
      <Error>
        <p>Failed to trade details!</p>
        {error.response ? <pre>Error {error.response.status}</pre> : null}
      </Error>
    )
  }

  if (!client || loading || !trade) return <Loading />
  const { name } = client

  return (
    <>
      <Head>
        <title>EconomyKit Example App | View Trade</title>
      </Head>

      <Page username={name}>
        <Trade client={client} mutate={mutate} trade={trade} />
      </Page>
    </>
  )
}

export default TradePending
