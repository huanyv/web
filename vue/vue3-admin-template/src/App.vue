<template>

    <el-container style="height: 100vh;">
      <el-aside width="250px" style="background-color: rgb(50, 64, 87);">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header class="my-head">
          <Nav />
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>

</template>

<script setup>
  import Nav from '@/components/nav/index'
  import Sidebar from '@/components/sidebar/index'
</script>

<style>
body {
  font-family: Arial, 'STHeiti', Helvetica, sans-serif;
  background: #ffffff;
  font-size: 14px;
  color: #444 !important;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  -webkit-overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.my-head{
  background-color: #eff2f7;
}
</style>
