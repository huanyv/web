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
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { message } from "@/utils";
import { addArticle, getArticle, updateArticle } from "@/request/api";

export default {
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
      let summary = "";
      let count = 0;
      let i = 0;
      while (count < 50) {
        if (/^[\u4E00-\u9FA5a-zA-Z]$/.test(this.text.substring(i, i + 1))) {
          summary += this.text.substring(i, i + 1);
          count++;
        }
        i++;
        if (i > this.text.length) {
          break;
        }
      }
      // 后端调用
      if (this.aid != "") {
        // 更新、修改
        updateArticle({
          id: this.aid,
          title: this.title,
          summary: summary,
          content: this.text
        }).then(res => {
          let data = res.data
          if (data.code == 200) {
            message.success(data.msg);
            this.$router.push("/admin")
          } else {
            message.error(data.msg);
          }
        })
      } else {
        // 添加
        addArticle({
          title: this.title,
          summary: summary,
          content: this.text
        }).then(res => {
          let data = res.data
          if (data.code == 200) {
            message.success(data.msg);
            this.$router.push("/admin")
          } else {
            message.error(data.msg);
          }
        })
      }
      // message("success", "保存成功！");
    },
  },
  mounted() {
    if (this.aid != "") {
      // 有文章id说明是编辑，从后端获取文章内容

      // 后端调用
      getArticle({id:this.aid}).then(res => {
        let data = res.data
        this.title = data.data.title
        this.text = data.data.content
      })

      console.log(this.aid);
    }
  },
  props: {
    aid: String,
  },
};
</script>
<style scoped>
input {
  margin-bottom: 20px;
}
button {
  position: absolute;
  right: 50px;
}
</style>