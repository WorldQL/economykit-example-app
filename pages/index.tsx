import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Home } from '~/components/views/Home'
import { Login } from '~/components/views/Login'

const Root: NextPage = () => {
  const [username, setUsername] = useState<string | undefined>(undefined)

  return (
    <>
      <Head>
        <title>EconomyKit Example App</title>
      </Head>

      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <Home username={username} />
      )}
    </>
  )
}

export default Root
