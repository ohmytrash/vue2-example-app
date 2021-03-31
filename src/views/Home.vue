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
          <user-online-card v-for="user in $store.getters.onlineUsers" :key="user.id" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserOnlineCard from '@/components/UserOnlineCard'
import { mapState } from 'vuex'
import { FETCH_POST } from '@/store/action.types'
export default {
  components: { PostList, UserOnlineCard },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      total: (state) => state.post.total,
    }),
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
