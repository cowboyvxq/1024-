// 导入axios请求文件
import axios from 'axios'
// 导入jsonbig文件处理后端返回的数据中的大数字问题
import JSONBig from 'json-bigint'


// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  baseURL: 'http://www.liulongbin.top:8000',
  // baseURL: 'https://www.escook.cn',
  // 自定义后端返回的原始数据
  // data:后端返回的原始数据，就是json格式的字符串
  transformResponse:[function(data) {
    try{
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 请求拦截器
// Add a request interceptor
// instance.interceptors.request.use(
//   function(config) {
//     // 请求发起会经过这里
//     // config：本次请求的请求配置对象
//     const { user } = store.state;
//     if (user && user.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }

//     // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
//     return config;
//   },
//   function(error) {
//     // 如果请求出错了（还没有发出去）会进入这里
//     return Promise.reject(error);
//   }
// );


export default instance