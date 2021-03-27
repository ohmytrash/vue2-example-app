import Brand from '@/assets/icons/brand.svg'
import Image from 'feather-icons/dist/icons/image.svg'

const icons = {
  install(Vue) {
    Vue.component('BrandIcon', Brand)
    Vue.component('ImageIcon', Image)
  },
}

export default icons
