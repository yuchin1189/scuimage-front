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
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn v-bind="props" prepend-icon="mdi-format-list-checks">{{
            $t('nav.resources')
          }}</v-btn>
        </template>
        <v-list class="bg-secondary">
          <v-list-item v-for="item in resourceMenu" :key="item.value" :to="item.to">
            {{ item.text }}
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- userMenu 使用者選單 -->
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn v-if="!user.isAdmin" v-bind="props" prepend-icon="mdi-account">
            {{ $t('nav.member') }}
          </v-btn>
          <v-btn v-if="user.isAdmin" v-bind="props" prepend-icon="mdi-account">
            {{ $t('nav.admin') }}
          </v-btn>
        </template>
        <v-list class="bg-secondary">
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
      <!-- 切換亮暗主題 -->
      <v-btn icon="mdi-brightness-4" @click="toggleTheme"></v-btn>
    </v-container>
  </v-app-bar>

  <!-- 主要頁面區 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { t } = useI18n()
// const router = useRouter()
const user = useUserStore()
const apiAuth = useAxios()
const createSnackbar = useSnackbar()
const theme = useTheme()

console.log('user', user)

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
    },
  })
}

// 登入身分為管理員時，導覽列顏色變成茶色
const appBarColor = computed(() => {
  return user.isAdmin ? 'bg-brown' : 'bg-secondary'
})

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
