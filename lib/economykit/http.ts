import Axios, { type AxiosRequestConfig } from 'axios'
import { baseURL } from '~/lib/economykit/env'
import { type AuthResponse } from '~/pages/api/login'

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

export async function paginated<T>(
  url: string,
  { token }: AuthResponse,
  config?: AxiosRequestConfig
) {
  const results: T[] = []

  /* eslint-disable no-await-in-loop */
  let page: number | undefined = 1
  while (page !== undefined) {
    const parameters = config?.params as Record<string, unknown> | undefined
    const resp = await axios.get<PagedResponse<T>>(url, {
      ...config,
      headers: { ...config?.headers, Authorization: `Bearer ${token}` },
      params: { ...parameters, page },
    })

    const data: PagedResponse<T> = resp.data
    results.push(...data.results)

    page = data.next ?? undefined
  }
  /* eslint-enable no-await-in-loop */

  return results
}
