import Vue from 'vue'
import Vuex from 'vuex'
import {
  toyStore
} from "./toy-store.js";
import {
  userService
} from "../services/user.service.js"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: userService.getLoggedinUser()
  },
  getters: {
user(state) { 
  return state.user
}
  },
  mutations: {
    setUser(state, {user}) {
      state.user = user
    }
  },
  actions: {
    doLogin({commit}, {credentials}) {
      userService.login(credentials).then(user=>{
        commit({type:'setUser',user})
      })
    },
    doSignup({commit},{signupCredentials}){
      userService.signup(signupCredentials).then(user=>{
        commit({type:'setUser',user})
      })
    },
    doLogout({commit}){
      userService.logout().then(()=>{
        commit({type:'setUser',user:null})
      })}
  },
  modules: {
    toyStore
  }
})