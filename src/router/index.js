import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/register', component: () => import('@/views/login/register'), hidden: true},
    {path: '/404', component: () => import('@/views/404'), hidden: true},
    {path: '/user', component: () => import('@/views/user'), hidden: true},
    {path: '/admin', component: () => import('@/views/admin'), hidden: true},
    {path: '*', redirect: '/404', hidden: true}
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

