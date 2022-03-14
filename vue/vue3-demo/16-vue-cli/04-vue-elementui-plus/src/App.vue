<template>
  <h1>{{ title }}</h1>
  <el-button type="danger" :icon="Delete">Danger</el-button>
  <br />
  <el-date-picker
    v-model="value"
    type="date"
    placeholder="Pick a day"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
  >
  </el-date-picker>
</template>

<!--  
  setup函数和<script setup></script> 不能共存
  但如果两个script标签和<script setup></script>可以
  //  [3]
-->
<script setup>
import { Delete } from "@element-plus/icons-vue";
//  [3]
import { value, shortcuts, disabledDate } from "@/elementui/datepicker.js";
</script>

<script>
//  [2]
// import { ref } from "vue";
export default {
  name: "App",
  components: {},
  data() {
    return {
      title: "Hello ElementUI-Plus!",
      //  [1]
      // value: "",
      // shortcuts: [
      //   {
      //     text: "Today",
      //     value: new Date(),
      //   },
      //   {
      //     text: "Yesterday",
      //     value: () => {
      //       const date = new Date();
      //       date.setTime(date.getTime() - 3600 * 1000 * 24);
      //       return date;
      //     },
      //   },
      //   {
      //     text: "A week ago",
      //     value: () => {
      //       const date = new Date();
      //       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      //       return date;
      //     },
      //   },
      // ],
    };
  },
  methods: {
    //  [1]
    // disabledDate(time) {
    //   return time.getTime() > Date.now();
    // },
  },
  //  [2]
  // setup() {
  //   const value = ref("");

  //   const shortcuts = [
  //     {
  //       text: "Today",
  //       value: new Date(),
  //     },
  //     {
  //       text: "Yesterday",
  //       value: () => {
  //         const date = new Date();
  //         date.setTime(date.getTime() - 3600 * 1000 * 24);
  //         return date;
  //       },
  //     },
  //     {
  //       text: "A week ago",
  //       value: () => {
  //         const date = new Date();
  //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
  //         return date;
  //       },
  //     },
  //   ];

  //   const disabledDate = (time) => {
  //     return time.getTime() > Date.now();
  //   };

  //   // 暴露给 template

  //   //

  //   return {
  //     value,
  //     shortcuts,
  //     disabledDate,
  //   };
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
