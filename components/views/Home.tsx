import { type FC } from 'react'
import { Inventory } from '~/components/economykit/Inventory'
import { Navbar, type NavItems } from '~/components/ui/Navbar'

interface Props {
  username: string
}

const nav: NavItems = [
  ['Dashboard', '/'],
  ['Inventory', '/inventory'],
]

// TODO: Use actual items
const items = Array.from({ length: 30 })

export const Home: FC<Props> = ({ username }) => (
  <div className='flex flex-col w-full'>
    <Navbar nav={nav} />

    <div className='w-full p-8'>
      <Inventory items={items} commodities={[]} />
    </div>
  </div>
)
