import { zhHant } from 'vuetify/locale'
export default {
  $vuetify: zhHant,

  // app bar
  branding: '溪城攝影學會',
  nav: {
    resources: '資源借用',
    about: '關於',
    booking: {
      equipment: '器材借用',
      lab: '暗房預約',
    },
    member: '社員',
    user: {
      login: '登入',
      register: '申請',

      logout: '登出',
      resetPassword: '重設密碼',
    },
  },

  // 註冊登入提示、snackbar 訊息
  user: {
    username: '帳號',
    email: '電子郵件',
    password: '密碼',
    passwordConfirm: '確認密碼',
  },
  register: {
    submit: '送出申請',
    success: '註冊成功',
  },
  login: {
    submit: '登入',
    success: '登入成功',
  },
  logout: {
    success: '登出成功',
  },

  api: {
    //帳號
    // user
    userNotFound: '查無使用者',
    userDuplicate: '使用者名稱已存在',
    userTokenInvalid: '使用者驗證無效',

    // username
    usernameRequired: '請輸入使用者名稱',
    usernameTooShort: '使用者名稱太短',
    usernameTooLong: '使用者名稱太長',
    usernameInvalid: '使用者名稱包含無效字元',

    // userEmail
    userEmailRequired: '請輸入電子郵件',
    userEmailInvalid: '電子郵件格式不正確',

    // userPassword
    userPasswordRequired: '請輸入密碼',
    userPasswordTooShort: '密碼太短',
    userPasswordTooLong: '密碼太長',
    userPasswordIncorrect: '密碼錯誤',
    userPasswordNotMatch: '密碼不符',

    // 器材
    // equipment
    equipmentNameRequired: '請輸入器材名稱',
    equipmentImageRequired: '請新增器材照片',
    equipmentDescriptionRequired: '請新增器材說明',
    equipmentCategoryRequired: '請選取器材分類',
    equipmentCategoryInvalid: '器材分類不符',
    equipmentStatusRequired: '請選取器材借用狀態',

    //
    requestFormatError: '請求格式有誤',
    serverError: '伺服器錯誤',
  },
}
