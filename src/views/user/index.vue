<template>
  <div class="container py-3">
    <fade-transition>
      <loading v-if="!user" />
    </fade-transition>
    <div v-if="user" class="row justify-content-center">
      <div class="col-md-4" sticky-container>
        <div v-sticky sticky-offset="{ top: 64 }">
          <div class="card card-body mb-3">
            <div class="mx-auto mb-3" :style="{ width: '40%', height: '40%' }">
              <v-lazy-image :src="user.avatar || Avatar" :src-placeholder="Avatar" :alt="user.name" class="img-fluid rounded-circle" />
            </div>
            <div class="text-center">
              <h5 class="m-0">{{ user.name }}</h5>
              <span class="d-block mb-2"> @{{ user.username }} </span>
              <p class="small">{{ user.bio }}</p>
            </div>
            <router-link v-if="$store.getters.user.id === user.id" :to="{ name: 'Setting' }" class="btn btn-primary btn-sm mb-2"
              >SETTING</router-link
            >
            <button v-if="$store.getters.user.id === user.id" class="btn btn-danger btn-sm" @click="handleLogout">LOGOUT</button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-8">
        <nav class="nav nav-tabs mb-3">
          <router-link :to="{ name: 'User', params: { username } }" class="nav-link" exact-active-class="active">Posts</router-link>
          <router-link :to="{ name: 'UserFavorite', params: { username } }" class="nav-link" exact-active-class="active"
            >Favorites</router-link
          >
        </nav>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/common/api.service'
import Loading from '@/components/Loading'
import Avatar from '@/assets/image/avatar.png'
import { LOGOUT } from '@/store/action.types'
export default {
  components: {
    Loading,
  },
  computed: {
    username() {
      return this.$route.params.username
    },
  },
  data() {
    return {
      user: null,
      Avatar,
    }
  },
  methods: {
    async fetchUserProfile() {
      try {
        this.user = await ApiService.userProfile(this.username)
      } catch (e) {
        this.$router.push('/404')
      }
    },
    handleLogout() {
      this.$store.dispatch(LOGOUT)
      this.$router.push({ name: 'Login' })
    },
  },
  mounted() {
    this.fetchUserProfile()
  },
  watch: {
    $route(val, old) {
      if (val.params.username !== old.params.username) {
        this.user = null
        this.fetchUserProfile()
      }
    },
  },
}
</script>
