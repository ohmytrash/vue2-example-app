<template>
  <div class="row justify-content-center">
    <div class="col-lg-6 col-md-8">
      <div>
        <post-lists :posts="posts" />
      </div>
      <div>
        <infinite-loading @infinite="infiniteHandler" />
      </div>
    </div>
    <div class="col-md-4">
      <div class="card card-body"></div>
    </div>
  </div>
</template>

<script>
import PostLists from '@/components/PostLists'
import { mapState } from 'vuex'
import { FETCH_POST } from '@/store/action.types'
export default {
  components: { PostLists },
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
