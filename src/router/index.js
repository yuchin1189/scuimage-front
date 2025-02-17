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
import i18n from '@/i18n'

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

  // 以路由來將使用者帶回正確的地方
  if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    // 若使用者已登入，卻輸入登入頁或註冊頁的 URL
    // 則前往首頁
    next('/')
  } else if (to.meta.login && !user.isLoggedIn) {
    // 若輸入的 URL 需要登入，但使用者未登入
    // 則去到登入頁
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    // 若使用者輸入的 URL 需要管理員權限
    // 則去到首頁
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title) + ' | 溪城攝影學會'
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
