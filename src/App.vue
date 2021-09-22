<template>
  <div id="app">
    <div class="roof"></div>
    <router-view />
    <van-tabbar route v-if="$route.meta.showTabBar">
      <van-tabbar-item icon="wap-home-o" to="/"> 首页 </van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o" to="/learn">
        <i slot="icon" class="iconfont icon-xuexi"></i>
        <span class="text">学习</span>
      </van-tabbar-item>
      <van-tabbar-item to="/bink">
        <i slot="icon" class="iconfont icon-icon_luntan-xian"></i>
        <span class="text">Bink</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{ $store.state.user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  watch: {},
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 95px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
