import { useCallback } from 'react'
import useSWR from 'swr'

const STORAGE_KEY = 'auth-token'
type AuthToken = string | undefined

const getAuthToken: () => AuthToken = () => {
  return localStorage.getItem(STORAGE_KEY) ?? undefined
}

const setAuthToken: (name: AuthToken) => void = name => {
  if (name === undefined) localStorage.removeItem(STORAGE_KEY)
  else localStorage.setItem(STORAGE_KEY, name)
}

export const useAuth = () => {
  const { data: username, mutate } = useSWR('/auth/username', getAuthToken)

  const updateUsername = useCallback(
    (name: string) => {
      setAuthToken(name)
      void mutate(name)
    },
    [mutate]
  )

  const clearUsername = useCallback(() => {
    setAuthToken(undefined)
    void mutate(undefined)
  }, [mutate])

  const loaded = true
  return { loaded, username, setUsername: updateUsername, clearUsername }
}
