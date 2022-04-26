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
        >
          <el-menu-item index="1">
            <router-link to="/admin">后台管理</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/admin/edit">写文章</router-link>
          </el-menu-item>
          <el-sub-menu index="3" id="head">
            <template #title>
              <div class="block">
                <el-avatar
                  :size="40"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
              </div>
              &nbsp;&nbsp;{{ username }}
            </template>
            <el-menu-item index="3-1">个人资料</el-menu-item>
            <el-menu-item index="3-2" @click="logout">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const activeIndex1 = ref("1");
    const activeIndex2 = ref("2");
    const handleSelect = (key, keyPath) => {
      // console.log(key, keyPath);
    };
    return {
      activeIndex1,
      activeIndex2,
      handleSelect,
    };
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    logout() {
      // 无为而治
      window.localStorage.removeItem("token")
      // 清除登录状态
      window.localStorage.removeItem("username")
      this.$router.push("/admin/login");
    },
  },
  mounted() {
    this.username = window.localStorage.getItem("username")
  },
};
</script>


<style>
a {
  text-decoration: none;
}

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