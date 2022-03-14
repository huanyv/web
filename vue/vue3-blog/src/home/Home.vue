<template>
  <el-card class="box-card" v-for="i in 10" :key="i">
    <div class="item">
      <div class="blog-list-title">
        <router-link :to="'/article/' + i">标题</router-link>
      </div>
      <div class="blog-list-content">
        摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘
        要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要
      </div>
      <div class="blog-list-footer">
        <el-icon><timer /></el-icon>2022-2-2 &nbsp;<el-icon><promotion /></el-icon>10
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Timer, Promotion } from "@element-plus/icons-vue";
</script>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline;
}
.box-card {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 200px;
}
.blog-list-title {
  margin-top: 20px;
  font-size: 25px;
  font-weight: bold;
}

.blog-list-content {
  color: rgb(127, 127, 127);
  line-height: 40px;
  overflow: hidden;
}

.blog-list-footer {
  margin-bottom: 20px;
  color: rgb(192, 192, 192);
}
</style>