import fnv1a from '@sindresorhus/fnv1a'
import { type FC, useMemo } from 'react'
import { type UniqueItem as UniqueItemModel } from '@worldql/economykit-client'
import { BaseItem, type DragProps } from './BaseItem'

export const UniqueItem: FC<UniqueItemModel & DragProps> = ({
  id,
  image,
  draggable,
}) => {
  const colour = useMemo<string>(() => {
    const hash = fnv1a(id)
    const hex = hash.toString(16).slice(0, 6)

    return `#${hex}`
  }, [id])

  return (
    <BaseItem
      id={id}
      img={image}
      draggable={draggable}
      className='outline-[color:var(--ring-color)]'
      // @ts-expect-error CSS Properties
      style={{ '--ring-color': colour }}
    />
  )
}
