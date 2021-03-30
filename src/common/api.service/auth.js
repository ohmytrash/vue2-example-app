import Vue from 'vue'

const AuthService = (ApiService) => ({
  register(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Vue.axios.post('/register', data)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Vue.axios.post('/login', data)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
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
        reject(ApiService.catchError(e))
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
        reject(ApiService.catchError(e))
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
        reject(ApiService.catchError(e))
      }
    })
  },
})

export default AuthService
