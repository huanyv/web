import axios from 'axios'

import { getToken, message } from '@/utils'

import router from '@/router'

const http = axios.create({
    baseURL: 'http://localhost:8080',
    // timeout: 4000
})

// 配置请求拦截器
http.interceptors.request.use(
    config => {
        console.log("请求拦截")
        config.headers = {
            // 每次请求前带上Token
            token: getToken()
        }
        return config;
    },
    err => Promise.reject(err)
);

// 配置响应拦截器
http.interceptors.response.use(res => {
    console.log("响应拦截");
    // 登录过期
    if (res.data.code == 401) {
        message.error(res.data.msg)
        router.push("/admin/login")

    }
    return res;
}, err => {
    return Promise.reject(err)
});

export const get = (url, param) => {
    return http.get(url, param)
}


export const post = (url, param) => {
    return http.post(url, param)
}

export const put = (url, param) => {
    // param._method = "PUT"
    return http.put(url, param)
}

export const del = (url, param) => {
    // param._method = "DELETE"
    return http.delete(url, param)
}





