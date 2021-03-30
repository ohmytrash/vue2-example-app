import Vue from 'vue'

const CommentService = (ApiService) => ({
  postComment(postId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.post('/comments/' + postId, data)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
  fetchComments(postId) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        const res = await Vue.axios.get('/comments/' + postId)
        resolve(res.data)
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
  deleteComment(id) {
    return new Promise(async (resolve, reject) => {
      try {
        ApiService.setHeader()
        await Vue.axios.delete('/comments/' + id)
        resolve()
      } catch (e) {
        reject(ApiService.catchError(e))
      }
    })
  },
})

export default CommentService
