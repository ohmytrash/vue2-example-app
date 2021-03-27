<template>
  <div id="app">
    <fade-transition>
      <loading-overlay v-if="$store.state.bootLoading" />
    </fade-transition>
    <router-view />
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import LoadingOverlay from '@/components/LoadingOverlay'
export default {
  components: {
    LoadingOverlay,
    FadeTransition,
  },
}
</script>
