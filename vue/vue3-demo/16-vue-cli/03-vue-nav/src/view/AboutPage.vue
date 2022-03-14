<template>
  <!-- <router-link to="/">home</router-link> |
  <router-link to="/about">about</router-link> -->

  <home-header></home-header>

  <h2>about</h2>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
export default {
  components: {
    HomeHeader,
  },
};
</script>