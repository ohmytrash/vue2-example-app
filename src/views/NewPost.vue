<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-lg-10 mx-auto">
        <h2 class="text-center">CREATE A NEW POST</h2>
        <div class="card card-body">
          <div class="alert alert-danger text-center" v-if="error">{{ error }}</div>
          <form @submit.prevent="createPost(form)">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" name="title" v-model="form.title" />
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <input type="text" class="form-control" id="category" name="category" v-model="form.category" />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="description" name="description" v-model="form.description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Body</label>
              <markdown-editor v-model="form.body" />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">CREATE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/common/api.service'
export default {
  data() {
    return {
      error: '',
      loading: false,
      form: {
        title: '',
        category: '',
        description: '',
        body: '',
      },
    }
  },
  methods: {
    async createPost(form) {
      this.loading = true
      this.error = ''
      try {
        const post = await ApiService.createPost(form)
        console.log(post)
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
  },
}
</script>
