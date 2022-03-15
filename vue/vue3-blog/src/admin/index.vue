<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex1"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
          router=true
        >
          <el-menu-item index="/admin">后台管理</el-menu-item>
          <el-menu-item index="/admin/edit">写文章</el-menu-item>
          <el-sub-menu index="3" id="head">
            <template #title>
              <div class="block">
                <el-avatar
                  :size="40"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
              </div>
              &nbsp;&nbsp;username
            </template>
            <el-menu-item index="3-1">个人资料</el-menu-item>
            <el-menu-item index="/admin/login">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeIndex1 = ref("/admin");
const activeIndex2 = ref("/admin/edit");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<script>
export default {};
</script>


<style>
#head {
  position: absolute;
  right: 20px;
}

#head div {
  display: flex;
  align-items: center;
  text-align: left;
}
</style>