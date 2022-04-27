<template>
  <h1>index</h1>
  <router-link to="/hello">hello</router-link>
  <br>
  <h3>{{ hitokoto }}</h3>
</template>
<script>
import { getHitokoto } from "@/request/api";
export default {
  data() {
    return {
      hitokoto: "",
    };
  },
  methods: {},
  mounted() {
    getHitokoto({ c: "i" }).then((res) => {
      let data = res.data;
      this.hitokoto = data.hitokoto;
    });
  },
};
</script>