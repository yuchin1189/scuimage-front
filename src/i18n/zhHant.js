import { zhHant } from 'vuetify/locale'
export default {
  $vuetify: zhHant,

  // app bar
  branding: '溪城攝影學會',
  nav: {
    home: '首頁',

    // resourcemenu資源借用選單
    resources: '資源借用',
    about: '關於',
    resourceMenu: {
      equipment: '借用器材',
      lab: '預約暗房',
    },

    // userMenu 登入選單
    member: '社員',
    admin: '管理員',
    visitor: '訪客',
    userMenu: {
      login: '登入',
      register: '申請',
      logout: '登出',
      resetPassword: '重設密碼',
    },
  },

  // 註冊登入提示、snackbar 訊息
  user: {
    username: '使用者名稱',
    email: '電子郵件',
    password: '密碼',
    passwordConfirm: '確認密碼',
  },
  register: {
    go: '註冊',
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

  equipment: {
    available: '可借用',
    reserved: '待允許',
    inuse: '外借中',
    name: '品名',
    image: '圖片',
    description: '說明',
    category: '分類',
    status: '借用狀態',
    createdAt: '更新時間',
    updatedAt: '新增時間',
    edit: '編輯',
    create: '新增器材',
    closeDialog: '捨棄',
    save: '保存',
    editSuccess: '修改成功',
    createSuccess: '新增成功',
    ListView: '器材列表',
    // 0: '可借用',
    // 1: '待允許',
    // 2: '外借中',
  },

  equipmentCategory: {
    filmCamera: '底片相機',
    digitalCamera: '數位相機',
    lens: '鏡頭',
    tripod: '腳架',
    book: '書籍',
    accessories: '️配件',
  },

  fileAgent: {
    helpText: '按一下或將檔案拉進來',
    errorType: '只接受圖片',
    errorSize: '勿超過 1MB',
  },
  themeChanged: '主題已切換',

  api: {
    //帳號
    // user
    userNotFound: '查無使用者',
    userPermissionDenied: '使用者權限不足',
    userTokenInvalid: '使用者驗證無效',
    userTokenExpired: '者登入過期',

    // username
    usernameDuplicate: '使用者名稱已存在',
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
    equipmentCategoryInvalid: '請在現存分類中選擇',
    equipmentStatusRequired: '請選取器材借用狀態',
    equipmentIdInvalid: '器材 ID 錯誤',
    equipmentNotFound: '查無器材',

    //
    requestFormatError: '請求格式有誤',
    serverError: '伺服器錯誤',
    unknownError: '未知的錯誤',
    uploadFailed: '上傳失敗',
  },
}
