import Vue from "vue";
import App from "./App.vue";
import axios from "./plugins/axios";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
// 引入图标
import './style/iconfont.css'

// 底部标签栏
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);

// 上拉加载数据
import { List, Cell } from "vant";
Vue.use(List);
Vue.use(Cell);

// 下拉刷新
import { PullRefresh } from "vant";
Vue.use(PullRefresh);

import { NavBar } from "vant";
Vue.use(NavBar);

// 头部可滚动的标签栏
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
// 文章详情按钮
import { Button } from "vant";
Vue.use(Button);
// 文章详情分割线
import { Divider } from "vant";
Vue.use(Divider);
// 频道弹出层
import { Popup } from "vant";
Vue.use(Popup);
// 频道宫格
import { Grid, GridItem } from "vant";
Vue.use(Grid);
Vue.use(GridItem);

import { Icon } from "vant";
Vue.use(Icon);
Vue.config.productionTip = false;

// 登录页面
import { Form } from "vant";
import { Field } from "vant";
Vue.use(Form);
Vue.use(Field);

// 倒计时
import { CountDown } from "vant";
Vue.use(CountDown);

// 加载
import { Loading } from 'vant';
Vue.use(Loading);

import { Search } from 'vant';
Vue.use(Search);

import { Toast } from 'vant';
Vue.use(Toast);

// 轮博图
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);

import { Image as VanImage } from 'vant';
Vue.use(VanImage);

import { Dialog } from 'vant';
Vue.use(Dialog);

import { Picker } from 'vant';
Vue.use(Picker);

import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

import { Badge } from 'vant';
Vue.use(Badge);

// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
});

new Vue({
  router,
  store,
  axios,
  dayjs,
  render: (h) => h(App),
}).$mount("#app");
