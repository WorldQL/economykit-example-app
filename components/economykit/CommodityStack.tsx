import { type FC } from 'react'

interface Props {
  // TODO: Match to API model
  name: string
  quantity: number
}

export const CommodityStack: FC<Props> = ({ name, quantity }) => (
  <div>CommodityStack</div>
)
