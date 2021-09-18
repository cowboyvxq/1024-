<template>
  <div class="index">
    <Headings></Headings>
    <!-- 频道列表 -->
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :channelId="item.id"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <svg
          @click="showPopup"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
    </van-tabs>

    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="top"
      :style="{ height: '100%' }"
    >
      <channels-compile
        :channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></channels-compile>
    </van-popup>
  </div>
</template>

<script>
// 导入封装好的navList请求
import { getChannelApi } from "@/api/navList";
// 首页顶部组件
import Headings from "../views/Header/Headings.vue";
// 文章组件
import ArticleList from "../views/Article/ArticleList.vue";
import ChannelsCompile from "../views/Channels/ChannelsCompile.vue";
// 引入vuex
import { mapState } from "vuex";
export default {
  name: "Index",
  components: {
    Headings,
    ArticleList,
    ChannelsCompile,
  },
  data() {
    return {
      // 用户频道
      channels: [],
      active: 0,
      isChennelEditShow: false,
    };
  },
  created() {
    // 用户频道列表
    this.loadChannels();
  },
  computed: {
    ...mapState(["show"]),
  },
  methods: {
    // 获取用户频道列表数据
    async loadChannels() {
      const { data: res } = await getChannelApi();
      this.channels = res.data.channels;
    },

    onUpdateActive(index, isChennelEditShow = true) {
      // 更新激活的频道项
      this.active = index;

      // 关闭编辑频道弹层
      this.isChennelEditShow = isChennelEditShow;
    },

    showPopup() {
      this.isChennelEditShow = true;
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.index {
  padding-top: 50px;
  /deep/ .channel-tabs {
    // 最右侧占位符
    .placeholder {
      width: 40px;
      height: 44px;
      flex-shrink: 0;
    }
    .van-tab {
      border-right: solid #edeff3 1px;
      font-size: 18px;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 36px !important;
      height: 4px;
      background-color: #3296fa;
    }
    .hamburger-btn {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      position: fixed;
      right: 0;
    }
  }
}
</style>
