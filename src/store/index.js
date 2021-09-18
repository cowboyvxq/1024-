import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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
    user: null,
    kw:''
    // accesstoken: accesstoken,
  },
  mutations: {},
  actions: {},
  modules: {},
});
