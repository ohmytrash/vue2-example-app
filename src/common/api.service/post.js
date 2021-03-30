import Vue from 'vue'

const PostService = (ApiService) => ({
  createPost(data) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.post('/posts', data)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
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
        reject(ApiService.catchError(e))
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
        reject(ApiService.catchError(e))
      }
    })
  },
  fetchPost({ skip, limit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Vue.axios.get(`/posts?skip=${skip}&limit=${limit || 10}`)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
  readPost(slug) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Vue.axios.get(`/posts/${slug}`)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
  favoriteToggle(id) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.post('/posts/' + id + '/favorite-toggle')
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
})

export default PostService
