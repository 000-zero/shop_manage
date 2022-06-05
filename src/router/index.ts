import { ElMessage } from "element-plus";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue"
import store from '../store';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: "/index",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/index",
                name: "index",
                meta: {
                    title: '系统首页',
                    isAuthRequired:true
                },
                component: () => import( /* webpackChunkName: "index" */ "../views/index/index.vue")
            },
            {
                path: "/user",
                name: "user",
                meta: {
                    title: '用户',
                    isAuthRequired:true
                },
                component: () => import( /* webpackChunkName: "index" */ "../views/user/user.vue")
            },
            {
                path: "/orderlist",
                name: "orderlist",
                meta: {
                    title: '订单列表',
                    isAuthRequired:true
                },
                component: () => import( /* webpackChunkName: "index" */ "../views/order/orderList.vue")
            },
            {
                path: "/orderdetails",
                name: "orderdetails",
                meta: {
                    title: '订单详情',
                    isAuthRequired:true
                },
                component: () => import( /* webpackChunkName: "index" */ "../views/order/orderDetails.vue")
            },
            {
                path: "/addgoods",
                name: "addgoods",
                meta: {
                    title: '添加商品',
                    isAuthRequired:true
                },
                component: () => import( /* webpackChunkName: "index" */ "../views/goods/addGoods.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录',
            isAuthRequired:false
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/login/Login.vue")
    }

]
const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next)=>{
    if(to.meta.isAuthRequired && store.state.user.isLogin === false){
        ElMessage({
            message: "您还没有登录，请先登录",
            type: "error",
          });
        return next('/login')
    }else{
        next()
    }

    if(typeof(to.meta.title) === 'string'){
        document.title = to.meta.title;
      }
      
})

export default router