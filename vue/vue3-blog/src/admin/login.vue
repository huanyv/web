<template>
  <el-row>
    <el-col :span="9"></el-col>
    <el-col :span="6" id="box">
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
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
        <el-col :span="6"></el-col>
      </el-row>
    </el-col>
    <el-col :span="9"></el-col>
  </el-row>
</template>

<script>
import { ref } from "vue";
import { message, checkUsername, checkPassword } from "@/utils";
import { login } from "@/request/api";
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
      if (!checkUsername(this.username)) {
        message.error("用户名由4-10位大小写字母数字组成，字母开头");
        return false;
      }

      if (!checkPassword(this.password)) {
        message.error("密码由6-16位大小写字母数字组成，字母开头");
        return false;
      }

      // 后端调用，判定是否登录成功
      login({ username: this.username, password: this.password }).then(
        (response) => {
          let data = response.data;
          if (data.code == 200) {
            message.success(data.msg)
            // 保存token
            window.localStorage.setItem("token", data.data.token)
            window.localStorage.setItem("username", this.username)
            this.$router.push("/admin");
          } else {
            message.error(data.msg)
          }
        }

      );
    },
  },
};
</script>

<style scoped>
#box {
  margin-top: 150px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.input {
  margin-top: 10px;
  margin-bottom: 10px;
}
#loginBtn {
  display: block;
  margin: auto;
}
</style>