<template>
  <div id="app">
    <div class="roof"></div>
    <router-view />
    <van-tabbar route v-if="$route.meta.showTabBar">
      <van-tabbar-item icon="wap-home-o" to="/"> 首页 </van-tabbar-item>
      <van-tabbar-item to="/learn">
        <!-- <i slot="icon" class="iconfont icon-xuexi"></i> -->
        <img class="learn_icon" src="./assets/学习.png" alt="" />
        <div class="text">学习</div>
      </van-tabbar-item>
      <van-tabbar-item to="/bink">
        <img class="bink_icon" src="./assets/icon_论坛-线.png" alt="" />
        <div class="text">Bink</div>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">
        <div class="text">{{ $store.state.user ? "我的" : "未登录" }}</div>
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
.learn_icon,
.bink_icon {
  width: 22px;
  height: 22px;
}

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
