
import { createRouter, createWebHistory } from 'vue-router'

// 路由组件
import home from '@/home/index.vue'
import about from '@/home/about.vue'
import articleList from '@/home/articleList.vue'
import articleDetails from '@/home/articleDetails.vue'

import login from '@/admin/login.vue'
import admin from '@/admin/index.vue'
import articleAdminList from '@/admin/articleAdminList.vue'
import articleEdit from '@/admin/articleEdit.vue'

import { message,getToken } from '@/utils'

import {checkLoginState} from '@/request/api'

const routes = [
    {
        path: "/",
        component: home,
        children: [
            {
                path: "/",
                component: articleList
            },
            {
                path: "/about",
                component: about
            }
        ]
    }, {
        path: "/article/:aid",
        component: articleDetails,
        props: true
    }, {
        path: "/admin/login",
        component: login
    }, {
        path: "/admin",
        component: admin,
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                component: articleAdminList,
            }, {
                path: "edit/:aid(\\d+)?",
                component: articleEdit,
                props: true
            }
        ]
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
            router.push("/admin/login")
            return false;
        }
        // 校验Token合法性
        checkLoginState().then(response => {
            let data = response.date
            if (data.code == 200) {
                return true
            } else {
                message.warning(data.msg)
                router.push("/admin/login")
                return false;
            }
        })

    }
    return true;
});

export default router



