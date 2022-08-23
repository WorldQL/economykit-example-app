import { type FC } from 'react'
import { BlankItem } from '~/components/economykit/BlankItem'
import { CommodityStack } from '~/components/economykit/CommodityStack'
import { UniqueItem } from '~/components/economykit/UniqueItem'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import {
  type CommodityStack as CommodityStackModel,
  type UniqueItem as UniqueItemModel,
} from '~/lib/economykit/inventory'
import { useItemGrid } from '~/lib/hooks/useItemGrid'

interface Props {
  uniqueItems: UniqueItemModel[]
  commodityStacks: CommodityStackModel[]
}

export const Inventory: FC<Props> = ({ uniqueItems, commodityStacks }) => {
  const { items, page, pages, firstPage, lastPage, nextPage, previousPage } =
    useItemGrid(uniqueItems, commodityStacks)

  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold'>Inventory</h2>

        <div className='flex w-full gap-6'>
          <div className='flex flex-col gap-3'>
            <div className='grid grid-rows-5 grid-cols-5 gap-2'>
              {items.map((item, i) =>
                item === undefined ? (
                  <BlankItem />
                ) : item.type === 'uniqueItem' ? (
                  <UniqueItem key={item.id} {...item} />
                ) : (
                  <CommodityStack key={item.id} {...item} />
                )
              )}
            </div>

            {pages <= 1 ? null : (
              <div className='w-full flex items-center justify-between'>
                <Button disabled={firstPage} onClick={previousPage}>
                  &lt;
                </Button>

                <span>
                  {page} / {pages}
                </span>

                <Button disabled={lastPage} onClick={nextPage}>
                  &gt;
                </Button>
              </div>
            )}
          </div>

          <div className='flex-grow rounded m-1 p-2 outline outline-offset-2 outline-gray-400'>
            content
          </div>
        </div>
      </div>
    </Card>
  )
}
