import Axios from 'axios'
import { baseURL } from '~/lib/economykit/env'

export const axios = Axios.create({
  baseURL,
})

/* eslint-disable @typescript-eslint/ban-types */
export interface PagedResponse<T> {
  next: number | null
  prev: number | null
  results: T[]
}
/* eslint-enable @typescript-eslint/ban-types */
