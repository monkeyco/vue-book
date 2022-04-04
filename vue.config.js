const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "/vue-book/",
  transpileDependencies: [
    'vuetify'
  ]
})
