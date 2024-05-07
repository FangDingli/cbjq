import { Message } from '@arco-design/web-vue'
import Fetch from './fetch'

// const whiteList: string[] = []

export const request = new Fetch({
  baseUrl: import.meta.env.VITE_BASE_API,
  options: {
    /* beforeFetch({ options, cancel, url }) {
      // 获取 token 逻辑
      const token = ''
      if (!whiteList.includes(url) && !token) {
        cancel()
      }
      options.headers = {
        ...options.headers,
        Authorization: token,
      }

      return { options }
    }, */
    afterFetch(ctx) {
      const { code, message } = ctx.data
      if (code === 401) {
        Message.error('登录状态过期，请重新登录')
        // 清 token 逻辑
        // token=''
        window.location.reload()
      } else if (code !== 200) {
        Message.error(message)
      }

      return ctx
    },

    onFetchError(ctx) {
      console.log(ctx)
      Message.error(ctx.error)

      return ctx
    },
  },
})
