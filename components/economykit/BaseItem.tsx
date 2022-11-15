import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import {
  type CSSProperties,
  type FC,
  type PropsWithChildren,
  useCallback,
} from 'react'

interface Props {
  id: string

  img: string
  alt?: string

  className?: string
  style?: CSSProperties
}

export interface ClickProps {
  onClick?(id: string): void
}

export interface DragProps {
  draggable?: boolean
  data?: Record<string, unknown>
}

type AllProps = PropsWithChildren<ClickProps & DragProps & Props>
export const BaseItem: FC<AllProps> = ({
  id,
  data,
  draggable = false,
  img,
  alt,
  className,
  style,
  children,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data,
      disabled: !draggable,
    })

  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') onClick(id)
  }, [id, onClick])

  return (
    <div
      className={clsx(
        'relative aspect-square rounded',
        'outline outline-offset-2',
        'm-1 max-w-[6rem]',
        'flex items-center justify-center',
        'group cursor-pointer',
        className,
      )}
      onClick={handleClick}
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: isDragging ? '100' : undefined,
        transform: CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
    >
      <img
        alt={alt}
        className='select-none rounded-lg p-1 transition-[padding] group-hover:p-[1px]'
        src={img}
        title={alt}
        width={100}
      />
      {children}
    </div>
  )
}
