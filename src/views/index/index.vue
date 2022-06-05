<template>
  <div class="data_section">
    <el-row :gutter="10" class="row_list">
      <el-col :span="8">
        <div class="row_left row_base">
          <el-col :span="12">
            <div class="register row_Item">
              <div class="row_Item_text">
                <p>用户数量</p>
                <p class="text_value">{{user_num}}</p>
              </div>
              <el-icon :size="40" color="#fff"><user /></el-icon>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="goods row_Item">
              <div class="row_Item_text">
                <p>商品数量</p>
                <p class="text_value">{{goods_num}}</p>
              </div>
              <el-icon :size="40" color="#fff"><goods /></el-icon>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="row_right row_base">
          <el-col :span="6">
            <div class="money row_Item">
              <div class="row_Item_text">
                <p>交易额</p>
                <p class="text_value">{{amount}}</p>
              </div>
              <el-icon :size="40" color="#fff"><coin /></el-icon>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="order row_Item">
              <div class="row_Item_text">
                <p>订单</p>
                <p class="text_value">{{orders_mun}}</p>
              </div>
              <el-icon :size="40" color="#fff"><document /></el-icon>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="administrator row_Item">
              <div class="row_Item_text">
                <p>管理员数量</p>
                <p class="text_value">{{administrator_num}}</p>
              </div>
              <el-icon :size="40" color="#fff"><avatar /></el-icon>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="information row_Item">
              <div class="row_Item_text">
                <p>系统消息</p>
                <p class="text_value">200</p>
              </div>
              <el-icon :size="40" color="#fff"><bell /></el-icon>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row_list order_list">
      <el-col :span="7">
        <log-list></log-list>
      </el-col>
      <el-col :span="17">
        <!-- <bar-chart type="barChart"></bar-chart> -->
        <line-chart></line-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import logList from "./components/logList.vue"; // 日志列表
import lineChart from "../../components/echarts/lineChart.vue"; //折线图
import { onMounted, reactive, toRefs } from "vue";
import { getHomeAllData } from "../../api/index";
export default {
  name: "index",
  components: {
    logList,
    lineChart,
  },
  setup() {
    const data = reactive({
      administrator_num: "",
      amount: "",
      goods_num: "",
      orders_mun: "",
      user_num: "",
    });

    onMounted(() => {
       getHomeAllData().then((res) => {
         console.log(res)
        data.administrator_num = res.data.administrator_num;
        data.amount = res.data.amount
        data.goods_num = res.data.goods_num
        data. orders_mun = res.data. orders_mun
        data.user_num = res.data.user_num
      });
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
.data_section {
  margin: 20px;
  border-radius: 2px;
  .row_list {
    margin-bottom: 20px;
    .row_base {
      padding: 10px;
      box-sizing: border-box;
      background: #fff;
      height: 110px;
      border-radius: 6px;
      display: flex;

      .row_Item {
        height: 100%;
        border-radius: 6px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .row_Item_text {
          text-align: center;
          line-height: 180%;
          color: #fff;
        }
      }
    }
  }
  .register {
    background-color: #84d9d2;
  }
  .goods {
    background-color: #93b7e3;
  }
  .money {
    background-color: #edafda;
  }
  .order {
    background-color: #93b7e3;
  }
  .administrator {
    background-color: #87de75;
  }
  .information {
    background-color: #ffa3a1;
  }
  .text_value {
    font-size: 21px;
  }
}
</style>