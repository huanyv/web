
import { createRouter, createWebHistory } from 'vue-router'

import { message, getToken } from '@/utils';

import index from '@/views/home'
import list from "@/views/article/list";
import edit from "@/views/article/edit";
import commonts from "@/views/commont/commont";
import messages from "@/views/commont/message";
import link from "@/views/link";
import support from '@/views/support'
import setting from '@/views/setting'

const routes = [
    {
        path: '/',
        component: index,
        children: []
    },{
        path: '/article/list',
        component: list,
        meta: {title: "文章列表"}
    }, {
        path: '/article/edit',
        component: edit,
        meta: {title: "文章编辑"}
    }, {
        path: '/commont',
        component: commonts,
        meta: {title: "评论列表"}
    }, {
        path: '/message',
        component: messages,
        meta: {title: "留言列表"}
    }, {
        path: '/link',
        component: link,
        meta: {title: "友链"}
    }, {
        path: '/support',
        component: support,
        meta: {title: "评论列表"}
    }, {
        path: '/setting',
        component: setting,
        meta: {title: "设置"}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


// 全局路由导航守卫
router.beforeEach((to, from) => {
    // console.log(to); // 去哪儿
    // console.log(from); // 从哪儿来
    if (to.meta.requiresAuth == true) {
        let token = getToken()
        if (token == null || token == "") {
            message.warning("登录失效")
            router.push({ name: 'login'})
            return false;
        }
        // 校验Token合法性
        /*checkLoginState().then(response => {
            let data = response.date
            if (data.code == 200) {
                return true
            } else {
                message.warning(data.msg)
                router.push({ name: 'login'})
                return false;
            }
        })*/

    }
    return true;
});


export default router
