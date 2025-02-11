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

// apiAuth.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response) {
//       if (
//         error.response.data.message === 'userTokenExpired' &&
//         error.config.url !== '/user/refresh'
//       ) {
//         const user = useUserStore()
//         try {
//           const { data } = await apiAuth.patch('/user/refresh')
//           user.token = data.result
//           error.config.headers.Authorization = 'Bearer ' + user.token
//           return axios(error.config)
//         } catch (error) {
//           console.log('@/composables/axios.js', error)
//           user.logout()
//         }
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export const useAxios = () => {
  return { api, apiAuth }
}
