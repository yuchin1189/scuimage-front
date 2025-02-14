<template>
  <!-- 導覽列 -->
  <v-app-bar :class="appBarColor">
    <v-container class="d-flex align-center">
      <!-- :active="false" 將按鈕反白效果關閉 -->
      <v-btn to="/" :active="false" prepend-icon="mdi-film">{{ $t('branding') }}</v-btn>
      <v-spacer />
      <!-- 文章 -->

      <!-- 活動 -->

      <!-- 資源借用 -->
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

      <!-- 社員-->
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
          <template v-for="item in usermenu" :key="item.key">
            <v-list-item v-if="item.show && item.key !== 'logout'" :to="item.to">{{
              item.text
            }}</v-list-item>
            <!-- 登出 -->
            <v-list-item v-if="item.show && item.key === 'logout'" @click="logout()">
              {{ $t('nav.usermenu.logout') }}
            </v-list-item>
            <!-- =======================
            <v-list-item
              v-if="item.show"
              :to="item.to"
              :disabled="item.key === 'resetPassword'"
              @click="handleMenuItemClick()"
              >{{ item.text }}</v-list-item
            >
            ======================= -->
          </template>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>

  <!-- 導覽列下方的主要畫面 -->
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
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

console.log('user', user)

const resourceMenu = [
  { to: '/equipment', text: t('nav.resourceMenu.equipment'), value: 'equipment' },
  { to: '/lab', text: t('nav.resourceMenu.lab'), value: 'lab' },
]

const usermenu = computed(() => {
  return [
    // 登入或註冊（未登入時顯示）
    { key: 'login', to: '/login', text: t('nav.usermenu.login'), show: !user.isLoggedIn },
    {
      key: 'register',
      to: '/register',
      text: t('nav.usermenu.register'),
      show: !user.isLoggedIn,
    },
    { key: 'resetPassword', text: t('nav.usermenu.resetPassword'), show: user.isLoggedIn },
    { key: 'logout', text: t('nav.usermenu.logout'), show: user.isLoggedIn },
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

// 登入身分為管理員時，導覽列顏色變成紫色
const appBarColor = computed(() => {
  return user.isAdmin ? 'bg-brown' : 'bg-secondary'
})
</script>
