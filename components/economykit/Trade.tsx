import { type FC } from 'react'

interface Props {
  // TODO: Match to API model
  originator: unknown
  recipient: unknown
}

export const Inventory: FC<Props> = ({ originator, recipient }) => (
  <div>Inventory</div>
)
