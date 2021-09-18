<template>
  <div class="art-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="finished"
      success-text="刷新成功"
    >
      <!-- 上拉加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败,点击重新加载"
      >
        <!-- 文章组件 -->
        <ArticleInfo
          v-for="(item, index) in artlist"
          :key="index"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
          :artid="item.art_id"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需导入 API 接口
// import { getArtListAPI } from "@/api/home";
import ArticleInfo from "./ArticleInfo.vue";
// 按需导入封装好的API接口
import { getArtListAPI } from "@/api/home";

export default {
  props: {
    // 频道 Id（小驼峰命名法：第一个单词全部小写，后面的单词首字母大写）
    channelId: {
      type: Number, // 数值类型
      required: true, // 必填项
    },
  },
  components: {
    ArticleInfo,
  },
  data() {
    return {
      // 文章列表的数组
      artlist: [],
      // 时间戳。初始的默认值为当前的时间戳
      timestamp: Date.now(),
      loading: false,
      finished: false,
      refreshing: false,
      // 是否正在进行下拉刷新的请求
      isLoading: false,
      // 存储文章数据
      articleList: [],
      error: false,
    };
  },
  created() {
    // 在组件创建的时候，请求文章的列表数据
    this.initArtList();
    // 文章列表
    // this.initArticleList();
  },
  methods: {
    // 初始化文章的列表数据
    async initArtList(isRefresh) {
      // 请求 API 接口
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp);
      if (res.message === "OK") {
        if (isRefresh) {
          this.timestamp = res.data.pre_timestamp;
          this.artlist = [...res.data.results, ...this.artlist];
          this.isLoading = false;
        } else {
          // 为时间戳重新赋值
          this.timestamp = res.data.pre_timestamp;
          // 1. 上拉加载更多时，应该是“旧数据”在前，“新数据”在后
          this.artlist = [...this.artlist, ...res.data.results];
          // 2. 重置 loading 为 false
          this.loading = false;
        }
        // 3. 判断所有的数据是否已加载完毕
        if (res.data.pre_timestamp === null) {
          this.finished = true;
        }
      }
    },
    // 上拉触底，请求下一页数据
    onLoad() {
      this.initArtList();
    },
    // 下拉刷新事件
    onRefresh() {
      this.initArtList(true);
      this.isLoading = false;
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
</style>