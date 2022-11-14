import { clsx } from 'clsx'
import {
  type ChangeEventHandler,
  type CSSProperties,
  type FC,
  type KeyboardEventHandler,
  useCallback,
  useId,
} from 'react'

interface Props {
  value: string
  onChange(value: string): void
  onSubmit?(): void

  label?: string
  placeholder?: string
  disabled?: boolean

  className?: string
  style?: CSSProperties
}

export const TextInput: FC<Props> = ({
  value,
  onChange,
  onSubmit,
  label,
  placeholder,
  disabled,
  className,
  style,
}) => {
  const id = useId()
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ev => {
      if (typeof onChange === 'function') onChange(ev.target.value)
    },
    [onChange],
  )

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    ev => {
      if (ev.key !== 'Enter') return
      if (typeof onSubmit === 'function') onSubmit()
    },
    [onSubmit],
  )

  return (
    <div className='flex flex-col gap-2'>
      {label ? (
        <label className='text-sm' htmlFor={id}>
          {label}
        </label>
      ) : null}

      <input
        className={clsx(
          'block rounded-md border-gray-300 text-[0.9rem] shadow-sm focus:border-primary focus:ring-primary',
          className,
        )}
        disabled={disabled}
        id={id}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={style}
        type='text'
        value={value}
      />
    </div>
  )
}
