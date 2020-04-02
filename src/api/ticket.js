import request from '@/utils/request'

// 添加航班
export function ticketCreate(params) {
    return request({
        url:'/ticket/create',
        method:'get',
        params:params
    })
}

// 删除航班
export function ticketDelete(params) {
    return request({
        url:'/ticket/delete',
        method:'get',
        params:params
    })
}

// 航班信息
export function ticketList(params) {
    return request({
        url:'/ticket/list',
        method:'get',
        params:params
    })
}

// 修改航班
export function ticketUpdate(params) {
    return request({
        url:'/ticket/update',
        method:'get',
        params:params
    })
}

// 航班延误
export function ticketDelay(params) {
    return request({
        url:'/ticket/delay',
        method:'get',
        params:params
    })
}

// 查询指定起降点航班
export function ticketSearch(params) {
    return request({
        url:'/ticket/search',
        method:'get',
        params:params
    })
}

// 航班取消
export function ticketCancel(params) {
    return request({
        url:'/ticket/cancel',
        method:'get',
        params:params
    })
}

// 航班推荐
export function ticketRecommend(params) {
    return request({
        url:'/ticket/recommend',
        method:'get',
        params:params
    })
}
