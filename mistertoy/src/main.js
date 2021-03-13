import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import '/src/styles/scss/style.scss'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyABxhqDPHh9ws7hmpzsYNb2IxqXJ7M29aU',
    libraries: 'places',
  },

})
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
