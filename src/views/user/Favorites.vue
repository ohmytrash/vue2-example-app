<template>
  <div>
    <post-list v-for="favorite in favorites" :key="favorite.id" :post="favorite.post" />
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
      favorites: [],
      total: 0,
      socket: null,
    }
  },
  methods: {
    infiniteHandler($state) {
      ApiService.userFavorites(this.$route.params.username, { skip: this.favorites.length, limit: this.favorites.length ? 5 : 10 })
        .then(({ favorites, total }) => {
          this.favorites = [...this.favorites, ...favorites]
          this.total = total
          $state.loaded()
          if (this.favorites.length >= this.total) {
            $state.complete()
          }
        })
        .catch(() => {
          $state.error()
        })
    },
    onPostUpdate(post) {
      const favorites = []
      this.favorites.forEach((item) => {
        if (post.id === item.post.id) {
          item.post = post
        }
        favorites.push(item)
      })
      this.favorites = favorites
    },
    onPostDelete(id) {
      const favorites = [...this.favorites]
      this.favorites = favorites.filter(({ post }) => post.id !== id)
      this.total = this.total - 1
    },
  },
  mounted() {
    if (!this.socket) {
      this.socket = socket
      socket.on('UPDATE_POST', this.onPostUpdate)
      socket.on('DELETE_POST', this.onPostDelete)
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket = null
      socket.off('UPDATE_POST', this.onPostUpdate)
      socket.off('DELETE_POST', this.onPostDelete)
    }
  },
}
</script>
