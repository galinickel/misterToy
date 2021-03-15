import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import toyApp from '../views/toy-app.vue'
import userPage from '../views/user-page.vue'
import toyDetails from '../views/toy-details.vue'
import userPanel from '../views/user-panel.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }, {
    path: '/user',
    name: 'user-panel',
    component: userPanel
  },
  {
    path: '/login',
    name: 'user-page',
    component: userPage
  }, {
    path: '/app',
    name: 'toy-app',
    component: toyApp
  }, {
    path: '/toy/details/:toyId',
    component: toyDetails
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router