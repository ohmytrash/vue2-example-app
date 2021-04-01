import { VLazyImagePlugin } from 'v-lazy-image'
import VueToast from 'vue-toast-notification'
import Editor from 'v-markdown-editor'
import VueMoment from 'vue-moment'
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from 'vue-sticky-directive'
import { FadeTransition } from 'vue2-transitions'
import VueConfirmDialog from 'vue-confirm-dialog'
import VueChatScroll from 'vue-chat-scroll'

import NoMore from '@/components/infiniteLoading/NoMore'
import Spinner from '@/components/infiniteLoading/Spinner'
import OnError from '@/components/infiniteLoading/Error'

import BrandIcon from '@/components/BrandIcon'

import '@/assets/scss/app.scss'
import 'vue-toast-notification/dist/theme-default.css'
import 'v-markdown-editor/dist/v-markdown-editor.css'

const Plugins = {
  install(Vue) {
    Vue.use(VLazyImagePlugin)
    Vue.use(VueToast)
    Vue.use(Editor)
    Vue.use(VueMoment)
    Vue.use(InfiniteLoading, {
      slots: {
        noMore: NoMore,
        spinner: Spinner,
        error: OnError,
      },
    })
    Vue.use(Sticky)
    Vue.use(VueConfirmDialog)
    Vue.use(VueChatScroll)

    Vue.component('FadeTransition', FadeTransition)
    Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
    Vue.component('BrandIcon', BrandIcon)
  },
}

export default Plugins
