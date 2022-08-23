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
  <div className='flex flex-col w-full'>
    <Navbar nav={nav} />

    <div className='w-full max-w-[1800px] mx-auto p-8'>{children}</div>
  </div>
)
