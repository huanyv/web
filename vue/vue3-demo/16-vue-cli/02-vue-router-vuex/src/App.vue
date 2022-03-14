<template>
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <!--使用 router-link 组件进行导航 -->
      <!--通过传递 `to` 来指定链接 -->
      <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
      <router-link v-bind:to="{name: 'home'}">Go to Home</router-link> | 
      <router-link v-bind:to="{name: 'about'}">Go to About</router-link> | 
      <router-link v-bind:to="{name: 'user', params: {id: '14'}}">14号用户</router-link> | 
      <router-link v-bind:to="{name: 'user', params: {id: '999'}}">一刀999</router-link>
      <button @click="goAbout()">ABOUT</button>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    
    <router-view name="viwe2"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    goAbout() {
      this.$router.push("/about")
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
