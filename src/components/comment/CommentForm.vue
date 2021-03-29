<template>
  <form @submit.prevent="postComment({ body })" class="card card-body mb-5">
    <div class="alert alert-danger text-center" v-if="error">{{ error }}</div>
    <div class="form-group">
      <textarea class="form-control" name="comment-body" v-model="body" rows="3" placeholder="Comment body"></textarea>
    </div>
    <div class="form-group mb-0">
      <button type="submit" class="btn btn-primary btn-block" :disabled="loading">POST COMMENT</button>
    </div>
  </form>
</template>

<script>
import ApiService from '@/common/api.service'
export default {
  props: {
    postId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      error: '',
      body: '',
    }
  },
  methods: {
    async postComment(data) {
      this.loading = true
      this.error = ''
      try {
        await ApiService.postComment(this.postId, data)
        this.body = ''
        this.$toast.success('Your comment has been created.')
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
  },
}
</script>
