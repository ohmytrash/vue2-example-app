import ApiService from '@/common/api.service'
import jwtService from '@/common/jwt.service'
import { REGISTER, LOGIN, LOGOUT, CHECK_AUTH, UPDATE_PROFILE, UPDATE_AVATAR, FAVORITE_TOGGLE } from '../action.types'
import { SET_AUTH, UPDATE_USER, ADD_FAVORITE, REMOVE_FAVORITE } from '../mutation.types'

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
  favorites(state) {
    return state.favorites
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
  [FAVORITE_TOGGLE]({ commit }, id) {
    return ApiService.favoriteToggle(id).then((favorite) => {
      if (favorite) {
        commit(ADD_FAVORITE, favorite)
      } else {
        commit(REMOVE_FAVORITE, id)
      }
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
  [ADD_FAVORITE](state, data) {
    state.favorites = [...state.favorites, data]
  },
  [REMOVE_FAVORITE](state, id) {
    const favorites = [...state.favorites]
    state.favorites = favorites.filter((item) => item.post !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
