import { useCallback } from 'react'
import useSWR from 'swr'

const STORAGE_KEY = 'username'
type Username = string | undefined

const getUsername: () => Username = () => {
  return localStorage.getItem(STORAGE_KEY) ?? undefined
}

const setUsername: (name: Username) => void = name => {
  if (name === undefined) localStorage.removeItem(STORAGE_KEY)
  else localStorage.setItem(STORAGE_KEY, name)
}

export const useAuth = () => {
  const { data: username, mutate } = useSWR('/auth/username', getUsername)

  const updateUsername = useCallback(
    (name: string) => {
      setUsername(name)
      void mutate(name)
    },
    [mutate]
  )

  const clearUsername = useCallback(() => {
    setUsername(undefined)
    void mutate(undefined)
  }, [mutate])

  const loaded = true
  return { loaded, username, setUsername: updateUsername, clearUsername }
}
