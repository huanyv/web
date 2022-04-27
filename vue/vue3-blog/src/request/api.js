import axios from 'axios'
import { post,get,put,del } from './request'

// 后台管理登录
export const login = param => post("/admin/login",param)

// 校验登录状态
export const checkLoginState = () => get("/admin/checkLoginState")

// 获取文章列表
export const listArticle = () => get("/admin/article")

// 添加文章
export const addArticle = param => post("/admin/article", param)

// 获取一篇文章
export const getArticle = param => get("/admin/article/" + param.id)

// 更新
export const updateArticle = param => put("/admin/article", param);

// 删除
export const deleteArticle = param => del("/admin/article/" + param.id)


// 前台操作

// 获取前台文章列表
export const listArticleWeb = () => axios.get("http://localhost:8090/article")

// 获取一遍文章
export const getArticleWeb = param => axios.get("http://localhost:8090/article/" + param.id)

// 增加一条访问量
export const addTraffic = param => axios.put("http://localhost:8090/article",param)