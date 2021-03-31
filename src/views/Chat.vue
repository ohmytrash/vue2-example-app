<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 pt-3">
        <h3>ONLINE</h3>
        <user-online-card v-for="user in users" :key="user.id" :user="user" />
      </div>
      <div class="col-md-6">
        <chat />
      </div>
    </div>
  </div>
</template>

<script>
import UserOnlineCard from '@/components/UserOnlineCard'
import Chat from '@/components/chat'
export default {
  components: {
    UserOnlineCard,
    Chat,
  },
  computed: {
    users() {
      return this.$store.getters.onlineUsers
    },
  },
}
</script>
