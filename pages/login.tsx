import { type NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { Login } from '~/components/views/Login'
import { useEnsureLogin } from '~/lib/hooks/useAuth'

const LoginPage: NextPage = () => {
  const { error, authenticate } = useEnsureLogin()
  const [loading, setLoading] = useState<boolean>(false)

  const login = useCallback(
    async (name: string) => {
      setLoading(true)

      await authenticate(name)
      setLoading(false)
    },
    [authenticate, setLoading],
  )

  return (
    <>
      <Head>
        <title>EconomyKit Example App | Log In</title>
      </Head>

      <Login error={error} loading={loading} onLogin={login} />
    </>
  )
}

export default LoginPage
