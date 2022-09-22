import { type Reducer, useReducer } from 'react'

type Action = 'add' | 'remove'
interface ActionData {
  action: Action
  id: string
}

type ItemsReducer = Reducer<Set<string>, ActionData>

export const useItemFilter = () => {
  return useReducer<ItemsReducer>((previousState, { action, id }) => {
    switch (action) {
      case 'add': {
        previousState.add(id)
        return new Set(previousState)
      }

      case 'remove': {
        previousState.delete(id)
        return new Set(previousState)
      }

      default:
        return previousState
    }
  }, new Set())
}
