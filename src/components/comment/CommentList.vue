<template>
  <div class="card mb-3">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <div class="mr-1" :style="{ width: '2.5rem', height: '2.5rem' }">
            <v-lazy-image
              :src="comment.user.avatar || Avatar"
              :src-placeholder="Avatar"
              :alt="comment.user.name"
              class="img-fluid rounded-circle"
            />
          </div>
          <div>
            <router-link :to="{ name: 'User', params: { username: comment.user.username } }" class="d-block">{{
              comment.user.name
            }}</router-link>
            <span class="time small">{{ comment.createdAt | moment('ddd, MMM D YYYY') }}</span>
          </div>
        </div>
        <div class="right">
          <button class="btn btn-danger btn-sm" @click="handleDelete" v-if="comment.user.id === $store.getters.user.id" :disabled="loading">
            DELETE
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p class="m-0">{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
import Avatar from '@/assets/image/avatar.png'
import ApiService from '@/common/api.service'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      Avatar,
      loading: false,
    }
  },
  methods: {
    async handleDelete() {
      this.loading = true
      try {
        await ApiService.deleteComment(this.comment.id)
        this.$toast.success('Your comment has been deleted.')
      } catch (e) {
        this.$toast.error(e)
      }
      this.loading = false
    },
  },
}
</script>
