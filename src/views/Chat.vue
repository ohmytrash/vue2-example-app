<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-md-4">
        <h3>ONLINE</h3>
        <user-online-card v-for="user in users" :key="user.id" :user="user" />
      </div>
      <div class="col-md-6"></div>
    </div>
  </div>
</template>

<script>
import UserOnlineCard from '@/components/UserOnlineCard'
export default {
  components: {
    UserOnlineCard,
  },
  computed: {
    users() {
      return this.$store.getters.onlineUsers
    },
  },
}
</script>
