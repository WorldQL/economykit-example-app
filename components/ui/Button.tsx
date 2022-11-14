import { clsx } from 'clsx'
import {
  type CSSProperties,
  type FC,
  type PropsWithChildren,
  useCallback,
} from 'react'

interface Props {
  disabled?: boolean
  onClick(): void

  className?: string
  style?: CSSProperties
}

export const Button: FC<PropsWithChildren<Props>> = ({
  disabled,
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
      className={clsx(
        'rounded-md bg-primary px-4 py-2 text-[0.9rem] text-white transition-all enabled:hover:bg-primary-dark enabled:active:bg-primary-darker disabled:opacity-50',
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      style={style}
      type='button'
    >
      {children}
    </button>
  )
}
