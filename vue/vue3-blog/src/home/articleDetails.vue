<template>
  <div id="content">
    <v-md-preview :text="markdownToHtml"></v-md-preview>
  </div>
</template>
<script>
import { getArticleWeb, addTraffic } from '@/request/api'

export default {
  data() {
    return {
      markdownToHtml: ""
    };
  },
  methods: {
    get() {
      // 后端请求
      getArticleWeb({id: this.aid}).then(res => {
        let data = res.data
        if (data.code == 200) {
          this.markdownToHtml = data.data.content
          data.data.traffic = data.data.traffic + 1;
          addTraffic(data.data)
        }
      })

    },

  },
  mounted() {
    this.get()
  },
  props: {
    aid: String
  }
};
</script>
<style scoped>
#content {
  width: 60%;
  margin: auto;
}
</style>