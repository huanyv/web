
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
        children: [
            {
                path: "",
                component: ArticleAdmin,
            }, {
                path: "edit/:aid(\\d+)?",
                component: ArticleEdit,
                props: true
            }
        ],
        beforeEnter: (to, from) => {
            // reject the navigation 独享守卫
            return true
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导航守卫
router.beforeEach((to, from) => {
    // ...
    // 返回 false 以取消导航
    return true
})


export default router



