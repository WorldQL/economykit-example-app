import { type FC } from 'react'

interface Props {
  // TODO: Match to API model
  items: unknown[]
}

export const Inventory: FC<Props> = ({ items }) => <div>Inventory</div>
