
import { createRouter, createWebHistory } from 'vue-router'

// 路由组件
import Home from '@/home/index.vue'
import HomeView from '@/home/Home.vue'
import AboutView from '@/home/About.vue'
import Article from '@/home/Article.vue'

import LogIn from '@/admin/login.vue'
import Admin from '@/admin/index.vue'
import ArticleAdmin from '@/admin/article.vue'
import ArticleEdit from '@/admin/ArticleEdit.vue'

import { message,getCookie } from '@/lib'

const routes = [
    {
        path: "/",
        component: Home,
        children: [
            {
                path: "/",
                component: HomeView
            },
            {
                path: "/about",
                component: AboutView
            }
        ]
    }, {
        path: "/article/:aid",
        component: Article,
        props: true
    }, {
        path: "/admin/login",
        component: LogIn
    }, {
        path: "/admin",
        component: Admin,
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                component: ArticleAdmin,
            }, {
                path: "edit/:aid(\\d+)?",
                component: ArticleEdit,
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
    if (to.meta.requiresAuth == true && getCookie("_username_") == '') {  // 如果需要登录验证,并且还未登录
        message("warning","请先登录！")
        router.push("/admin/login")
        return false;
    }
    return true;
});

export default router



