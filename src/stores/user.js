// 這次和番茄鐘範例的寫法不同，此處用的是 setup 的寫法
// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore(
  'user',
  () => {
    // pinia 的初始狀態
    const token = ref('')
    const username = ref('')
    const role = ref(UserRole.VISITOR)

    // 有 token 就是有登入
    // isLoggedIn 的布林值宣告為 「token.value.length 大於零」的布林值
    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    // isAdmin 布林值表示 role 是否為 admin
    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    const login = async (data) => {
      if (data.token) {
        token.value = data.token
      }
      username.value = data.username
      role.value = data.role
    }

    const logout = async (data) => {
      token.value = ''
      username.value = ''
      role.value = UserRole.VISITOR
    }

    return { token, username, role, isLoggedIn, isAdmin, login, logout }
  },
  {
    // 在 local storage 裡面只保留 token
    // 如果重新整理後要用 username 等資料，必須用 token 重新要回來
    persist: {
      key: 'shop-user',
      pick: ['token'],
    },
  },
)
