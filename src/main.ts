import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import store from "./store"

const app = createApp(App)
for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
}
app.use(router).use(ElementPlus, {
    locale: zhCn,
}).use(store)
app.mount('#app')
