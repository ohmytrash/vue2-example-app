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
            <router-link class="nav-link" :to="{ name: 'NewPost' }" active-class="" exact-active-class="active">New Post</router-link>
            <router-link class="nav-link" :to="{ name: 'Setting' }" active-class="" exact-active-class="active">Setting</router-link>
          </nav>
          <nav class="navbar-nav ml-auto">
            <a class="nav-link" href="#">{{ $store.getters.user.username }}</a>
          </nav>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: true,
    }
  },
}
</script>
