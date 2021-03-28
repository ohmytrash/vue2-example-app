<template>
  <div id="app">
    <fade-transition>
      <loading-overlay v-if="$store.state.bootLoading" />
    </fade-transition>
    <router-view />
  </div>
</template>

<script>
import LoadingOverlay from '@/components/LoadingOverlay'
export default {
  components: {
    LoadingOverlay,
  },
}
</script>
