<template>
  <div>
    <v-header />
    <v-sidebar />
    <div>
      <div class="content-box" :class="{ 'content-collapse': collapse }">
        <router-view></router-view>
        <!-- <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view> -->
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "../components/Header.vue";
import VSidebar from "../components/Sidebar.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    vHeader,
    VSidebar,
  },
  setup() {
    const store = useStore();
    const collapse = computed(() => store.state.collapse);
    return{
      collapse
    }
  },
};
</script>

<style>
</style>