
import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/view/HomePage.vue'
import About from '@/view/AboutPage.vue'
import Archives from '@/view/ArchivesPage.vue'
import HomeHeader from '@/components/HomeHeader.vue'

// 路由配置
const routes = [
    {
        path: "/",
        component: HomeHeader,
        children: [
            {
                path: "/",
                component: Home
            }, {
                path: "/about",
                component: About
            }
        ]
    }, {
        path: '/archives/:aid',
        component: Archives,
        props: true
    }
]

// 路由器创建
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router







