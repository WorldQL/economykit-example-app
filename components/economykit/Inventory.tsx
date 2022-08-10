import { type FC } from 'react'

interface Props {
  // TODO: Match to API model
  items: unknown[]
  commodities: unknown[]
}

export const Inventory: FC<Props> = ({ items, commodities }) => (
  <div className='grid'>Inventory</div>
)
