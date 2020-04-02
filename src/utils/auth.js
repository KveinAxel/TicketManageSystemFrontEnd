import Cookies from 'js-cookie'

const TokenKey = 'loginToken';

export function getToken() {
  return Cookies.get()
}
