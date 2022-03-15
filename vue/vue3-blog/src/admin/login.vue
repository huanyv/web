<template>
  <el-row>
    <el-col :span="8"></el-col>
    <el-col :span="8" id="box">
      <el-row style="margin-top: 25px">
        <el-col :span="2"></el-col>
        <el-col :span="20">
          <el-input v-model="username" placeholder="用户名" class="input" />
          <el-input
            v-model="password"
            type="password"
            placeholder="密码"
            show-password
            class="input"
          />
          <el-button type="primary" id="loginBtn" @click="login()"
            >登录</el-button
          >
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>
</template>


<script>
import { ref } from "vue";
export default {
  setup() {
    const username = ref("");
    const password = ref("");
    return {
      username,
      password,
    };
  },
  methods: {
    login() {
      console.log(this.username);
      console.log(this.password);
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
#box {
  box-shadow: -4px 7px 46px 2px rgb(0 0 0 / 10%);
  margin-top: 150px;
  height: 250px;
}
.input {
  margin-top: 20px;
  margin-bottom: 10px;
}
#loginBtn {
  display: block;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>