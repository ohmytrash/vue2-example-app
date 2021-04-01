import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import AuthService from './auth'
import PostService from './post'
import UserService from './user'
import CommentService from './comment'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'
  },
  setHeader() {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`
  },
  catchError(e) {
    if (e.response && e.response.data && e.response.data.message) {
      return e.response.data.message
    }
    return e.message
  },
}

export default {
  ...ApiService,
  ...AuthService(ApiService),
  ...UserService(ApiService),
  ...PostService(ApiService),
  ...CommentService(ApiService),
}
