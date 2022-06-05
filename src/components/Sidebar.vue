<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" active-text-color="#20a0ff" :class="{ 'sidebar-el-menu-collapse': collapse }"  :collapse="collapse" router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <img :src="item.src" />
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <img :src="item.src" />
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const items = [
      {
        src: new URL("../assets/img/home.png", import.meta.url).href,
        index: "/index",
        title: "系统首页",
      },
      {
        src: new URL("../assets/img/user.png", import.meta.url).href,
        index: "/user",
        title: "用户",
      },
      {
        src: new URL("../assets/img/order.png", import.meta.url).href,
        index: "/order",
        title: "订单管理",
        subs: [
          {
            index: "/orderlist",
            title: "订单列表",
          },
          {
            index: "/#",
            title: "订单设置",
          },
          {
            index: "#",
            title: "申请退款处理",
          },
        ],
      },
      {
        src: new URL("../assets/img/goods.png", import.meta.url).href,
        index: "/goods",
        title: "商品管理",
        subs: [
          {
            index: "#",
            title: "商品列表",
          },
          {
            index: "/addgoods",
            title: "添加商品",
          },
          {
            index: "#",
            title: "商品分类",
          },
        ],
      },
      {
        src: new URL("../assets/img/quanxian.png", import.meta.url).href,
        index: "3",
        title: "权限管理",
      },
    ];

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      collapse
    };
  },
};
</script>

<style lang="less" scoped>
.sidebar {
  display: block;
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu {
  width: 250px;
  // background-color: #54c6e9;
}
.sidebar > ul {
  height: 100%;
}
</style>