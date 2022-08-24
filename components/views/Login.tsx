import { type FC, useCallback, useState } from 'react'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { TextInput } from '~/components/ui/TextInput'

interface Props {
  loading: boolean
  error?: Error

  onLogin: (username: string) => void
}

export const Login: FC<Props> = ({ loading, onLogin }) => {
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
          label='Username'
          value={username}
          disabled={loading}
          onChange={setUsername}
          onSubmit={handleClick}
        />

        <Button disabled={loading} onClick={handleClick}>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
      </Card>
    </div>
  )
}
