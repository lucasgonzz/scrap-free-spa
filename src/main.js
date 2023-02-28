import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Vue Scrool
Vue.prototype.$scrollToTop = (() => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, 100)
}) 

// Laravel-echo
window.Pusher = require('pusher-js');
import Echo from "laravel-echo"

Vue.prototype.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_KEY,
    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
    forceTLS: false
});

// Notifications
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast, {
  position: 'bottom'
});

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import '@/sass/_custom.scss'
Vue.use(BootstrapVue)

// Axios
import axios from 'axios'
Vue.use({
  install (Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      withCredentials: true
    })
  }
})
Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: process.env.VUE_APP_API_URL+'/api',
      withCredentials: true
    })
  }
})

// VueCookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// Mixins
import app from './common-vue/mixins/app'
Vue.mixin(app)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
