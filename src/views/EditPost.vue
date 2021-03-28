<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-lg-10 mx-auto">
        <FadeTransition>
          <loading class="h-80" v-if="!post" />
        </FadeTransition>
        <div v-if="post">
          <h2 class="text-center">CREATE A NEW POST</h2>
          <div class="card card-body">
            <div class="alert alert-danger text-center" v-if="error">{{ error }}</div>
            <form @submit.prevent="updatePost(form)">
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
                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">UPDATE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/common/api.service'
import Loading from '@/components/Loading'
export default {
  components: { Loading },
  data() {
    return {
      post: null,
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
    async load(slug) {
      try {
        this.post = await ApiService.readPost(slug)
        if (this.post.user.id !== this.$store.getters.user.id) {
          return this.$router.push('/404')
        }
        this.form = {
          title: this.post.title,
          category: this.post.category.title,
          description: this.post.description,
          body: this.post.body,
        }
      } catch (e) {
        return this.$router.push('/404')
      }
      this.loading = false
    },
    async updatePost(form) {
      this.loading = true
      this.error = ''
      try {
        const post = await ApiService.updatePost(this.post.id, form)
        console.log(post)
        if (this.post.slug !== post.slug) {
          this.$router.push({ name: 'EditPost', params: { slug: post.slug } })
        }
        this.post = null
        this.load(this.$route.params.slug)
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
  },
  mounted() {
    this.load(this.$route.params.slug)
  },
}
</script>
