<template>
  <div>
    <post-list v-for="post in posts" :key="post.id" :post="post" static />
    <div>
      <infinite-loading @infinite="infiniteHandler" />
    </div>
  </div>
</template>
<script>
import PostList from '@/components/PostList'
import ApiService from '@/common/api.service'
export default {
  components: {
    PostList,
  },
  data() {
    return {
      posts: [],
      total: 0,
    }
  },
  methods: {
    infiniteHandler($state) {
      ApiService.userPosts(this.$route.params.username, { skip: this.posts.length, limit: this.posts.length ? 5 : 10 })
        .then(({ posts, total }) => {
          this.posts = [...this.posts, ...posts]
          this.total = total
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
