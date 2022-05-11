<template>
  <h1>index</h1>
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