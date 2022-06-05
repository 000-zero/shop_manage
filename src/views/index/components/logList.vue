
<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-icon><clock /></el-icon>
        <span >项目更新日志：</span>
      </div>
      <div class="logArea el-scrollbar">
        <div class="item" v-for="(item, index) in logsData" :key="index">
          <p class="timeArea">
            <span class="title">日期：</span>
            <span class="title time">{{ item.createTime }}</span>
          </p>
          <div class="logContent">
            <p class="title">更新内容：</p>
            <ul class="logUl">
              <li v-for="(citem, cindex) in item.data" :key="cindex">
                {{ citem }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import logsData from "../../../assets/datas/logs.json";
import { Clock } from "@element-plus/icons-vue";

export default {
  name: "logList",
  components: {
    Clock,
  },
  data() {
    return {
      logsData: logsData.data,
    };
  },
};
</script>

<style lang="less" scoped>
.logContainer {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height: 370px;
  max-height: 370px;
  overflow: hidden;
  border-radius: 6px;
  .logArea {
    overflow: auto;
    height: 100%;
  }
  .item {
    .title {
      font-size: 13px;
    }
    .time {
      color: #87de75;
    }
    .logContent {
      .logUl {
        padding-left: 30px;
        li {
          font-size: 12px;
          list-style: disc;
          line-height: 20px;
        }
      }
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}

.clearfix:after {
  clear: both;
}

.el-scrollbar {
  height: 290px !important;
}
</style>

