<template>
  <button class="btn" :class="favorited ? 'btn-danger' : 'btn-outline-danger'" :disabled="loading" @click="handler">
    {{ favorited ? 'Remove from favorite' : 'Add to favorite' }}
  </button>
</template>

<script>
import { FAVORITE_TOGGLE } from '@/store/action.types'
export default {
  props: {
    postId: {
      type: String,
      default: '',
    },
  },
  computed: {
    favorited() {
      return this.$store.getters.favorites.filter((item) => item.post === this.postId).length
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async handler() {
      this.loading = true
      try {
        await this.$store.dispatch(FAVORITE_TOGGLE, this.postId)
      } catch (e) {
        this.$toast.error(e)
      }
      this.loading = false
    },
  },
}
</script>
