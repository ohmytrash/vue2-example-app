import Vue from 'vue'

const UserService = (ApiService) => ({
  userProfile(username) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.get('/users/' + username)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
  userPosts(username, { skip, limit }) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.get(`/users/${username}/posts?skip=${skip}&limit=${limit || 10}`)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
  userFavorites(username, { skip, limit }) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.get(`/users/${username}/favorites?skip=${skip}&limit=${limit || 10}`)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
})

export default UserService
