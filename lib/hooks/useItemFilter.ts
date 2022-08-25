import { type Reducer, useReducer } from 'react'

type Action = 'add' | 'remove'
type ActionData = { action: Action; data: string }
type ItemsReducer = Reducer<Set<string>, ActionData>

export const useItemFilter = () => {
  const reducer = useReducer<ItemsReducer>(
    (previousState, { action, data }) => {
      switch (action) {
        case 'add': {
          previousState.add(data)
          return previousState
        }

        case 'remove': {
          previousState.delete(data)
          return previousState
        }

        default:
          return previousState
      }
    },
    new Set()
  )

  return reducer
}
