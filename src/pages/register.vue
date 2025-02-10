<!-- 註冊頁 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Title: 申請 -->
        <h1 class="text-center">{{ $t('nav.user.register') }}</h1>
        <!-- 也可以這樣寫 <h1 v-t="'nav.user.register'" class="text-center"></h1> -->
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <!-- 避免使用者以為送出表單無效而多按幾次造成的重複發送請求 -->
        <!-- 阻止預設的表單送出動作 -->
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
          <!-- email -->
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            :label="$t('user.email')"
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
          <!-- 密碼再一次 -->
          <v-text-field
            v-model="passwordConfirm.value.value"
            type="password"
            :error-messages="passwordConfirm.errorMessage.value"
            :label="$t('user.passwordConfirm')"
            minlength="4"
            maxlength="20"
            counter
          />
          <!-- 送出申請 -->
          <div class="text-center">
            <!-- 表單送出中的時候按鈕會有載入中的轉圈圈動畫 -->
            <v-btn :loading="isSubmitting" type="submit" color="primary">{{
              $t('register.submit')
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

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

const schema = yup.object({
  username: yup
    .string()
    .required(t('api.usernameRequired'))
    .min(4, t('api.usernameTooShort'))
    .max(30, t('api.usernameTooLong'))
    // 自訂：檢查英數字元
    .test('isAlphanumeric', t('api.usernameInvalid'), (value) => validator.isAlphanumeric(value)),

  email: yup
    .string()
    .required(t('api.userEmailRequired'))
    .test('isEmail', t('api.userEmailInvalid'), (value) => validator.isEmail(value)),

  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(20, t('api.userPasswordTooLong')),

  passwordConfirm: yup
    .string()
    .required(t('api.userPasswordRequired'))
    // .oneOf(陣列, 訊息)  必須要是陣列內其中一個值
    // .ref(欄位名稱)      取得欄位的值
    // .ref('password')   password 欄位的值
    .oneOf([yup.ref('password')], t('api.userPasswordNotMatch')),
})

// 建立表單
// isSubmitting 表單正在送出中
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

// 建立欄位
// 此處的 useField() 會自動對應到上面 useForm() 裡的欄位
const username = useField('username')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      username: values.username,
      email: values.email,
      password: values.password,
    })
    // snackbar 註冊成功
    createSnackbar({
      text: t('register.success'),
      snackbarProps: {
        color: 'success',
      },
    })
    // 跳頁
    router.push('/login')
  } catch (error) {
    console.log('pages/register.vue', error)
    // snackbar 註冊失敗的原因
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'error',
      },
    })
  }
})
</script>
