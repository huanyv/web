<template>
  <div v-html="markdownToHtml"></div>
</template>
<script>
import { parse } from "marked";
import axios from 'axios';

export default {
  data() {
    return {
      markdownToHtml: ""
    };
  },
  methods: {
    get() {

      // 后端请求

      // axios
      //   .get("")
      //   .then((response) => {
      //     this.markdownToHtml = parse(response.data.data.ganmao)
      //   });

      this.markdownToHtml = parse("# 文章" + this.aid)
      
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