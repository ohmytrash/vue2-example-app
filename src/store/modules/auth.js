import ApiService from '@/common/api.service'
import jwtService from '@/common/jwt.service'
import { REGISTER, LOGIN, LOGOUT, CHECK_AUTH, UPDATE_PROFILE, UPDATE_AVATAR } from '../action.types'
import { SET_AUTH, UPDATE_USER } from '../mutation.types'

const state = () => ({
  user: null,
  favorites: [],
})

const getters = {
  isLogin(state) {
    return !!state.user
  },
  user(state) {
    return state.user
  },
}

const actions = {
  [REGISTER]({ commit }, payload) {
    return ApiService.register(payload).then((auth) => {
      commit(SET_AUTH, auth)
    })
  },
  [LOGIN]({ commit }, payload) {
    return ApiService.login(payload).then((auth) => {
      commit(SET_AUTH, auth)
    })
  },
  [LOGOUT]({ commit }) {
    commit(SET_AUTH, { user: null, token: null })
  },
  [CHECK_AUTH]({ commit }) {
    return ApiService.profile()
      .then((auth) => {
        commit(SET_AUTH, auth)
      })
      .catch(() => {
        commit(SET_AUTH, { user: null, token: null })
      })
  },
  [UPDATE_PROFILE]({ commit }, payload) {
    return ApiService.updateProfile(payload).then(({ user }) => {
      commit(UPDATE_USER, user)
    })
  },
  [UPDATE_AVATAR]({ commit }, payload) {
    return ApiService.updateAvatar(payload).then(({ user }) => {
      commit(UPDATE_USER, user)
    })
  },
}

const mutations = {
  [SET_AUTH](state, { user, token, favorites }) {
    state.user = user
    state.favorites = favorites
    if (token) {
      jwtService.saveToken(token)
    } else {
      jwtService.destroyToken()
    }
  },
  [UPDATE_USER](state, user) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
