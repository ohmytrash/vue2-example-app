import icons from './icons'
import VueMeta from 'vue-meta'

import '@/assets/scss/app.scss'

const Plugins = {
  install(Vue) {
    Vue.use(icons)
    Vue.use(VueMeta)
  },
}

export default Plugins
