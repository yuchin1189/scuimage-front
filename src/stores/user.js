// 這次和番茄鐘範例的寫法不同，此處用的是 setup 的寫法
// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const username = ref('')
    const role = ref(UserRole.VISITOR)

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    const login = async (data) => {
      token.value = data.token
      username.value = data.username
      role.value = data.role
    }

    return { token, username, role, isLoggedIn, isAdmin, login }
  },
  {
    persist: {
      key: 'shop-user',
      pick: ['token'],
    },
  },
)
