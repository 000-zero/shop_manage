import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from "element-plus";

export function request(config: AxiosRequestConfig<any>) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:3004/',
        timeout:5000
    })

    //请求拦截
    instance.interceptors.request.use(config=>{
        // const token = window.localStorage.getItem('token');
        // if(token) {
        //     config.headers.Authorization = 'Bearer '+token;
        // }
        // 直接放行
        return config;
    }, err=>{

    })

    // 响应拦截
    instance.interceptors.response.use(res=>{
     
        return res.data
    }, err=>{
       console.log(err.response.data.errors)
       ElMessage({
        message: err.response.data.errors,
        type: "error",
      });
       
    })

    return instance(config);
}

