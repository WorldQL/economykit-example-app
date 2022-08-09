import { type NextPage } from 'next'
import Head from 'next/head'
import { Login } from '~/components/views/Login'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EconomyKit Example App</title>
      </Head>

      <Login />
    </>
  )
}

export default Home
