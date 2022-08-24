import Head from 'next/head'
import { type FC } from 'react'
import { Card } from '~/components/ui/Card'

export const Loading: FC = () => (
  <>
    <Head>
      <title>EconomyKit Example App</title>
    </Head>

    <div className='flex h-full flex-col items-center justify-center'>
      <Card className='flex flex-col gap-3 text-center'>
        <h2 className='text-lg font-bold'>EconomyKit Example App</h2>
        <span>Loading...</span>
      </Card>
    </div>
  </>
)
