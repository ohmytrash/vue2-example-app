import socket from '@/common/socket'
import jwtService from '@/common/jwt.service'
import { LISTEN_ONLINE_USER } from '../action.types'
import { SET_ONLINE_USER } from '../mutation.types'

const state = () => ({
  users: [],
})

const getters = {
  onlineUsers(state) {
    return state.users
  },
}

const actions = {
  [LISTEN_ONLINE_USER]({ commit, rootState }) {
    socket.on('ONLINE_USER', (users) => {
      commit(SET_ONLINE_USER, users)
    })
    socket.on('connect', () => {
      if (rootState.auth.user) {
        socket.emit('IM_ONLINE', jwtService.getToken())
      }
    })
    setInterval(() => {
      if (rootState.auth.user) {
        socket.emit('IM_ONLINE', jwtService.getToken())
      }
    }, 10000)
  },
}

const mutations = {
  [SET_ONLINE_USER](state, users) {
    state.users = users
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
