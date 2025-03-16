const { defineConfig } = require('@vue/cli-service')

const localtest = "http://localhost:3000";

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/adminapi": {
        target: localtest,
        changeOrigin: true
      },
      "/api": {
        target: localtest,
        changeOrigin: true
      }
    },
  }
})
