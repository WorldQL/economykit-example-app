import { type FC } from 'react'
import { BaseItem } from './BaseItem'

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

export const BlankItem: FC = () => {
  return (
    <BaseItem
      img={BLANK_PIXEL}
      className='cursor-default bg-gray-50 outline-gray-100'
    />
  )
}
