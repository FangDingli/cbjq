/* eslint-disable no-duplicate-imports */
import { createFetch } from '@vueuse/core'
import { obj2url } from '../obj2url'
import type { CreateFetchOptions, UseFetchOptions } from '@vueuse/core'

interface FetchParams {
  url: string
  params?: Record<string, any>
  data?: Record<string, any>
}

class Fetch {
  instance

  constructor(params: CreateFetchOptions) {
    const {
      baseUrl,
      combination = 'chain',
      fetchOptions = {
        mode: 'cors',
      },
      options,
    } = params
    this.instance = createFetch({
      baseUrl,
      combination,
      options,
      fetchOptions,
    })
  }

  get({ url, params = {} }: Omit<FetchParams, 'data'>, fetchOptions: UseFetchOptions = {}) {
    return this.instance(`${url}?${obj2url(params)}`, fetchOptions).json()
  }

  post({ url, data, params = {} }: FetchParams, fetchOptions: UseFetchOptions = {}) {
    return this.instance(`${url}?${obj2url(params)}`, fetchOptions)
      .post(data)
      .json()
  }

  put({ url, data, params = {} }: FetchParams, fetchOptions: UseFetchOptions = {}) {
    return this.instance(`${url}?${obj2url(params)}`, fetchOptions)
      .put(data)
      .json()
  }

  patch({ url, data, params = {} }: FetchParams, fetchOptions: UseFetchOptions = {}) {
    return this.instance(`${url}?${obj2url(params)}`, fetchOptions)
      .patch(data)
      .json()
  }

  delete({ url, params = {} }: Omit<FetchParams, 'data'>, fetchOptions: UseFetchOptions = {}) {
    return this.instance(`${url}?${obj2url(params)}`, fetchOptions)
      .delete()
      .json()
  }
}

export default Fetch
