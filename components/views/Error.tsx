import Head from 'next/head'
import { type FC, type PropsWithChildren } from 'react'
import { Card } from '~/components/ui/Card'

interface Props {
  title?: string
}

export const Error: FC<PropsWithChildren<Props>> = ({
  title = 'Error',
  children,
}) => (
  <>
    <Head>
      <title>{`EconomyKit Example App | ${title}`}</title>
    </Head>

    <div className='flex h-full flex-col items-center justify-center'>
      <Card className='flex flex-col gap-3 text-center'>
        <h2 className='text-lg font-bold'>{title}</h2>
        {children}
      </Card>
    </div>
  </>
)
