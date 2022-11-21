import { type FC, useCallback, useState } from 'react'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { TextInput } from '~/components/ui/TextInput'

interface Props {
  loading: boolean
  error?: Error

  onLogin(username: string): void
}

export const Login: FC<Props> = ({ loading, error, onLogin }) => {
  const [username, setUsername] = useState<string>('')
  const handleClick = useCallback(() => {
    if (!username) return
    if (typeof onLogin === 'function') onLogin(username)
  }, [username, onLogin])

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Card className='flex w-96 flex-col gap-3'>
        <h2 className='text-center text-lg font-bold'>
          EconomyKit Example App
        </h2>

        <TextInput
          disabled={loading}
          label='Username'
          onChange={setUsername}
          onSubmit={handleClick}
          value={username}
        />

        {!error ? null : (
          <span className='-mt-1 mb-1 text-sm text-red-500'>
            Failed to log in.
          </span>
        )}

        <Button disabled={loading} onClick={handleClick}>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
      </Card>
    </div>
  )
}
