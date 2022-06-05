<template>
  <div class="container">
    <div>
      <el-input
        v-model="query.name"
        placeholder="用户名"
        class="handle-input mr10"
      ></el-input>
      <el-button type="primary"
        ><el-icon><search /></el-icon>搜索</el-button
      >
    </div>
    <div class="pp">
      <el-table
        stripe
        border
        :data="tableData"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="邮箱">
          <template #default="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.acatar"
              :preview-src-list="[scope.row.acatar]"
              preview-teleported
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="createdAt" label="注册时间"></el-table-column>
        <el-table-column label="用户使用状态" width="180" align="center">
          <template #default="scope">
            <div v-if="scope.row.is_locked == 0">
              <el-button type="text" @click="prohibit(scope.row)" class="red"
                ><el-icon color="red"><close-bold /></el-icon>禁用</el-button
              >
            </div>
            <el-button
              @click="prohibit(scope.row)"
              type="text"
              v-if="scope.row.is_locked == 1"
              ><el-icon><check /></el-icon>恢复</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { getUsersList, IsLocked } from "../../api/index";
// import fetchData from "../../../public/table.json";

export default {
  setup() {
    const query = reactive({
      address: "",
      name: "",
      pageIndex: 1,
      pageSize: 10,
    });

    var recover_show = ref(false);
    var prohibit_show = ref(true);

    var tableData = ref([]);
    var pageTotal = ref(0);
    // tableData.value = fetchData.list;
    pageTotal.value = 50;

    const init = () => {
      getUsersList().then((res) => {
        tableData.value = res.data.UserList;
        pageTotal.value = res.data.pageTotal;
      });
    };

    onMounted(() => {
      init();
    });

    const prohibit = async (row) => {
      if (row.is_locked == 0)  (row.is_locked = 1);
      else if (row.is_locked == 1)  (row.is_locked = 0);
      console.log(row.is_locked);
      await IsLocked({ id: row.id, is_locked: row.is_locked });
      init();
    };

    return {
      query,
      tableData,
      pageTotal,
      recover_show,
      prohibit_show,
      prohibit,
    };
  },
};
</script>

<style lang="less" scoped>
.handle-input {
  width: 300px;
  display: inline-block;
}

.mr10 {
  margin-right: 10px;
}

.table {
  margin-top: 20px;
  width: 100%;
  font-size: 14px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.red {
  color: red;
}
</style>