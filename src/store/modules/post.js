import ApiService from '@/common/api.service'
import socketConnection from '@/common/socket'
import { FETCH_POST, LISTEN_POST } from '../action.types'
import { ADD_POST, NEW_POST, UPDATE_POST, REMOVE_POST } from '../mutation.types'

let socket

const state = () => ({
  posts: [],
  total: 0,
})

const getters = {
  posts(state) {
    return state.posts
  },
}

const actions = {
  [FETCH_POST]({ commit, state, dispatch }) {
    return ApiService.fetchPost({ skip: state.posts.length, limit: state.posts.length ? 5 : 10 })
      .then((data) => {
        dispatch(LISTEN_POST)
        commit(ADD_POST, data)
        return data
      })
      .catch((e) => {
        console.log(FETCH_POST, e)
      })
  },
  [LISTEN_POST]({ commit }) {
    if (!socket) {
      socket = socketConnection
      socket.on('NEW_POST', (post) => {
        commit(NEW_POST, post)
      })
      socket.on('UPDATE_POST', (post) => {
        commit(UPDATE_POST, post)
      })
      socket.on('DELETE_POST', (id) => {
        commit(REMOVE_POST, id)
      })
    }
  },
}

const mutations = {
  [ADD_POST](state, payload) {
    state.posts = [...state.posts, ...payload.posts]
    state.total = payload.total
  },
  [NEW_POST](state, post) {
    state.posts = state.posts = [post, ...state.posts]
    state.total = state.total + 1
  },
  [UPDATE_POST](state, post) {
    const posts = []
    state.posts.forEach((item) => {
      if (item.id === post.id) {
        item = post
      }
      posts.push(item)
    })
    state.posts = posts
  },
  [REMOVE_POST](state, id) {
    const posts = [...state.posts]
    state.posts = posts.filter((post) => post.id !== id)
    state.total = state.total - 1
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
