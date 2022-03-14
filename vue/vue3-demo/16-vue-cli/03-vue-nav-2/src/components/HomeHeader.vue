<template>
  <!-- 公共导航 -->
  <router-link to="/">home</router-link> |
  <router-link to="/about">about</router-link>

  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>