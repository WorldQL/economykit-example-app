import { type FC } from 'react'
import Dirt from '../../Dirt.png'
import { BaseItem } from './BaseItem'

interface Props {
  // TODO: Match to API model
  name: string
}

export const UniqueItem: FC<Props> = ({ name }) => {
  return <BaseItem img={Dirt.src} className='outline-primary' />
}
