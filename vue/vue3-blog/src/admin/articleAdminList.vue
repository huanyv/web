<template>
  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" width="400" />
        <el-table-column prop="date" label="发布时间" width="180" />
        <el-table-column prop="traffic" label="访问" width="180" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button-group class="ml-4">
              <el-button
                type="primary"
                :icon="Edit"
                @click="updateArticle(scope.$index, scope.row)"
              ></el-button>
              <el-popconfirm
                confirm-button-text="Yes"
                cancel-button-text="No"
                icon-color="red"
                title="你确定要删除此项？"
                @confirm="deleteArticle(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button type="primary" :icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>

<script>
import { message } from "@/utils";
import { Edit, Delete } from "@element-plus/icons-vue";
import { reactive } from "vue";
export default {
  setup() {
    const tableData = reactive([
      {
        id: 1,
        title: "文章1",
        traffic: "10",
        date: "2016-05-03",
      },
      {
        id: 2,
        title: "文章2",
        traffic: "10",
        date: "2016-05-03",
      },
      {
        id: 3,
        title: "文章3",
        traffic: "10",
        date: "2016-05-03",
      },
      {
        id: 4,
        title: "文章4",
        traffic: "10",
        date: "2016-05-03",
      },
      {
        id: 5,
        title: "文章5",
        traffic: "10",
        date: "2016-05-03",
      },
    ]);
    return {
      tableData,
      Edit,
      Delete,
    };
  },
  methods: {
    deleteArticle(index, info) {
      // {"id":5,"title":"文章5","traffic":"10","date":"2016-05-03"}
      console.log(info.id);
      this.tableData.splice(index, 1);

      // 后端调用

      message("success","删除成功！")
    },
    updateArticle(index, info) {
      console.log(info);
      this.$router.push("/admin/edit/" + info.id);
    },
  },
};
</script>