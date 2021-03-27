<template>
  <div class="avatar-form" :class="{ loading }">
    <v-lazy-image
      class="animate__infinite"
      :class="{ 'animate__heartBeat animate__animated': loading }"
      :src="$store.getters.user.avatar || Avatar"
      :src-placeholder="Avatar"
      :alt="$store.getters.user.username"
    ></v-lazy-image>
    <button class="btn btn-light btn-sm" :disabled="loading" @click="handleClick">
      <ImageIcon width="1.5rem" />
    </button>
    <input ref="input" type="file" class="d-none" @change="handleChange" />
  </div>
</template>

<script>
import FormData from 'form-data'
import Avatar from '@/assets/image/avatar.png'
import { UPDATE_AVATAR } from '@/store/action.types'

export default {
  data() {
    return {
      loading: false,
      Avatar,
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      this.$refs.input.click()
    },
    async handleChange(ev) {
      this.loading = true
      try {
        const file = ev.target.files[0]
        const data = new FormData()
        data.append('image', file)
        await this.$store.dispatch(UPDATE_AVATAR, data)
        this.$toast.success('Avatar has been updated.')
      } catch (e) {
        this.$toast.error(e)
      }
      this.loading = false
    },
  },
}
</script>
