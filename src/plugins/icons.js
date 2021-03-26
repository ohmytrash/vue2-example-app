import Brand from '@/assets/icons/brand.svg'
import Home from 'feather-icons/dist/icons/home.svg'

const icons = {
  install(Vue) {
    Vue.component('BrandIcon', Brand)
    Vue.component('HomeIcon', Home)
  },
}

export default icons
