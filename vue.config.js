module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/_vars.scss";`,
      },
    },
  },
  chainWebpack(config) {
    config.plugin('html').tap((args) => {
      args[0].title = 'Cirsqu - vue example app'
      return args
    })
  },
}
