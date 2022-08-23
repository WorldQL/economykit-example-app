import { type FC, useMemo } from 'react'
import { CommodityStack as CommodityStackModel } from '~/lib/economykit/inventory'
import { BaseItem } from './BaseItem'

export const CommodityStack: FC<CommodityStackModel> = ({
  image,
  quantity,
}) => {
  const qty = useMemo<string>(() => {
    const human = quantity.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })

    return `x${human}`
  }, [quantity])

  return (
    <BaseItem img={image} className='outline-gray-400'>
      <div className='absolute top-[1px] left-[1px] text-white bg-black/60 text-xs px-1 rounded'>
        {qty}
      </div>
    </BaseItem>
  )
}
