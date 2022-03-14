// 路由的配置

import { createRouter, createWebHistory } from "vue-router"; // 引入路由器

import Home from "../components/Home.vue";
import About from "../components/About.vue"; // 引入组件
import User from "../components/user/index.vue";

import UserProfile from "../components/user/UserProfile.vue";
import UserProposts from "../components/user/UserProposts.vue";

// 设置路由跳转
const routes = [
    {
        path: "/",
        name: "home",
        meta: { requiresAuth: false }, // 是否需要身份验证
        components: {
            // 默认访问没有有name的标签
            default: Home,
            // 访问name是viwe的标签
            viwe2: About,
        },
    },
    {
        path: "/about",
        name: "about",
        meta: { requiresAuth: false },
        component: About,
    },
    {
        path: "/user/:id",
        props: true, // 开启组件传参
        // props: { id: "666" }, // 固定传参
        name: "user",
        meta: { requiresAuth: false },
        component: User,

        // 子路由 ，页面会渲染到父亲的`<router-view></router-view>`上，path可以的`/`开头
        children: [
            {
                path: "profile",
                component: UserProfile,
            },
            {
                path: "proposts",
                component: UserProposts,
            },
        ],
    },
    {
        // 设置一个重定向， 访问 index 的时候  重定向到 /  [ URL会自动改变 ]
        path: "/index",
        redirect: "/",
    },
];

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局路由导航守卫
router.beforeEach((to, from) => {
    // console.log(to); // 去哪儿
    // console.log(from); // 从哪儿来
    if (to.meta.requiresAuth == true) {  // 如果需要登录验证
        console.log("请先登录！！");
        return false;
    }
    return true;
});

export default router;
