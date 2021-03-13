const USER_URL = 'auth/'

import {
    httpService
} from './http.service.js'
export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser
}

let gLoggedinUser = null

function getLoggedinUser() {
    return gLoggedinUser
}

function login(credentials) {
    return httpService.post(USER_URL + 'login', credentials).then(res => {
        gLoggedinUser = {
            username: res.username,
            fullname: res.fullname,
            isAdmin: res.isAdmin
        }
        return res
    })

}

function signup(signupCredentials) {
    return httpService.post(USER_URL + 'signup', signupCredentials).then(res => {
        gLoggedinUser = {
            username: res.username,
            fullname: res.fullname,
            isAdmin: res.isAdmin
        }
        return res
    })

}

function logout() {
    return httpService.post(USER_URL + 'logout').then(res => {
        gLoggedinUser = {
            username: res.username,
            fullname: res.fullname,
            isAdmin: res.isAdmin
        }
        return res
    })

}