<template>
  <div>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#324057"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :router="true"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="/">
        <el-icon><house /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-sub-menu index="/article">
        <template #title>
          <el-icon><tickets /></el-icon>
          <span>文章</span>
        </template>
        <el-menu-item index="/article/list"><el-icon><document /></el-icon>文章列表</el-menu-item>
        <el-menu-item index="/article/edit"><el-icon><edit /></el-icon>发表文章</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><chat-dot-round /></el-icon>
          <span>评论</span>
        </template>
        <el-menu-item index="/commont"><el-icon><chat-line-square /></el-icon>评论列表</el-menu-item>
        <el-menu-item index="/message"><el-icon><chat-square /></el-icon>留言列表</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/link">
        <el-icon><location /></el-icon>
        <span>友链</span>
      </el-menu-item>

      <el-menu-item index="/support">
        <el-icon><medal /></el-icon>
        <span>赞赏</span>
      </el-menu-item>

      <el-menu-item index="/setting">
        <el-icon><setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
  }
</script>

<style scoped>

</style>