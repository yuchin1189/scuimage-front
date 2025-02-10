<template>
  <!-- app bar 導覽列 -->
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- :active="false" 將按鈕反白效果關閉 -->
      <v-btn to="/" :active="false" prepend-icon="mdi-film">{{ $t('branding') }}</v-btn>
      <v-spacer></v-spacer>
      <!-- 文章 -->

      <!-- 活動 -->

      <!-- 預約 -->
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn v-bind="props" prepend-icon="mdi-format-list-checks">{{
            $t('nav.resources')
          }}</v-btn>
        </template>
        <v-list class="bg-secondary">
          <v-list-item v-for="item in bookings" :key="item.value" :to="item.to">
            {{ item.text }}
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 社員-->
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn v-bind="props" prepend-icon="mdi-account">
            {{ $t('nav.member') }}
          </v-btn>
        </template>
        <v-list class="bg-secondary">
          <!-- 登入、註冊、登出、重設密碼 -->
          <v-list-item v-for="item in user" :key="item.value" :to="item.to">
            {{ item.text }}
          </v-list-item>
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
// import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useRouter } from 'vue-router'

const { t } = useI18n()
// const router = useRouter()

const bookings = [
  { to: '/equipment', text: t('nav.booking.equipment'), value: 'equipment' },
  { to: '/lab', text: t('nav.booking.lab'), value: 'lab' },
]

const user = [
  // 未登入時
  // 登入或註冊
  { to: '/login', text: t('nav.user.login'), value: 'login' },
  { to: '/register', text: t('nav.user.register'), value: 'register' },
  // 已登入時
  // 登出或更改密碼
]
</script>
