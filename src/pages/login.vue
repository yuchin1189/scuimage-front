<!-- 登入頁 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Title: 登入 -->
        <h1 class="text-center">{{ $t('nav.user.login') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <!-- 帳號 -->
          <v-text-field
            v-model="username.value.value"
            :error-messages="username.errorMessage.value"
            :label="$t('user.username')"
            minlength="4"
            maxlength="30"
            counter
          />
          <!-- 密碼 -->
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            :label="$t('user.password')"
            minlength="4"
            maxlength="20"
            counter
          />
          <!-- 登入按鈕 -->
          <div class="text-center">
            <!-- 表單送出中的時候按鈕會有載入中的轉圈圈動畫 -->
            <v-btn :loading="isSubmitting" type="submit" color="primary">{{
              $t('login.submit')
            }}</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  username: yup
    .string()
    .required(t('api.usernameRequired'))
    .min(4, t('api.usernameTooShort'))
    .max(30, t('api.usernameTooLong'))
    // 自訂：檢查英數字元
    .test('isAlphanumeric', t('api.usernameInvalid'), (value) => validator.isAlphanumeric(value)),

  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(20, t('api.userPasswordTooLong')),
})

// 建立表單
// isSubmitting 表單正在送出中
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

// 建立欄位
// 此處的 useField() 會自動對應到上面 useForm() 裡的欄位
const username = useField('username')
const password = useField('password')

// 按下登入按鈕時執行這個
const submit = handleSubmit(async (values) => {
  try {
    // 發送一個 axios.post() 請求，並宣告一個 { data } 指到這個請求
    const { data } = await api.post('/user/login', {
      username: values.username,
      password: values.password,
    })

    // 此處的對照後端 controllers/user.js 的 const login 看
    // data.result 內有 token, username, role 三個東西
    user.login(data.result)

    // 提示使用者註冊成功
    createSnackbar({
      text: t('login.success'),
      snackbarProps: {
        color: 'success',
      },
    })
    // 跳頁
    // 順利登入的話跳回首頁
    router.push('/')
  } catch (error) {
    console.log('pages/login.vue 註冊失敗', error)

    // 提示使用者註冊失敗
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'error',
      },
    })
  }
})
</script>
