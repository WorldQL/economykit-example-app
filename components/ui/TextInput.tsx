import { clsx } from 'clsx'
import {
  type ChangeEventHandler,
  type CSSProperties,
  type FC,
  useCallback,
  useId,
} from 'react'

interface Props {
  value: string
  onChange: (value: string) => void

  label?: string
  placeholder?: string

  className?: string
  style?: CSSProperties
}

export const TextInput: FC<Props> = ({
  value,
  onChange,
  label,
  placeholder,
  className,
  style,
}) => {
  const id = useId()
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ev => {
      if (typeof onChange === 'function') onChange(ev.target.value)
    },
    [onChange]
  )

  return (
    <div className='flex flex-col gap-2'>
      {label ? (
        <label htmlFor={id} className='text-sm'>
          {label}
        </label>
      ) : null}

      <input
        id={id}
        type='text'
        className={clsx(
          'text-[0.9rem] block rounded-md shadow-sm border-gray-300 focus:border-primary focus:ring-primary',
          className
        )}
        style={style}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
