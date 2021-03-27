<template>
  <form @submit.prevent="login(form)">
    <div class="alert alert-danger text-center" v-if="error">{{ error }}</div>
    <div class="form-group">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" name="username" v-model="form.username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" name="password" v-model="form.password" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">LOGIN</button>
      </div>
      <div class="form-group">
        <router-link :to="{ name: 'Register' }" class="btn btn-block btn-link">REGISTER</router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { LOGIN } from '@/store/action.types'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      loading: false,
      error: '',
    }
  },
  methods: {
    async login(form) {
      this.loading = true
      this.error = ''
      try {
        await this.$store.dispatch(LOGIN, form)
        return this.$router.push({ name: 'Home' })
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
  },
}
</script>
