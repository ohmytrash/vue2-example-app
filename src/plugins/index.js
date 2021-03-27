import icons from './icons'
import VueMeta from 'vue-meta'
import { VLazyImagePlugin } from 'v-lazy-image'
import VueToast from 'vue-toast-notification'

import '@/assets/scss/app.scss'
import 'vue-toast-notification/dist/theme-default.css'

const Plugins = {
  install(Vue) {
    Vue.use(icons)
    Vue.use(VueMeta)
    Vue.use(VLazyImagePlugin)
    Vue.use(VueToast)
  },
}

export default Plugins
