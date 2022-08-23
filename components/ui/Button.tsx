import { clsx } from 'clsx'
import {
  type CSSProperties,
  type FC,
  type PropsWithChildren,
  useCallback,
} from 'react'

interface Props {
  disabled?: boolean
  onClick: () => void

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
      type='button'
      disabled={disabled}
      className={clsx(
        'text-[0.9rem] text-white bg-primary disabled:opacity-50 transition-all rounded-md px-4 py-2 enabled:hover:bg-primary-dark enabled:active:bg-primary-darker',
        className
      )}
      style={style}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
