<template>
  <div class="card card-body mb-2 p-2" v-if="user.id !== $store.getters.user.id">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="mr-1" :style="{ width: '2rem', height: '2rem' }">
          <v-lazy-image :src="user.avatar || Avatar" :src-placeholder="Avatar" :alt="user.name" class="img-fluid rounded-circle" />
        </div>
        <div>
          <router-link
            :to="{ name: 'User', params: { username: user.username } }"
            class="d-block text-truncate text-uppercase"
            style="line-height: 1"
            >{{ user.username }}</router-link
          >
          <span class="d-block small" :class="user.away.includes(false) ? 'text-success' : 'text-warning'" style="line-height: 1">{{
            user.away.includes(false) ? 'ONLINE' : 'AWAY'
          }}</span>
        </div>
      </div>
      <div>
        <button class="btn btn-primary btn-sm" @click="handleCall">CALL</button>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/assets/image/avatar.png'
import PubSub from 'pubsub-js'
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      Avatar,
    }
  },
  methods: {
    handleCall() {
      PubSub.publish('CALL', this.user.id)
    },
  },
}
</script>
