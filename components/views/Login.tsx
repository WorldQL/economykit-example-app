import { type FC, useCallback, useState } from 'react'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { TextInput } from '~/components/ui/TextInput'

export const Login: FC = () => {
  const [username, setUsername] = useState<string>('')
  const onLogin = useCallback(() => {
    console.log(username)
  }, [username])

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Card className='flex flex-col gap-3 w-96'>
        <h2 className='text-center text-lg'>EconomyKit Example App</h2>

        <TextInput label='Username' value={username} onChange={setUsername} />
        <Button onClick={onLogin}>Sign In</Button>
      </Card>
    </div>
  )
}
