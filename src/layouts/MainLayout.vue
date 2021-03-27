<template>
  <div class="main-layout">
    <header class="navbar navbar-expand-lg navbar-light bg-white py-0">
      <div class="container">
        <router-link class="navbar-brand text-primary" :to="{ name: 'Home' }">
          <BrandIcon height="31px" />
        </router-link>

        <button class="navbar-toggler" type="button" @click="collapse = !collapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse" :class="{ collapse }">
          <nav class="navbar-nav mr-auto">
            <router-link class="nav-link" :to="{ name: 'Home' }" active-class="" exact-active-class="active">Home</router-link>
            <a class="nav-link" href="#">New Post</a>
            <a class="nav-link" href="#">Settings</a>
          </nav>
          <nav class="navbar-nav ml-auto">
            <a class="nav-link" href="#">{{ $store.getters.user.username }}</a>
          </nav>
        </div>
      </div>
    </header>
    <div class="container py-3">
      <router-view />
    </div>
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
