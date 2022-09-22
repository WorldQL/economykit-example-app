import { type FC, useMemo } from 'react'
import { type CommodityStack as CommodityStackModel } from '@worldql/economykit-client'
import { BaseItem, type DragProps } from './BaseItem'

export const CommodityStack: FC<CommodityStackModel & DragProps> = ({
  id,
  image,
  quantity,
  draggable,
}) => {
  const qty = useMemo<string>(() => {
    const human = quantity.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })

    return `x${human}`
  }, [quantity])

  return (
    <BaseItem
      id={id}
      img={image}
      draggable={draggable}
      className='outline-gray-400'
    >
      <div className='absolute top-[1px] left-[1px] rounded bg-black/60 px-1 text-xs text-white'>
        {qty}
      </div>
    </BaseItem>
  )
}
