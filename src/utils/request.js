import axios from 'axios'
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: '/api', // api的base_url
    timeout: 15000, // 请求超时时间
});

// respone拦截器
service.interceptors.response.use(
  response => {
      /**
       * code为非200是抛错
       */
      const res = response.data;
      console.log(response);
      console.log(res);

      if (res.code !== 200) {
          Message({
              message: res.message,
              type: 'error',
              duration: 3 * 1000
          });
          return Promise.reject('error')
      } else {
          return response.data
      }
  },
  error => {
      console.log('err' + error);// for debug
      Message({
          message: error.message,
          type: 'error',
          duration: 3 * 1000
      });
      return Promise.reject(error)
  }
);

export default service
