import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
import {getUsername, getAdmin} from "./utils/auth"; // Progress 进度条样式

const whiteList = ['/user/login', '/user/register'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getUsername()) {
        if (getAdmin() === 'admin') {
            next({path: '/admin'});
        } else if (getAdmin() === 'normal') {
            next({path: '/user'});
        } else {
            next('/user/login');
        }
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/user/login');
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
});
