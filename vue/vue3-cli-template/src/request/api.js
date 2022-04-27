import axios from 'axios'
import { post,get,put,del } from './request'

// 获取一言（例子）
export const getHitokoto = param => get('https://v1.hitokoto.cn/?c=' + param.c)














