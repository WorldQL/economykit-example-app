import { clsx } from 'clsx'
import {
  type CSSProperties,
  type FC,
  type PropsWithChildren,
  useCallback,
} from 'react'

interface Props {
  onClick: () => void

  className?: string
  style?: CSSProperties
}

export const Button: FC<PropsWithChildren<Props>> = ({
  onClick,
  className,
  style,
  children,
}) => {
  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') onClick()
  }, [onClick])

  return (
    <button
      type='button'
      className={clsx(
        'text-[0.9rem] text-white bg-primary transition-colors rounded-md px-2 py-2 hover:bg-primary-dark active:bg-primary-darker',
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
