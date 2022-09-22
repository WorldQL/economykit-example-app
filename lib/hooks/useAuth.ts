import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import { type PlayerAuthAPI } from '~/pages/api/login'
import { createPlayerClient } from '~/lib/economykit/client'
import { type PlayerScopedClient } from '@worldql/economykit-client'

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
}

const { useGlobalState } = createGlobalState<State>({
  loaded: false,
  data: undefined,
})

interface UseAuth extends State {
  authenticate: (name: string) => Promise<void>
  logout: () => void
}

export const useAuth: () => UseAuth = () => {
  const [loaded, setLoaded] = useGlobalState('loaded')
  const [data, setDataMemory] = useGlobalState('data')

  const setData = useCallback(
    (data: AuthData) => {
      const client = data ? createPlayerClient(data) : undefined

      setDataMemory(client)
      setDataStorage(data)
    },
    [setDataMemory]
  )

  useEffect(() => {
    if (loaded) return

    const local = getDataStorage()
    const now = Date.now()
    const expires = local !== undefined ? new Date(local.expires) : undefined

    if (expires && now < expires.getTime()) setData(local)
    setLoaded(true)
  }, [loaded, setLoaded, setData])

  const authenticate = useCallback(
    async (name: string) => {
      try {
        const { data } = await axios.post<PlayerAuthAPI>('/api/login', { name })
        setData(data)
      } catch (error) {
        console.error(error)
        // TODO
      }
    },
    [setData]
  )

  const logout = useCallback(() => setData(undefined), [setData])

  return { loaded, data, authenticate, logout }
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

  return !loaded ? undefined : data
}

export const useEnsureLogin = () => {
  const { loaded, data, authenticate } = useAuth()
  const { query, replace } = useRouter()

  const redirect = useCallback(async () => {
    const redirect = Array.isArray(query.redir) ? query.redir[0] : query.redir
    await replace(redirect ?? '/')
  }, [query.redir, replace])

  useEffect(() => {
    if (loaded && data !== undefined) void redirect()
  }, [loaded, data, redirect])

  return { authenticate, redirect }
}
