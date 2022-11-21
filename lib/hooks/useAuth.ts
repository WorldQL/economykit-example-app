import { type PlayerScopedClient } from '@worldql/economykit-client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import { createPlayerClient } from '~/lib/economykit/client'
import { type PlayerAuthAPI } from '~/pages/api/login'

const STORAGE_KEY = 'auth'
type AuthData = PlayerAuthAPI | undefined

const getDataStorage: () => AuthData = () => {
  const data = localStorage.getItem(STORAGE_KEY) ?? undefined
  return data ? (JSON.parse(data) as PlayerAuthAPI) : undefined
}

const setDataStorage: (data: AuthData) => void = data => {
  if (data === undefined) localStorage.removeItem(STORAGE_KEY)
  else localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

interface State {
  loaded: boolean
  data: PlayerScopedClient | undefined
  error: Error | undefined
}

const { useGlobalState } = createGlobalState<State>({
  loaded: false,
  data: undefined,
  error: undefined,
})

interface Props {
  onSuccess?(client: Readonly<PlayerScopedClient>): void
  onError?(error: Error): void
  onLogout?(): void
}

interface UseAuth extends State {
  authenticate(this: void, name: string): Promise<void>
  logout(this: void): void
}

export const useAuth: () => UseAuth = () => {
  const [loaded, setLoaded] = useGlobalState('loaded')
  const [data, setDataMemory] = useGlobalState('data')
  const [error, setError] = useGlobalState('error')

  const setData = useCallback(
    (data: AuthData) => {
      const client = data ? createPlayerClient(data) : undefined

      setDataMemory(client)
      setDataStorage(data)
    },
    [setDataMemory],
  )

  useEffect(() => {
    if (loaded) return

    const local = getDataStorage()
    const now = Date.now()
    const expires = local === undefined ? undefined : new Date(local.expires)

    if (expires && now < expires.getTime()) setData(local)
    setLoaded(true)
  }, [loaded, setLoaded, setData])

  const authenticate = useCallback(
    async (name: string) => {
      try {
        const { data } = await axios.post<PlayerAuthAPI>('/api/login', { name })

        setData(data)
        setError(undefined)
      } catch (error) {
        if (error instanceof Error) setError(error)
        else throw error
      }
    },
    [setData, setError],
  )

  const logout = useCallback(() => setData(undefined), [setData])
  return { loaded, data, error, authenticate, logout }
}

export const useEnsureAuth = () => {
  const { loaded, data } = useAuth()
  const { isReady, asPath, replace } = useRouter()

  useEffect(() => {
    if (!isReady) return
    if (loaded && data === undefined) {
      const parameters = new URLSearchParams({ redir: asPath }).toString()
      void replace(`/login?${parameters}`)
    }
  }, [loaded, data, isReady, asPath, replace])

  return loaded ? data : undefined
}

export const useEnsureLogin = () => {
  const { query, replace } = useRouter()

  const redirect = useCallback(async () => {
    const redirect = Array.isArray(query.redir) ? query.redir[0] : query.redir
    await replace(redirect ?? '/')
  }, [query.redir, replace])

  const { loaded, data, error, authenticate } = useAuth()
  useEffect(() => {
    if (loaded && data !== undefined) void redirect()
  }, [loaded, data, redirect])

  return { loaded, error, authenticate, redirect }
}
