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

export default instance