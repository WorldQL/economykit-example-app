import { clsx } from 'clsx'
import { type CSSProperties, type FC, type PropsWithChildren } from 'react'

interface Props {
  img: string
  alt?: string

  className?: string
  style?: CSSProperties
}

export const BaseItem: FC<PropsWithChildren<Props>> = ({
  img,
  alt,
  className,
  style,
  children,
}) => (
  <div
    style={style}
    className={clsx(
      'relative aspect-square rounded',
      'outline outline-offset-2',
      'm-1 w-24',
      'flex items-center justify-center',
      'group cursor-pointer',
      className
    )}
  >
    <img
      className='select-none rounded-lg p-1 transition-[padding] group-hover:p-[1px]'
      src={img}
      alt={alt}
    />
    {children}
  </div>
)
