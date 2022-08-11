import { type NextPage } from 'next'
import Head from 'next/head'
import { Home } from '~/components/views/Home'
import { Login } from '~/components/views/Login'
import { useAuth } from '~/lib/hooks/useAuth'

const Root: NextPage = () => {
  const { loaded, username, setUsername } = useAuth()

  return (
    <>
      <Head>
        <title>EconomyKit Example App</title>
      </Head>

      {!loaded ? null : !username ? (
        <Login onLogin={setUsername} />
      ) : (
        <Home username={username} />
      )}
    </>
  )
}

export default Root
