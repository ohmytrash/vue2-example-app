<template>
  <div class="card mb-3">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <div class="mr-1" :style="{ width: '2.5rem', height: '2.5rem' }">
            <v-lazy-image
              :src="post.user.avatar || Avatar"
              :src-placeholder="Avatar"
              :alt="post.user.name"
              class="img-fluid rounded-circle"
            />
          </div>
          <div>
            <router-link :to="{ name: 'User', params: { username: post.user.username } }" class="d-block">{{ post.user.name }}</router-link>
            <span class="time small">{{ post.createdAt | moment('ddd, MMM D YYYY') }}</span>
          </div>
        </div>
        <div class="right">
          <favorite-toggle :post-id="post.id" class="btn-sm" />
        </div>
      </div>
    </div>
    <div class="card-body py-2">
      <h5 class="m-0">{{ post.title }}</h5>
      <small>{{ post.category.title }}</small>
      <p class="mb-2">{{ post.description }}</p>
      <router-link :to="{ name: 'ReadPost', params: { slug: post.slug } }" class="btn-link">Read more</router-link>
    </div>
  </div>
</template>

<script>
import Avatar from '@/assets/image/avatar.png'
import FavoriteToggle from './FavoriteToggle'
export default {
  components: { FavoriteToggle },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      Avatar,
    }
  },
}
</script>
