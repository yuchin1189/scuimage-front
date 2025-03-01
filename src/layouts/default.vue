<template>
  <!-- 導覽列 -->
  <v-app-bar :class="appBarColor">
    <v-container class="d-flex align-center">
      <!-- :active="false" 將按鈕反白效果關閉 -->
      <v-btn to="/" :active="false" prepend-icon="mdi-film">{{ $t('branding') }}</v-btn>
      <v-spacer />
      <!-- 文章 -->

      <!-- 活動 -->

      <!-- 資源借用選單 -->
      <v-menu open-on-hover open-on-click="">
        <template #activator="{ props }">
          <v-btn v-bind="props" prepend-icon="mdi-format-list-checks">
            <template v-if="!isMobile.valueOf()"> {{ $t('nav.resources') }} </template>
          </v-btn>
        </template>
        <v-list class="bg-main">
          <v-list-item v-for="item in resourceMenu" :key="item.value" :to="item.to">
            {{ item.text }}
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- userMenu 使用者選單 -->
      <v-menu open-on-hover open-on-click>
        <template #activator="{ props }">
          <!-- 無管理員身分時：社員 -->
          <v-btn v-if="!user.isAdmin" v-bind="props" prepend-icon="mdi-account">
            <template v-if="!isMobile.valueOf()">
              {{ $t('nav.member') }}
            </template>
          </v-btn>
          <!-- 有管理員身分時：管理員 -->
          <v-btn v-if="user.isAdmin" v-bind="props" prepend-icon="mdi-account-wrench">
            <template v-if="!isMobile.valueOf()">
              {{ $t('nav.admin') }}
            </template>
          </v-btn>
        </template>
        <v-list class="bg-main">
          <!-- 登入、註冊、重設密碼 -->
          <template v-for="item in userMenu" :key="item.key">
            <v-list-item
              v-if="item.show && item.key !== 'logout'"
              :to="item.to"
              :disabled="item.key === 'resetPassword'"
            >
              {{ item.text }}
            </v-list-item>
            <!-- 登出 -->
            <v-list-item v-if="item.show && item.key === 'logout'" @click="logout()">
              {{ $t('nav.userMenu.logout') }}
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <!-- 切換主題 -->
      <v-btn icon @click="toggleTheme">
        <v-icon v-if="vuetify.theme.name.value === 'dark'">mdi-brightness-3</v-icon>
        <v-icon v-if="vuetify.theme.name.value === 'light'">mdi-brightness-7</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- 主要頁面區 -->
  <v-main>
    <router-view></router-view>
  </v-main>

  <!-- FOOTER -->
  <app-footer></app-footer>
</template>

<script setup>
import { useTheme, useDisplay } from 'vuetify'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import vuetify from '@/plugins/vuetify'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const display = useDisplay()
const theme = useTheme()

const resourceMenu = [
  { to: '/equipment', text: t('nav.resourceMenu.equipment'), value: 'equipment' },
  { to: '/lab', text: t('nav.resourceMenu.lab'), value: 'lab' },
]

const userMenu = computed(() => {
  return [
    // 登入或註冊（未登入時顯示）
    { key: 'login', to: '/login', text: t('nav.userMenu.login'), show: !user.isLoggedIn },
    {
      key: 'register',
      to: '/register',
      text: t('nav.userMenu.register'),
      show: !user.isLoggedIn,
    },
    { key: 'resetPassword', text: t('nav.userMenu.resetPassword'), show: user.isLoggedIn },
    { key: 'logout', text: t('nav.userMenu.logout'), show: user.isLoggedIn },
  ]
})

let savedTheme = localStorage.getItem('theme')

// 如果 localStorage 中沒有儲存過主題，則根據系統的顏色模式來設定
if (!savedTheme) {
  savedTheme =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
} else {
  // 如果有儲存的主題，使用儲存的值
  theme.global.name.value = savedTheme === 'dark' ? 'dark' : 'light'
}

const logout = async () => {
  try {
    // 發個登出請求
    await apiAuth.delete('user/logout')
  } catch (error) {
    console.log('default.vue logout', error)
  }
  user.logout()

  // 提示「登出成功」
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'success',
      rounded: 'pill',
    },
  })
}

// 螢幕寬度 < 600 時 isMobile.valueOf() = true
const isMobile = computed(() => display.xs.value)

// 登入身分為管理員時，導覽列顏色變成茶色
const appBarColor = computed(() => {
  return user.isAdmin ? 'bg-brown' : 'bg-light-green-darken-2'
})

function toggleTheme() {
  // if current theme is dark, make it light
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme

  // localStorage
  localStorage.setItem('theme', newTheme)
  createSnackbar({
    text: t('themeChanged'),
    snackbarProps: {
      color: 'success',
      timeout: 5000,
      rounded: 'pill',
    },
  })
}
</script>
