<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-form :model="form" class="ms-content">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="email" @keyup.enter.native = "submitForm(form)" >
            <template #prepend>
              <el-icon :size="20"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="form.password"
            @keyup.enter.native = "submitForm(form)" 
          >
            <template #prepend>
              <el-icon :size="20"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(form)" class="submit_btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { Login } from "../../api/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const form = reactive({
      email: "",
      password: "",
      role: 1, //管理员角色
    });

    const store = useStore();
    const router = useRouter();

    const submitForm = async (_from) => {
      await Login(_from).then((res) => {
        window.localStorage.setItem("token", res.token);
        store.commit("setIsLogin", true);

        setTimeout(() => {
          router.push({ path: "/index" });
        }, 500);
      });
    };

    return {
      form,
      submitForm,
    };
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/bg.jpg) no-repeat center center;
  background-size: 100% 100%;

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin-left: -175px;
    margin-top: -100px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;

    .ms-content {
      padding: 30px 30px;

      .submit_btn {
        width: 100%;
        padding: 13px 0;
        font-size: 16px;
      }
    }
  }
}
</style>