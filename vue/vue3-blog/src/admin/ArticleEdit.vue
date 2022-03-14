<template>
  <el-row>
    <el-col :span="20">
      <el-input v-model="title" placeholder="请输入文章标题" />
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="save()">保存</el-button>
    </el-col>
  </el-row>

  <md-editor v-model="text" style="height: 550px" />
</template>
 
<script>
import { defineComponent } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    MdEditor,
  },
  data() {
    return {
      text: "",
      title: "",
    };
  },
  methods: {
    save() {
      console.log(this.text);
      console.log(this.title);

      // 后端调用

      ElMessage({
        showClose: true,
        message: "保存成功",
        type: "success",
      });
    },
  },
  mounted() {
    if (this.aid != "") {
      // 有文章id说明是编辑，从后端获取文章内容

      // 后端调用

      console.log(this.aid);
    }
  },
  props: ["aid"],
});
</script>
<style scoped>
input {
  /* margin-top: 10px; */
  margin-bottom: 20px;
}
button {
  position: absolute;
  right: 50px;
}
</style>