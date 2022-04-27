import { get } from "./request.js"

export const getHitokoto = (fn,param) => get("v1.hitokoto.cn",param,fn)





