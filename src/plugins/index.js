/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import i18n from '@/i18n'
import VuetifyUseDialog from 'vuetify-use-dialog'

export function registerPlugins(app) {
  app
    // i18n 要在 vuetify 之前 use
    .use(i18n)
    .use(vuetify)
    .use(VuetifyUseDialog, {
      snackbar: {
        // snackbar 的關閉按鈕（預設 true 有關閉按鈕，設定為 false 不顯示關閉按鈕）
        // showCloseButton: false,
        snackbarProps: {
          timeout: 2500,
        },
      },
    })
    .use(router)
    .use(pinia)
}
