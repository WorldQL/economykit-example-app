import { type CommodityStack as CommodityStackModel } from '@worldql/economykit-client'
import { type FC, useMemo } from 'react'
import { BaseItem, type DragProps } from './BaseItem'

export const CommodityStack: FC<CommodityStackModel & DragProps> = ({
  draggable,
  data: rawData,
  ...stack
}) => {
  const { id, quantity, image } = stack
  const data = useMemo(() => ({ ...rawData, ...stack }), [stack, rawData])

  const qty = useMemo<string>(() => {
    const human = quantity.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })

    return `x${human}`
  }, [quantity])

  return (
    <BaseItem
      id={id}
      data={data}
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
