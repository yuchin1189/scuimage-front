<!-- 登入頁 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.user.login') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="6">
        <v-form>
          <v-text-field
            v-model="username.value.value"
            :error-messages="username.errorMessage.value"
            :label="$t('user.username')"
            minlength="4"
            maxlength="30"
            counter
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            :label="$t('user.email')"
          />
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            :label="$t('user.password')"
            minlength="4"
            maxlength="20"
            counter
          />
          <v-text-field
            v-model="passwordConfirm.value.value"
            type="password"
            :error-messages="passwordConfirm.errorMessage.value"
            :label="$t('user.passwordConfirm')"
            minlength="4"
            maxlength="20"
            counter
          />
          <div class="text-center">
            <v-btn :loading="isSubmitting" type="submit" color="primary">
              {{ $t('register.submit') }}
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const schema = yup.object({
  username: yup
    .string()
    .required(t('api.usernameRequired'))
    .min(4, t('api.usernameTooShort'))
    .max(30, t('api.usernameTooLong'))
    // 自訂的驗證規則：檢查英數字元
    .test('isAlphanumeric', t('api.usernameInvalid'), (value) => validator.isAlphanumeric(value)),

  email: yup
    .string()
    .required(t('userEmailRequired'))
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
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

// 建立欄位
const username = useField('username')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')
</script>
