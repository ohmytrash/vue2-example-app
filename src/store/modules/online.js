import visibility from 'visibility'
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

    const watcher = visibility()
    const handleVisible = () => {
      if (rootState.auth.user && window.navigator.onLine) {
        if (watcher.visible()) {
          socket.emit('IM_ONLINE', jwtService.getToken())
        } else {
          socket.emit('IM_AWAY', jwtService.getToken())
        }
      }
    }
    socket.on('connect', handleVisible)
    watcher.on('change', handleVisible)
    setInterval(handleVisible, 10000)
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
