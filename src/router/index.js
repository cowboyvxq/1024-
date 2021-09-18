import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../components/Index.vue";
import Learn from "../components/Learn.vue";
import User from "../components/User.vue";
import Bink from "../components/Bink.vue";
// 文章详情组件
import ArticleDetail from "../views/Article/ArticleDetail.vue";

import Serum from "../views/Bink/Serum.vue";
// 登录组件
// import Login from "../views/Login/Login.vue";

import Search from "../views/Header/Search.vue";

import SearchResult from "../components/SearchResult.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    meta: { showTabBar: true },
  },
  {
    path: "/learn",
    name: "learn",
    component: Learn,
    meta: { showTabBar: true },
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/bink",
    name: "bink",
    component: Bink,
    meta: { showTabBar: true },
  },
  {
    path: "/artdetail/:articleId",
    name: "artdetail",
    component: ArticleDetail,
    props: true,
  },
  {
    path: "/serum/:id",
    name: "serum",
    component: Serum,
  },
  // 登录页面
  // {
  //   path: "/login",
  //   name: "login",
  //   component: Login,
  //   meta: { showTabBar: true },
  // },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: { showSearch: true },
  },
  {
    path: "/search/:kw",
    component: SearchResult,
    name: "search-result",
    props: true,
    meta: { showSearch: true },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
