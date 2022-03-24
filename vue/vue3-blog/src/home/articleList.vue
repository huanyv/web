<template>
  <el-card class="box-card" v-for="article in articleList" :key="article.id">
    <div class="item">
      <div class="blog-list-title">
        <router-link :to="'/article/' + article.id">
          {{ article.title }}
        </router-link>
      </div>
      <div class="blog-list-content">
        {{ article.abstract }}
      </div>
      <div class="blog-list-footer">
        <el-icon><timer /></el-icon>
        {{ article.date }}&nbsp;
        <el-icon><promotion /></el-icon>
        {{ article.traffic }}
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Timer, Promotion } from "@element-plus/icons-vue";
</script>

<script>
export default {
  data() {
    return {
      articleList: [
        {
          id: 1,
          title: "文章1",
          abstract:
            "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
          traffic: "10",
          date: "2016-05-03",
        },
        {
          id: 2,
          title: "文章2",
          abstract:
            "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
          traffic: "10",
          date: "2016-05-03",
        },
        {
          id: 3,
          title: "文章3",
          abstract:
            "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
          traffic: "10",
          date: "2016-05-03",
        },
        {
          id: 4,
          title: "文章4",
          abstract:
            "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
          traffic: "10",
          date: "2016-05-03",
        },
        {
          id: 5,
          title: "文章5",
          abstract:
            "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
          traffic: "10",
          date: "2016-05-03",
        },
      ],
    };
  },
  mounted() {
    // 后端调用
  },
};
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