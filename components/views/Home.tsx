import { type FC } from 'react'
import { Navbar, type NavItems } from '~/components/ui/Navbar'

interface Props {
  username: string
}

const nav: NavItems = [
  ['Dashboard', '/'],
  ['Inventory', '/inventory'],
]

export const Home: FC<Props> = ({ username }) => (
  <div className='flex flex-col w-full'>
    <Navbar nav={nav} />
  </div>
)
