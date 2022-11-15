import { type FC, useId } from 'react'
import { BaseItem, type ClickProps } from './BaseItem'

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

export const BlankItem: FC<ClickProps> = ({ onClick }) => {
  const id = useId()

  return (
    <BaseItem
      className='cursor-default bg-gray-50 outline-gray-100'
      draggable={false}
      id={id}
      img={BLANK_PIXEL}
      onClick={onClick}
    />
  )
}
