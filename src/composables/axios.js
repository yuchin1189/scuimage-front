import axios from 'axios'
import { useUserStore } from '@/stores/user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API,
})

// axios 的攔截器 interceptor 可以將發送的請求攔截下來，用來取東西或做修改
// 這裡的例子是將發送的 get() post() 等請求內加上使用者的 token
apiAuth.interceptors.request.use((config) => {
  const user = useUserStore()
  // 注意 'Bearer ' 的引號裡面有一個空格
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

apiAuth.interceptors.response.use(
  (res) => res,
  async (error) => {
    // 判斷失敗有沒有收到回應
    // 沒收到回應時可能是網路問題
    // 有收到才需要處理
    if (error.response) {
      // 是登入過期，而且請求不是舊換新
      if (
        error.response.data.message === 'userTokenExpired' &&
        error.config.url !== '/user/refresh'
      ) {
        const user = useUserStore()
        try {
          // 傳送舊換新請求
          const { data } = await apiAuth.patch('/user/refresh')
          // 更新 store 的 token
          user.token = data.result
          // 修改發生錯誤的請求設定，換成新的 token
          error.config.headers.Authorization = 'Bearer ' + user.token
          // 用新的設定重新傳送一次原本的請求
          return axios(error.config)
        } catch (error) {
          console.log('composables/axios.js 舊換新', error)
          // 舊換新錯誤，登出
          user.logout()
        }
      }
    }
    // 回傳原本的錯誤
    return Promise.reject(error)
  },
)

export const useAxios = () => {
  return { api, apiAuth }
}
