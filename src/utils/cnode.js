import axios from "axios";

// 调用 axios.create() 方法，创建 axios 的实例对象
const cnode = axios.create({
  // 请求根路径
  baseURL: "https://cnodejs.org/api/v1",

  // transformResponse: [
  //   function (data) {
  //     try {
  //       return JSONBig.parse(data);
  //     } catch (err) {
  //       return data;
  //     }
  //   },
  // ],
});

export default cnode;
