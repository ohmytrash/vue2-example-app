import ApiService from '@/common/api.service'
import { CREATE_POST, FETCH_POST } from '../action.types'
import { ADD_POST } from '../mutation.types'

const state = () => ({
  posts: [],
  users: [],
  categories: [],
  total: 0,
})

const getters = {
  posts(state) {
    return state.posts
  },
}

const actions = {
  [CREATE_POST](contex, payload) {
    return ApiService.createPost(payload).then((post) => {
      return post
    })
  },
  [FETCH_POST]({ commit, state }) {
    return ApiService.fetchPost({ skip: state.posts.length, limit: state.posts.length ? 5 : 10 })
      .then((data) => {
        commit(ADD_POST, data)
        return data
      })
      .catch((e) => {
        console.log(FETCH_POST, e)
      })
  },
}

const mutations = {
  [ADD_POST](state, payload) {
    const posts = [...state.posts]
    const categories = { ...state.categories }
    const users = { ...state.users }
    payload.posts.map((post) => {
      categories[post.category.id] = post.category
      users[post.user.id] = post.user
      posts.push({
        title: post.title,
        slug: post.slug,
        description: post.description,
        createdAt: post.createdAt,
        category: post.category.id,
        user: post.user.id,
      })
    })
    state.posts = posts
    state.categories = categories
    state.users = users
    state.total = payload.total
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
