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
import socket from '@/common/socket'
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
      socket: null,
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
    onNewComment(comment) {
      if (this.postId === comment.post) {
        this.comments = [comment, ...this.comments]
      }
    },
    onDeleteComment(commentId) {
      const newdata = [...this.comments]
      this.comments = newdata.filter((val) => val.id !== commentId)
    },
  },
  mounted() {
    this.loadComments()
    if (!this.socket) {
      this.socket = socket
      this.socket.on('NEW_COMMENT', this.onNewComment)
      this.socket.on('DELETE_COMMENT', this.onDeleteComment)
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket = null
      this.socket.off('NEW_COMMENT', this.onNewComment)
      this.socket.off('DELETE_COMMENT', this.onDeleteComment)
    }
  },
}
</script>
