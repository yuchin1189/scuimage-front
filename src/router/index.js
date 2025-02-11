/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAxios } from '@/composables/axios.js'
import { useUserStore } from '@/stores/user.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()

  // 重新整理且登入狀態為「已登入」時
  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      // 發送一個 get() 請求，跟後端要帳號資料（因為 local storage 只有 token）
      // 要來的東西放進 user，也就是放回 local storage
      const { data } = await apiAuth.get('user/profile')

      user.login(data.result)
    } catch (error) {
      console.log('router/index.js', error)
      // 失敗的話登出
      // token 不正確的話就會失敗（token 過期的話）
      user.logout()
    }
  }
  next()
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
