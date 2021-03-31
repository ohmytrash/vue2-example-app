<template>
  <div class="main-layout">
    <header class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <router-link class="navbar-brand text-primary" :to="{ name: 'Home' }">
          <BrandIcon height="1.875rem" />
        </router-link>

        <button class="navbar-toggler" type="button" @click="collapse = !collapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse" :class="{ collapse }">
          <nav class="navbar-nav mr-auto">
            <router-link class="nav-link" :to="{ name: 'Home' }" active-class="" exact-active-class="active">Home</router-link>
            <router-link class="nav-link" :to="{ name: 'Chat' }" active-class="" exact-active-class="active">Chat</router-link>
            <router-link class="nav-link" :to="{ name: 'NewPost' }" active-class="" exact-active-class="active">New Post</router-link>
            <router-link class="nav-link" :to="{ name: 'Setting' }" active-class="" exact-active-class="active">Setting</router-link>
            <a href="https://github.com/dedeardiansya/vue-realworld-example-app" target="_blank" class="nav-link">Source code</a>
            <a href="https://github.com/dedeardiansya/node-express-realworld-example-app" target="_blank" class="nav-link"
              >Server source code</a
            >
          </nav>
          <nav class="navbar-nav ml-auto">
            <router-link class="nav-link" :to="{ name: 'User', params: { username: $store.getters.user.username } }">{{
              $store.getters.user.username
            }}</router-link>
          </nav>
        </div>
      </div>
    </header>
    <call />
    <fade-transition>
      <router-view />
    </fade-transition>
  </div>
</template>

<script>
import Call from '@/components/Call'
export default {
  components: {
    Call,
  },
  data() {
    return {
      collapse: true,
    }
  },
}
</script>
