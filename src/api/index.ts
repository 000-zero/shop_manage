import { request } from '../utils/request';

//获取首页数据
export function getHomeAllData() {
    return request({
        url: '/api/index/manage'
    })
}

//获取用户列表
export function getUsersList() {
    return request({
        url: '/api/users/list'
    })
}

//是否禁用用户
export function IsLocked(data: any) {
    return request({
        url: '/api/users/is_locked',
        method: 'post',
        data
    })
}

//获取订单列表
export function OrderList(params: any){
    return request({
        url:'/api/orders/list',
        params
    })
}

//删除订单
export function deleteOrders(id: any){
    return request({
        url:`/api/orders/${id}`,
        method: 'delete'
    })
}

//订单详情
export function getOrderDetails(params: any){
    return request({
        url:`/api/orders/orderDetails`,
        method:'get',
        params
    })
}

//改变订单状态
export function chanceOrderStatus(data: any){
    return request({
        url:'/api/orders/status',
        method:'post',
        data
    })
}

//添加商品
export function addGoods(data: any){
    return request({
        url:'/api/goods/addGoods',
        method:'post',
        data
    })
}

//登录
export function Login(data: any){
    return request({
        url:'/api/users/login',
        method:'post',
        data
    })
}