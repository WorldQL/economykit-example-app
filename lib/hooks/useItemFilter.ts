import {
  type CommodityStack,
  type UniqueItem,
} from '@worldql/economykit-client'
import { type Reducer, useReducer } from 'react'

type Action = 'add' | 'remove'
interface ActionData {
  action: Action
  entity: CommodityStack | UniqueItem
  quantity: 1
}

export type ItemFilter = Map<string, number>
type ItemsReducer = Reducer<ItemFilter, ActionData>

export const useItemFilter = () => {
  return useReducer<ItemsReducer>((previousState, data) => {
    switch (data.action) {
      case 'add': {
        const { entity, quantity } = data

        const qty = previousState.get(entity.id) ?? 0
        const value = qty + quantity

        previousState.set(entity.id, value)
        return new Map(previousState)
      }

      case 'remove': {
        const { entity, quantity } = data

        const qty = previousState.get(entity.id) ?? 0
        const value = qty - quantity

        previousState.set(entity.id, value)
        return new Map(previousState)
      }

      default:
        return previousState
    }
  }, new Map())
}
