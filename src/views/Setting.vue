<template>
  <div class="row">
    <div class="col-lg-6 col-md-10 mx-auto">
      <h2 class="text-center">PROFILE SETTING</h2>
      <div class="card card-body">
        <form-update-avatar class="mb-3" />
        <div class="alert alert-danger text-center" v-if="error">{{ error }}</div>
        <form @submit.prevent="updateProfile(form)">
          <div class="form-group">
            <label for="name">Your name</label>
            <input type="text" class="form-control" id="name" name="name" v-model="form.name" />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" name="username" v-model="form.username" />
          </div>
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea class="form-control" id="bio" name="bio" v-model="form.bio" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="naw-password">New password</label>
            <input type="password" class="form-control" id="naw-password" name="naw-password" v-model="form.new_password" />
            <small class="form-text text-muted">Leave blank if you don't want to update</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" name="password" v-model="form.password" />
            <small class="form-text text-muted">Required if there is a new password</small>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" :disabled="loading">UPDATE</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import FormUpdateAvatar from '@/components/FormUpdateAvatar'
import { UPDATE_PROFILE } from '@/store/action.types'
export default {
  components: { FormUpdateAvatar },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  data() {
    return {
      form: {
        name: '',
        username: '',
        bio: '',
        new_password: '',
        password: '',
      },
      error: '',
      loading: false,
    }
  },
  methods: {
    initForm() {
      this.form = {
        name: this.user.name,
        username: this.user.username,
        bio: this.user.bio,
        new_password: '',
        password: '',
      }
    },
    async updateProfile(form) {
      this.loading = true
      this.error = ''
      try {
        await this.$store.dispatch(UPDATE_PROFILE, form)
        this.initForm()
        this.$toast.success('Profile has been updated.')
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
  },
  mounted() {
    this.initForm()
  },
}
</script>
