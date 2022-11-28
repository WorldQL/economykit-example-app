import { type FC, type PropsWithChildren } from 'react'
import { Navbar, type NavItems } from '~/components/ui/Navbar'

interface Props {
  username: string
}

const nav: NavItems = [
  ['Dashboard', '/'],
  ['Inventory', '/inventory'],
]

export const Page: FC<PropsWithChildren<Props>> = ({ username, children }) => (
  <div className='flex w-full flex-col'>
    <Navbar nav={nav} username={username} />

    <div className='mx-auto w-full max-w-[1800px] p-8'>{children}</div>
  </div>
)
