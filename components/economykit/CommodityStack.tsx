import { type FC, useMemo } from 'react'
import Grass from '../../Grass_Block_JE7_BE6.png'
import { BaseItem } from './BaseItem'

interface Props {
  // TODO: Match to API model
  name: string
  quantity: number
}

export const CommodityStack: FC<Props> = ({ name, quantity }) => {
  const qty = useMemo<string>(() => {
    const human = quantity.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })

    return `x${human}`
  }, [quantity])

  return (
    <BaseItem img={Grass.src} className='ring-gray-300'>
      <div className='absolute top-[2px] left-[2px] text-white bg-black/60 text-xs px-1 rounded'>
        {qty}
      </div>
    </BaseItem>
  )
}
