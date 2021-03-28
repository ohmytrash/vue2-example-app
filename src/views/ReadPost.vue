<template>
  <div>
    <p v-if="loading">LOADING</p>
    <div v-else>
      <div class="jumbotron jumbotron-fluid bg-dark">
        <div class="container text-light">
          <h1 class="mb-2">{{ post.title }}</h1>

          <div class="d-flex align-items-center">
            <div class="mr-2" :style="{ width: '2.5rem', height: '2.5rem' }">
              <v-lazy-image
                :src="post.user.avatar || Avatar"
                :src-placeholder="Avatar"
                :alt="post.user.name"
                class="img-fluid rounded-circle"
              />
            </div>
            <div>
              <a href="#" class="d-block text-white font-weight-bold text-uppercase">{{ post.user.name }}</a>
              <span class="time small">{{ post.createdAt | moment('ddd, MMM D YYYY') }}</span>
            </div>
          </div>
          <div v-if="post.user.id === $store.getters.user.id" class="pt-3">
            <a href="#" class="btn btn-info btn-sm mr-2">EDIT</a>
            <a href="#" class="btn btn-danger btn-sm">DELETE</a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="card card-body mb-3" v-html="body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import ApiService from '@/common/api.service'
import Avatar from '@/assets/image/avatar.png'
export default {
  data() {
    return {
      Avatar,
      loading: true,
      post: {},
    }
  },
  computed: {
    body() {
      if (this.post.body) {
        return marked(this.post.body)
      }
      return ''
    },
  },
  methods: {
    async load(slug) {
      try {
        this.post = await ApiService.readPost(slug)
      } catch (e) {
        return this.$router.push('/404')
      }
      this.loading = false
    },
  },
  mounted() {
    this.load(this.$route.params.slug)
  },
}
</script>
