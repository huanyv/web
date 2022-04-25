
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

import { message,getCookie } from '@/utils'

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
    /* if (to.meta.requiresAuth == true && getCookie("_username_") == '') {  // 如果需要登录验证,并且还未登录
        message("warning","请先登录！")
        router.push("/admin/login")
        return false;
    } */
    return true;
});

export default router



