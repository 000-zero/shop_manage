<template>
  <div>
    <div class="user-info">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-card shadow="hover" :body-style="{ height: '250px' }">
            <div class="user-info-cont">
              <el-avatar :size="140" :src="user.avatar_src" />
              <div>
                <p>姓名：</p>
                {{ user.name }}
              </div>
            </div>
            <div class="user-info-list">
              <div>
                UID：<span>{{ user.userID }}</span>
              </div>
              <div>
                邮箱：<span>{{ user.email }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="17">
          <div class="descriptions">
            <el-card shadow="hover" :body-style="{ height: '219px' }">
              <el-descriptions
                title="买家信息"
                :column="3"
                border
                size="small"
                label-class-name="my-label"
              >
                <el-descriptions-item>
                  <template #label>
                    <div>
                      <el-icon><iphone /></el-icon>
                      联系电话
                    </div>
                  </template>
                  {{ user.phone }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div>
                      <el-icon><location /></el-icon>
                      省市
                    </div>
                  </template>
                  {{ user.province }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <el-icon><office-building /></el-icon>
                    城市
                  </template>
                  {{ user.city }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <el-icon><house /></el-icon>
                    详细地址
                  </template>
                  {{ user.address }}
                </el-descriptions-item>
              </el-descriptions>
              <div class="pdt10">
                <el-descriptions title="订单基本信息" :column="3" border>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><tickets /></el-icon>
                      订单编号
                    </template>
                    {{ user.orderNumber }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><money /></el-icon>
                      金额
                    </template>
                    {{ user.amount }}￥
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><money /></el-icon>
                      订单状态
                    </template>
                    {{ user.order_status }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><timer /></el-icon>
                      创建订单时间
                    </template>
                    {{ user.order_create }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <el-icon><wallet /></el-icon>
                      支付时间
                    </template>
                    <div v-if="status == 1">用户还未支付</div>
                    <div v-else>{{ user.pay_time }}</div>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="details">
      <div style="display: flex; align-items: center">
        <el-icon><document /></el-icon>订单商品详情
      </div>
      <div v-show="Ship">
        <el-button type="primary" @click="sent"
          ><el-icon :size="18"><van /></el-icon>&nbsp&nbsp确定发货</el-button
        >
      </div>
    </div>
    <div class="details_list">
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
          label="订单详情编号"
          width="60"
        ></el-table-column>
        <el-table-column label="商品图片">
          <template #default="scope">
            <el-image
              class="table-td-thumb-img"
              :src="scope.row.goods.cover"
              :preview-src-list="[scope.row.goods.cover]"
              preview-teleported
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template #default="scope">《{{ scope.row.goods.title }}》</template>
        </el-table-column>
        <el-table-column label="商品价格">
          <template #default="scope">{{ scope.row.goods.price }}￥</template>
        </el-table-column>
        <el-table-column label="商品货号">
          <template #default="scope">{{ scope.row.goods.id }}</template>
        </el-table-column>
        <el-table-column label="购买数量">
          <template #default="scope">{{ scope.row.num }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getOrderDetails, chanceOrderStatus } from "../../api/index";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const user = reactive({
      avatar_src: new URL("../../assets/img/avatar.jpg", import.meta.url).href,
      name: "",
      userID: "",
      email: "",
      phone: "",
      province: "",
      city: "",
      address: "",
      orderNumber: "",
      amount: "",
      order_create: "",
      pay_time: "",
      order_status: "",
    });

    const Ship = ref(false);
    const route = useRoute();
    var status = route.query.status;

    const tableData = ref([]);
    const pageTotal = ref(0);

    const init = async () => {
      await getOrderDetails({
        userId: route.query.user_id,
        orderID: route.query.id,
      }).then((res) => {
        console.log(res);
        user.name = res.address.name;
        user.phone = res.address.phone;
        user.province = res.address.province;
        user.city = res.address.city;
        user.address = res.address.address;
        user.userID = res.Uid_email_acatar.id;
        user.email = res.Uid_email_acatar.email;
        user.avatar_src = res.Uid_email_acatar.acatar;

        tableData.value = res.order_details;

        if (res.status.status == 1) return (user.order_status = "已下单");
        else if (res.status.status == 2) {
          user.order_status = "已支付";
          Ship.value = true;
        } else if (res.status.status == 3)
          return (user.order_status = "已发货");
        else if (res.status.status == 4) return (user.order_status = "已收货");
        else if (res.status.status == 5) return (user.order_status = "已过期");
      });
    };

    user.amount = route.query.amount;
    user.orderNumber = route.query.order_no;
    user.pay_time = route.query.pay_time;
    user.order_create = route.query.createdAt;

    onMounted(() => {
      init();
      console.log(route.query.status);
    });

    const sent = async () => {
      status = 3;
      route.query.status++;
      console.log(route.query.id);
      await chanceOrderStatus({ status: status, id: route.query.id }).then(
        (res) => {
          console.log(res);
          ElMessage({
            message: "发货成功",
            type: "success",
          });
          Ship.value = false;
          user.order_status = "已发货";
        }
      );
    };

    return {
      user,
      tableData,
      pageTotal,
      Ship,
      status,
      sent,
    };
  },
};
</script>

<style  lang="less" scoped>
.user-info {
  margin: 20px;
  border-radius: 5px;
  height: 170;

  .user-info-cont {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 19px;
    font-family: "STKaiti";
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
  }

  .user-info-list {
    padding-top: 30px;
    font-size: 17px;
    color: #999;
    font-family: "STSong";

    span {
      margin-left: 70px;
    }
  }
}

.descriptions {
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
}

.details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  font-family: "STSong";
  padding-right: 15px;
  padding-left: 15px;
  margin: 20px;
  border-radius: 5px;
  line-height: 45px;
  color: rgb(100, 30, 30);
}
.details_list {
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
}

.table-td-thumb-img {
  display: block;
  margin: auto;
  width: 50px;
  height: 50px;
}
</style>