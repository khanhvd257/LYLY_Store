/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { createApp } from 'vue'
import moment from "moment/moment"


loadFonts()


// Create vue app
const app = createApp(App)
app.config.globalProperties.formatPrice = function (value) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(value);
}
app.config.globalProperties.formatDateTime = function (value) {
  return moment(String(value)).format('hh:mm:ss - DD/MM/YYYY');

}
// Use plugins
app.use(moshaToast)
app.use(vuetify)
app.use(createPinia())
app.use(router)

// Mount vue app
app.mount('#app')
