<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
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
