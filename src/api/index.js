import axios from 'axios'
import qs from 'qs'
var baseURL = 'http://imis.biaodaa.com/'
// var baseURL = 'http://192.168.1.131:8081/'

axios.defaults.baseURL = baseURL


export const queryList = params => {
  return axios.post('authorize/user', params).then(res => res.data)
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
