import {
  type CommodityStack,
  type UniqueItem,
} from '@worldql/economykit-client'
import { enableMapSet } from 'immer'
import { useImmerReducer } from 'use-immer'

type Action = 'add' | 'remove'
interface ActionData {
  action: Action
  entity: CommodityStack | UniqueItem
  quantity: number
}

export type ItemFilter = Map<string, number>
enableMapSet()

export const useItemFilter = () => {
  return useImmerReducer<ItemFilter, ActionData>((previousState, data) => {
    switch (data.action) {
      case 'add': {
        const { entity, quantity } = data

        const qty = previousState.get(entity.id) ?? 0
        const max = entity.type === 'commodityStack' ? entity.quantity : 1
        const value = qty + Math.min(quantity, max)

        previousState.set(entity.id, value)
        break
      }

      case 'remove': {
        const { entity, quantity } = data

        const qty = previousState.get(entity.id) ?? 0
        const value = Math.max(0, qty - quantity)

        if (value === 0) previousState.delete(entity.id)
        else previousState.set(entity.id, value)

        break
      }
    }
  }, new Map())
}
