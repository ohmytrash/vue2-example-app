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
}

export default ApiService
