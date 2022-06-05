import { createStore } from 'vuex'

export default createStore({
    state: {
        collapse: false,
        user: {
            isLogin: false
        },
    },
    mutations: {
        // 侧边栏折叠
        handleCollapse(state, data) {
            state.collapse = data;
        },
        setIsLogin(state,payload){
            state.user.isLogin = payload;
        },
    },
    actions: {},
    modules: {}
})