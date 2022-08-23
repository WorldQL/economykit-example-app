import { type NextPage } from 'next'
import Head from 'next/head'
import { Loading } from '~/components/views/Loading'
import { Page } from '~/components/views/Page'
import { useEnsureAuth } from '~/lib/hooks/useAuth'

const Root: NextPage = () => {
  const auth = useEnsureAuth()

  if (!auth) return <Loading />
  const { displayName } = auth

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Dashboard</title>
      </Head>

      <Page username={displayName}>abc</Page>
    </>
  )
}

export default Root
