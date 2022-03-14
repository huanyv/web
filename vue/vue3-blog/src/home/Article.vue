<template>
  <div v-html="markdownToHtml"></div>
</template>
<script>
import { parse } from "marked";
import axios from 'axios';

export default {
  data() {
    return {
      markdownToHtml: "# 文章" + this.aid,
    };
  },
  methods: {
    get() {
      // axios
      //   .get("http://wthrcdn.etouch.cn/weather_mini?city=%E6%B2%A7%E5%B7%9E")
      //   .then((response) => {
      //     this.markdownToHtml = parse(response.data.data.ganmao)
      //   });
      
    },
  },
  mounted() {
    this.get()
  },
  props: ["aid"], // 接收组件传值
};
</script>
<style scoped>
div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>