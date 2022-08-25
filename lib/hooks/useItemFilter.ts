import { type Reducer, useReducer } from 'react'

type Action = 'add' | 'remove'
type ActionData = { action: Action; id: string }
type ItemsReducer = Reducer<Set<string>, ActionData>

export const useItemFilter = () => {
  const reducer = useReducer<ItemsReducer>((previousState, { action, id }) => {
    console.log({ action, id })
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

  return reducer
}
