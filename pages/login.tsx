import { type NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { Login } from '~/components/views/Login'
import { useEnsureLogin } from '~/lib/hooks/useAuth'

const LoginPage: NextPage = () => {
  const { authenticate, redirect } = useEnsureLogin()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const login = useCallback(
    async (name: string) => {
      setLoading(true)
      try {
        await authenticate(name)

        setError(undefined)
        await redirect()
      } catch (error: unknown) {
        if (error instanceof Error) setError(error)
      } finally {
        setLoading(false)
      }
    },
    [authenticate, redirect, setLoading, setError],
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
