import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'

const catchError = (e) => {
  if (e.response && e.response.data && e.response.data.message) {
    return e.response.data.message
  }
  return e.message
}

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },
  setHeader() {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`
  },
  register(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Vue.axios.post('/register', data)
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Vue.axios.post('/login', data)
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
  profile() {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.get('/profile')
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
  updateProfile(data) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.put('/profile', data)
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
  updateAvatar(data) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.put('/profile/avatar', data)
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },

  createPost(data) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.post('/posts', data)
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
  updatePost(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.put('/posts/' + id, data)
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
  deletePost(id) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        await Vue.axios.delete('/posts/' + id)
        resolve(id)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
  fetchPost({ skip, limit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Vue.axios.get(`/posts?skip=${skip}&limit=${limit || 10}`)
        resolve(res.data)
      } catch (e) {
        reject(catchError(e))
      }
    })
  },
}

export default ApiService
