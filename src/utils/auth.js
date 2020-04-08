import Cookies from 'js-cookie'

export function getUsername() {
    return Cookies.get('username')
}

export function getAdmin() {
    return Cookies.get('admin')
}
