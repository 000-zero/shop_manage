<template>
   <router-view />
</template>
<script lang="ts">
import { defineComponent, nextTick, provide, ref } from 'vue'
export default defineComponent({
  setup () {
    const showPage = ref<boolean>(true)
    const onRefresh = () => {
      showPage.value = false
      nextTick(() => {
        showPage.value = true
      })
    }
    provide('reload', onRefresh)
    return {
      showPage
    }
  }
})
</script>

<style lang="less">
@import "./assets/css/main";
@import "./assets/css/scrollBar";
*{
    margin: 0;
    padding: 0;
}
</style>