import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import { type CSSProperties, type FC, type PropsWithChildren } from 'react'

interface Props {
  id: string

  img: string
  alt?: string

  className?: string
  style?: CSSProperties
}

export interface DragProps {
  draggable?: boolean
}

export const BaseItem: FC<PropsWithChildren<Props & DragProps>> = ({
  id,
  draggable = false,
  img,
  alt,
  className,
  style,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: !draggable,
    })

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: isDragging ? '100' : undefined,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'relative aspect-square rounded',
        'outline outline-offset-2',
        'm-1 max-w-[6rem]',
        'flex items-center justify-center',
        'group cursor-pointer',
        className
      )}
      {...listeners}
      {...attributes}
    >
      <img
        className='select-none rounded-lg p-1 transition-[padding] group-hover:p-[1px]'
        src={img}
        alt={alt}
        width={100}
      />
      {children}
    </div>
  )
}
