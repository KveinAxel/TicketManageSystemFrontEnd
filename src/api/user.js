import request from '@/utils/request'

// 用户登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

// 用户注册
export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data: data
    })
}

// 用户登出
export function logout() {
    return request({
        url: 'url/logout',
        method: 'get',
    })
}

// 用户购票
export function userPurchase(params) {
    return request({
        url: '/user/purchase',
        method: 'get',
        params: params
    })
}

// 用户退票
export function userCancelTicket(params) {
    return request({
        url: '/user/cancelTicket',
        method: 'get',
        params: params
    })
}


// 用户预订机票
export function userAppointment(params) {
    return request({
        url: '/user/appointment',
        method: 'get',
        params: params
    })
}

// 用户取消预定
export function userCancelAppointment(params) {
    return request({
        url: '/user/cancelAppointment',
        method: 'get',
        params: params
    })
}

// 获取消息
export function userMessageBox() {
    return request({
        url: '/user/messageBox',
        method: 'get',
    })
}

// 获取用户已购机票列表
export function userListOwnTickets() {
    return request({
        url: '/user/listOwnTickets',
        method: 'get'
    })
}
