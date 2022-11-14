import { type FC, useId } from 'react'
import { BaseItem } from './BaseItem'

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

export const BlankItem: FC = () => {
  const id = useId()

  return (
    <BaseItem
      className='cursor-default bg-gray-50 outline-gray-100'
      draggable={false}
      id={id}
      img={BLANK_PIXEL}
    />
  )
}
