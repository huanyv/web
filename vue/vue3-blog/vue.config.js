const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
		port:8000,  // 端口号的配置
		open:false   // 自动打开浏览器
	}
})