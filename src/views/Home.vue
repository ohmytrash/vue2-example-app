<template>
  <div class="container py-3">
    <div class="row justify-content-center flex-wrap-reverse">
      <div class="col-lg-6 col-md-8">
        <post-list v-for="post in posts" :key="post.id" :post="post" />
        <div>
          <infinite-loading @infinite="infiniteHandler" />
        </div>
      </div>
      <div class="col-md-4" sticky-container>
        <div v-sticky sticky-offset="{ top: 64 }">
          <div class="card card-body mb-2 p-2" v-for="user in $store.getters.onlineUsers" :key="user.id">
            <div class="d-flex align-items-center">
              <div class="mr-1" :style="{ width: '2rem', height: '2rem' }">
                <v-lazy-image :src="user.avatar || Avatar" :src-placeholder="Avatar" :alt="user.name" class="img-fluid rounded-circle" />
              </div>
              <div>
                <router-link
                  :to="{ name: 'User', params: { username: user.username } }"
                  class="d-block text-truncate text-uppercase"
                  style="line-height: 1"
                  >{{ user.username }}</router-link
                >
                <span class="d-block small" :class="user.away.includes(false) ? 'text-success' : 'text-warning'" style="line-height: 1">{{
                  user.away.includes(false) ? 'ONLINE' : 'AWAY'
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import { mapState } from 'vuex'
import { FETCH_POST } from '@/store/action.types'
import Avatar from '@/assets/image/avatar.png'
export default {
  components: { PostList },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      total: (state) => state.post.total,
    }),
  },
  data() {
    return {
      Avatar,
    }
  },
  methods: {
    infiniteHandler($state) {
      this.$store
        .dispatch(FETCH_POST)
        .then(() => {
          $state.loaded()
          if (this.posts.length >= this.total) {
            $state.complete()
          }
        })
        .catch(() => {
          $state.error()
        })
    },
  },
}
</script>
