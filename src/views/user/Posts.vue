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
import socket from '@/common/socket'
export default {
  components: {
    PostList,
  },
  data() {
    return {
      posts: [],
      total: 0,
      socket: null,
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
    onNewPost(post) {
      const posts = [post, ...this.posts]
      this.posts = posts
      this.total = this.total + 1
    },
    onPostUpdate(post) {
      const posts = []
      this.posts.forEach((item) => {
        if (post.id === item.id) {
          posts.push(post)
        } else {
          posts.push(item)
        }
      })
      this.posts = posts
    },
    onPostDelete(id) {
      const posts = [...this.posts]
      this.posts = posts.filter((post) => post.id !== id)
      this.total = this.total - 1
    },
  },
  mounted() {
    if (!this.socket) {
      this.socket = socket
      socket.on('NEW_POST', this.onNewPost)
      socket.on('UPDATE_POST', this.onPostUpdate)
      socket.on('DELETE_POST', this.onPostDelete)
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket = null
      socket.off('NEW_POST', this.onNewPost)
      socket.off('UPDATE_POST', this.onPostUpdate)
      socket.off('DELETE_POST', this.onPostDelete)
    }
  },
}
</script>
