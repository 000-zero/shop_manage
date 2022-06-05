<template>
  <div>
    <div class="header">
      <div class="collapse-btn" @click="collapseChage">
        <el-icon v-if="!collapse"><expand /></el-icon>
        <el-icon v-else><fold /></el-icon>
      </div>
      <div class="logo">读书商城后台管理系统</div>
      <div class="header-right">
        <div class="header-user-con">
          <div class="btn-bell">
            <el-tooltip
              effect="dark"
              :content="message ? `有${message}条未读消息` : `消息中心`"
              placement="bottom"
            >
              <el-icon><bell /></el-icon>
            </el-tooltip>
          </div>
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../assets/img/icon.png" />
          </div>
          <!-- 用户下拉菜单 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }}
              <el-icon><arrow-down-bold /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <a href="#" target="_blank" style="text-decoration: none">
                  <el-dropdown-item>项目仓库</el-dropdown-item>
                </a>
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="loginout" @click="SignOut"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const username = "admin";
    const message = 2;

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
      console.log(collapse.value);
    };

    const router = useRouter();

    const SignOut = () => {
      store.commit("setIsLogin", false);
      setTimeout(() => {
        router.push({ path: "/login" });
      }, 500);
    };

    return {
      message,
      username,
      collapseChage,
      collapse,
      SignOut,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  z-index: 8;
  background-color: rgb(58, 126, 189);

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 50px;

    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;

      .user-avator {
        margin-left: 20px;

        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}

.el-dropdown-link {
  color: #fff;
}
</style>