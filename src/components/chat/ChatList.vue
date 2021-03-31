<template>
  <div class="card card-body p-1 mb-2">
    <h6 class="m-0">
      <router-link :to="{ name: 'User', params: { username: message.username } }">{{ message.name }}</router-link>
    </h6>
    <p class="m-0">{{ message.message }}</p>
    <small class="ml-auto">{{ time }}</small>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      time: '',
      interval: null,
    }
  },
  mounted() {
    this.time = this.$moment(this.message.createdAt).fromNow()
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.time = this.$moment(this.message.createdAt).fromNow()
      }, 60000)
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
}
</script>
