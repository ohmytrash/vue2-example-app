<template>
  <div>
    <post-list v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import PostList from './PostList'
export default {
  components: { PostList },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
