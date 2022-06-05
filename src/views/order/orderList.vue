<template>
  <div class="container">
    <div class="mb10">
      <el-input
        v-model="query.name"
        placeholder="用户名"
        class="handle-input mr10"
      ></el-input>
      <el-button type="primary"
        ><el-icon><search /></el-icon>搜索</el-button
      >
    </div>
    <div>
      <el-table
        stripe
        border
        :data="tableData"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="user_id" label="用户名ID"></el-table-column>
        <el-table-column prop="order_no" label="订单号"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column label="订单状态">
          <template #default="scope">
            <div v-if="scope.row.status == 1">已下单</div>
            <div v-if="scope.row.status == 2">已支付</div>
            <div v-if="scope.row.status == 3">已发货</div>
            <div v-if="scope.row.status == 4">已收货</div>
            <div v-if="scope.row.status == 5">已过期</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          width="155"
          label="生成订单时间"
        ></el-table-column>
        <el-table-column prop="pay_time" label="支付时间">
          <template #default="scope">
            <div v-if="scope.row.pay_time != null">
              {{ scope.row.pay_time }}
            </div>
            <div v-else>用户还未支付</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="orderdetails(scope)"
              ><el-icon><View /></el-icon>查看</el-button
            >
            <el-button type="text" class="red" @click="DeleteOrders(scope.row.id)"
              ><el-icon color="red"><delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          v-model:current-page="query.pageIndex"
          v-model:page-size="query.pageSize"
          :total="pageTotal"
          :page-count="query.page_count"
          @current-change="handlePageChange"
          @prev-click="prevclick"
          @next-click="nextclick"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { OrderList,deleteOrders } from "../../api/index";
import { useRouter } from "vue-router";
export default {
  setup() {
    const tableData = ref([]);
    const pageTotal = ref(0);
    const router = useRouter();
    const params = reactive({
      page: 1,
    });

    const query = reactive({
      name: "",
      pageSize: "",
      pageIndex: "",
      page_count:""
    });

    const init = () => {
      OrderList(params).then((res) => {
        console.log(res);
        tableData.value = res.data.OrderList;
        pageTotal.value = res.pageTotal;
        query.pageSize = res.pageSize;
        query.page_count =  Math.round(pageTotal.value/query.pageSize)
      });
    };

    const handlePageChange = () => {
      console.log(query.pageIndex);
      params.page = query.pageIndex;
      init();
    };

    const prevclick = ()=>{
      params.pag--;
      init();
    }

    const nextclick = () =>{
      params.pages++;
      init();
    }

    onMounted(() => {
      init();
    });

    const DeleteOrders = (id)=>{
      // console.log(id)
      deleteOrders(id).then(
        console.log("success")
      )
      init();
    }

    const orderdetails = (scope) => {
      const orderDetails = tableData.value[scope.$index]
      router.push({ path: "/orderdetails",query:orderDetails});
    };

    return {
      tableData,
      pageTotal,
      query,
      orderdetails,
      handlePageChange,
      prevclick,
      nextclick,
      DeleteOrders
    };
  },
};
</script>

<style>
.handle-input {
  width: 300px;
  display: inline-block;
}

.red {
  color: red;
}
</style>