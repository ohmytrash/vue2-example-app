<template>
  <div class="card card-chat p-0 border-0">
    <div class="card-body p-0 bg-light" v-chat-scroll>
      <chat-list v-for="message in messages" :key="message.id" :message="message" />
    </div>
    <div class="card-footer p-0">
      {{ typingMessage }}
      <form class="input-group" @submit.prevent="submit()">
        <input type="text" class="form-control" placeholder="Message..." v-model="input" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary">SEND</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ChatList from './ChatList'
import socket from '@/common/socket'
import jwtService from '@/common/jwt.service'

export default {
  components: {
    ChatList,
  },
  data() {
    return {
      input: '',
      typing: false,
      timeOut: null,
      typingMessage: '',
      messages: [],
      interval: null,
      loading: true,
    }
  },
  methods: {
    submit() {
      if (this.input) {
        socket.emit('CHAT', this.input, jwtService.getToken(), () => {
          this.input = ''
        })
      }
    },
  },
  watch: {
    input(val) {
      if (val) {
        this.typing = true
        if (this.timeOut) {
          clearTimeout(this.timeOut)
        }
        this.timeOut = setTimeout(() => {
          this.typing = false
        }, 3000)
      }
    },
  },
  mounted() {
    socket.emit('FETCH_CHAT', (messages) => {
      this.messages = messages
      socket.on('CHAT', (message) => {
        this.messages = [...this.messages, message]
      })
      socket.on('TYPING', (message) => {
        this.typingMessage = message
      })
    })
    this.interval = setInterval(() => {
      if (this.typing) {
        socket.emit('TYPING', jwtService.getToken())
      }
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
    socket.off('CHAT')
    socket.off('TYPING')
  },
}
</script>

<style lang="scss">
.card.card-chat {
  height: calc(100vh - 3.6875rem - 2rem);
  margin-top: 1rem;
  margin-bottom: 1rem;

  > .card-body {
    overflow: auto;
  }
}
</style>
