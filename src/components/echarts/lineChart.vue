<template>
  <div :id="id" class="orderArea"></div>
</template>

<script>
import echarts from "echarts";
import echartsTheme from "../echarts/theme/westeros.json";

export default {
  data() {
    return {
      id: "lineChart",
      myChart: null,
    };
  },
  mounted() {
    this.loadChart();
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    loadChart() {
      this.$nextTick(() => {
        echarts.registerTheme("westeros", echartsTheme);
        this.myChart = echarts.init(
          document.getElementById(this.id),
          "westeros"
        );
        this.myChart.setOption(this.initOption());
      });
    },
    initOption() {
      let data = {
        title: {
          text: "销售走势图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["文学", "文化", "流行"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "文学",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
              },
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "文化",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
              },
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "流行",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
              },
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      };
      return data;
    },
  },
  watch: {
    // id:()=>{
    //     this.initOption()
    // }
  },
};
</script>

<style lang="less">
.orderArea {
  height: 370px;
  width: 100%;
  background: #fff;
  border-radius: 6px;
}
</style>
