import axios from 'axios';
import { authHeader } from './helpers/helpers'

export const instance = axios.create({
    // baseURL: 'http://localhost:3000/',
    baseURL:'https://wh-node.herokuapp.com/',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
    responseType: 'json'
})
// /*
//  * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
//  */
// instance.interceptors.response.use(
//     (config) => {
//         let user = JSON.parse(localStorage.getItem('user'))

//         if (user && user.token) {
//           config.headers['Authorization'] = `Bearer ${ user.token }`
//         }
//         console.log('config', config)
//         return config
//       },

//       (error) => {
//         return Promise.reject(error)
//       }
// );

export const get = (url) => {
    return instance.get(url, { headers: { ...authHeader() } })
}

export const post = (url, data) => {
    return instance.post(url, data, { headers: { ...authHeader() } })
}

export const update = (url, data) => {
    return instance.put(url, data, { headers: { ...authHeader() } })
}

export const remove = (url) => {
    return instance.delete(url, { headers: { ...authHeader() } })
}
