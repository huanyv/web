<template>
  <el-row>
    <el-col :span="9" id="left">
      <div id="info">
        <img src="../assets/head.png" alt="" />
        <h2>哈哈</h2>
      </div>
    </el-col>
    <el-col :span="15" id="right">
      <el-tabs v-model="activeName" class="home-tabs" @tab-click="handleClick">
        <el-tab-pane label="Home" name="first"></el-tab-pane>
        <el-tab-pane label="About" name="second"></el-tab-pane>
      </el-tabs>
      <div id="content">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const activeName = ref("first");

const handleClick = (tab, event) => {
  // console.log(tab, event);
  let tagName = activeName._value;
  if (tagName == "first") {
    router.push("/");
  } else if (tagName == "second") {
    router.push("/about");
  }
};
</script>

<script>
export default {};
</script>

<style scoped>
#left {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  width: 39%;
  border-right: 1px solid rgb(242, 242, 242);
  background-color: #fff;
}
#right {
  position: fixed;
  top: 0px;
  right: 0;
  bottom: 0;
  width: 60%;
  overflow-y: auto;
  background-color: #fff;
}
.home-tabs {
  position: fixed;
  top: 0;
  right: 0;
  width: 60%;
  z-index: 1;
  background-color: white;
}
#content {
  position: absolute;
  top: 50px;
  width: 96%;
  margin: 0;
}

#info > img {
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  margin-top: 35%;
}
#info > h2 {
  text-align: center;
}
</style>