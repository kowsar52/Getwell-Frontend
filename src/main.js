import Vue from 'vue'
import App from './App.vue';
import router from "./router/router";
import vuetify from './plugins/vuetify'
import 'es6-promise/auto'

//date time picker 
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
import vSelect from 'vue-select'

Vue.component('vue-select', vSelect)
import 'vue-select/dist/vue-select.css';
//progress bar 
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#28b97b',
  failedColor: '#28b97b',
  thickness: '5px',
} 


Vue.use(VueProgressBar, options)


// const BASE_URL = 'http://getwell.test/'
const BASE_URL = 'https://getwell.be/backend/'
Vue.prototype.$BASE_URL == BASE_URL


import VueAxios from 'vue-axios';
import axios from 'axios';
//axios base url set 
Vue.use(VueAxios, axios)
const locale = localStorage.getItem('locale')
axios.defaults.params = {}
axios.defaults.params['locale'] = locale
axios.defaults.baseURL = BASE_URL+'api'
//authentication
// Vue.use(VueAuth, auth)
import store from './store/index'

Vue.config.productionTip = false


import('@/assets/css/theme.min.css')



new Vue({
  router,
  store,
  vuetify,
  created () {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUserData', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App),
}).$mount('#app')




