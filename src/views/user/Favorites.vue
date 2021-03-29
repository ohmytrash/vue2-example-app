<template>
  <div>
    <post-list v-for="favorite in favorites" :key="favorite.id" :post="favorite.post" static />
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
      favorites: [],
      total: 0,
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
  },
}
</script>
