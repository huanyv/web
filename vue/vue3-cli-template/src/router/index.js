
import { createRouter, createWebHistory } from 'vue-router'

import { message, getToken } from '@/utils';

import HelloWorld from '@/components/HelloWorld.vue'
import index from '@/view/index.vue'

const routes = [
    {
        path: '/',
        component: index,
        children: []
    },
    {
        path: "/hello",
        component: HelloWorld,
        children: []
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
        checkLoginState().then(response => {
            let data = response.date
            if (data.code == 200) {
                return true
            } else {
                message.warning(data.msg)
                router.push({ name: 'login'})
                return false;
            }
        })

    }
    return true;
});


export default router
