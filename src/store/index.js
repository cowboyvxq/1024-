import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from '@/utils/stroage'

Vue.use(Vuex);
const TOKEN_KEY = 'APES_USER'
export default new Vuex.Store({
  state: {
    active: 0,
    show: false,
    tab_type: {
      ask: "问答",
      share: "分享",
      job: "招聘",
      good: "精华",
    },
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getItem(TOKEN_KEY),
    kw:''
  },
  getters: {
  // 用户头像的计算属性
  userAvatar(state) {
    // 默认的头像地址
    let imgSrc = 'http://www.liulongbin.top:8000/uploads/1632412808158.blob'

    // 如果用户信息对象中包含 photo 属性的值，则为 imgSrc 重新赋值
    // if (state.user.photo) {
    //   imgSrc = state.user.photo
    // }

    return imgSrc
  }
},
  mutations: {
     setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {},
});
