import ApiService from '@/common/api.service'
import socketConnection from '@/common/socket'
import { FETCH_POST, LISTEN_POST } from '../action.types'
import { ADD_POST, NEW_POST, UPDATE_POST, REMOVE_POST } from '../mutation.types'

let socket

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
    const posts = [...state.posts]
    const categories = { ...state.categories }
    const users = { ...state.users }
    payload.posts.map((post) => {
      categories[post.category.id] = post.category
      users[post.user.id] = post.user
      posts.push({
        id: post.id,
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
  [NEW_POST](state, post) {
    const posts = [
      {
        id: post.id,
        title: post.title,
        slug: post.slug,
        description: post.description,
        createdAt: post.createdAt,
        category: post.category.id,
        user: post.user.id,
      },
      ...state.posts,
    ]
    const categories = { ...state.categories }
    const users = { ...state.users }

    categories[post.category.id] = post.category
    users[post.user.id] = post.user

    state.posts = posts
    state.categories = categories
    state.users = users
    state.total = state.total + 1
  },
  [UPDATE_POST](state, post) {
    const posts = []
    const categories = { ...state.categories }
    const users = { ...state.users }

    categories[post.category.id] = post.category
    users[post.user.id] = post.user

    state.posts.forEach((el) => {
      if (el.id === post.id) {
        posts.push({
          id: post.id,
          title: post.title,
          slug: post.slug,
          description: post.description,
          createdAt: post.createdAt,
          category: post.category.id,
          user: post.user.id,
        })
      } else {
        posts.push(el)
      }
    })

    state.posts = posts
    state.categories = categories
    state.users = users
    state.total = state.total + 1
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
