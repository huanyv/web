<template>
  <div id="nav">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="{ path: item.path }">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div id="right-menu">
    <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</template>

<script>
export default {
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isIndex(first)) {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
        this.levelList = matched
      } else {
        this.levelList = [{ path: '/', meta: { title: '首页' } }]
      }
    },
    isIndex (route) {
      const redirect = route && route.redirect
      if (!redirect) {
        return false
      }
      return redirect === '/'
    }
  },
}
</script>

<style scoped>
#nav {
  display: inline-block;
  margin-top: 23px;
}

#right-menu {
  display: inline-block;
  position: fixed;
  right: 50px;
  top: 23px;
}
</style>