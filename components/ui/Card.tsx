import { clsx } from 'clsx'
import { type CSSProperties, type FC, type PropsWithChildren } from 'react'

interface Props {
  className?: string
  style?: CSSProperties
}

export const Card: FC<PropsWithChildren<Props>> = ({
  className,
  style,
  children,
}) => (
  <div
    className={clsx(
      'rounded-lg bg-white px-6 py-5 shadow-xl shadow-black/5 ring-1 ring-slate-700/10',
      className,
    )}
    style={style}
  >
    {children}
  </div>
)
