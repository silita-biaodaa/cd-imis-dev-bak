import axios from 'axios'
import qs from 'qs'
var baseURL = 'http://imis.biaodaa.com/'
// var baseURL = 'http://192.168.1.131:8081/'

axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''

  // if (token) {
    config.headers['Authorization'] = token
  // }
  return config
}
// , function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
//   if (response.data.code === 402 || response.data.code === 401) {
//     localStorage.removeItem('Authorization')
//     this.$router.replace({
//       path: '/login' // 到登录页重新获取token
//     })
//   }
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })

export const queryList = params => {
  return axios.post('authorize/user', params).then(res => res.data)
}

export const recordBook = params => {
  return axios.post('user/tmp/create', params).then(res => res.data)
}


// export const getJsonData = (url, params) => {
//     return new Promise((resolve, reject) => {
//         let token = localStorage.getItem("Authorization")
//         if (params != null) {
//             axios.post(url, params, {
//                 headers: { 'Content-Type': 'application/json'}
//             }).then(res => {
//                 resolve(res.data)
//             }).catch(error => {
//                 reject(error)
//             })
//         } else {
//             axios.post(url, null, {
//                 headers: { 'Content-Type': 'application/json'}
//             }).then(res => {
//                 resolve(res.data)
//             }).catch(error => {
//                 reject(error)
//             })
//         }
//     })
// }
