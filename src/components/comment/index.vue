<template>
  <div>
    <h3>Comments</h3>
    <spinner v-if="loading" />
    <div v-else>
      <comment-list v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
    <comment-form :post-id="postId" />
  </div>
</template>
<script>
import ApiService from '@/common/api.service'
import CommentForm from './CommentForm'
import Spinner from '../infiniteLoading/Spinner'
import CommentList from './CommentList'
export default {
  props: {
    postId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      comments: [],
      loading: true,
    }
  },
  components: {
    CommentForm,
    Spinner,
    CommentList,
  },
  methods: {
    async loadComments() {
      try {
        this.comments = await ApiService.fetchComments(this.postId)
      } catch (e) {
        this.$toast.error('Failed to load comments!')
      }
      this.loading = false
    },
  },
  mounted() {
    this.loadComments()
  },
}
</script>
