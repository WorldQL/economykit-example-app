import { type CommodityStack as CommodityStackModel } from '@worldql/economykit-client'
import { type FC, useMemo } from 'react'
import { BaseItem, type ClickProps, type DragProps } from './BaseItem'

export const CommodityStack: FC<
  ClickProps & CommodityStackModel & DragProps
> = ({ onClick, draggable, data: rawData, ...stack }) => {
  const { id, quantity, image, displayName } = stack
  const data = useMemo(() => ({ ...rawData, ...stack }), [stack, rawData])

  const qty = useMemo<string>(() => {
    const human = quantity.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })

    return `x${human}`
  }, [quantity])

  return (
    <BaseItem
      alt={displayName}
      className='outline-gray-400'
      data={data}
      draggable={draggable}
      id={id}
      img={image}
      onClick={onClick}
    >
      <div className='absolute top-[1px] left-[1px] rounded bg-black/60 px-1 text-xs text-white'>
        {qty}
      </div>
    </BaseItem>
  )
}
