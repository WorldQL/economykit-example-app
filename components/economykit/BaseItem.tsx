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
      'w-24 m-1',
      'flex items-center justify-center',
      'cursor-pointer group',
      className
    )}
  >
    <img
      className='p-1 group-hover:p-[1px] transition-[padding] rounded-lg'
      src={img}
      alt={alt}
    />
    {children}
  </div>
)
