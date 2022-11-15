import type {
  CommodityStack as CommodityStackModel,
  UniqueItem as UniqueItemModel,
} from '@worldql/economykit-client'
import { type Inventory as InventoryModel } from '@worldql/economykit-client'
import { type FC, useCallback, useMemo, useState } from 'react'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { ItemGrid } from '~/components/economykit/ItemGrid'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Card } from '~/components/ui/Card'

export const Inventory: FC<InventoryModel> = ({
  playerID: id,
  uniqueItems,
  commodityStacks,
}) => {
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const clearSelected = useCallback(() => setSelected(undefined), [setSelected])

  const item = useMemo<
    CommodityStackModel | UniqueItemModel | undefined
  >(() => {
    const allItems = [...commodityStacks, ...uniqueItems]
    return allItems.find(item => item.id === selected)
  }, [uniqueItems, commodityStacks, selected])

  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold'>Inventory</h2>

        <div className='flex w-full flex-col items-center gap-6 lg:flex-row lg:items-stretch'>
          <ItemGrid
            blankItem={idx => <BlankItem key={idx} onClick={clearSelected} />}
            commodityStack={item => (
              <CommodityStack key={item.id} {...item} onClick={setSelected} />
            )}
            commodityStacks={commodityStacks}
            id={id}
            uniqueItem={item => (
              <UniqueItem key={item.id} {...item} onClick={setSelected} />
            )}
            uniqueItems={uniqueItems}
          />

          <div className='m-1 w-full flex-grow rounded p-2 outline outline-offset-2 outline-gray-400 lg:w-auto'>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        </div>
      </div>
    </Card>
  )
}
