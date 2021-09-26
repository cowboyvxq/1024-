<template>
  <div class="learn">
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
        <div class="content">
          <div
            class="c_item"
            @click="$router.push('/artdetail/' + item.art_id)"
            v-for="(item, index) in indexList"
            :key="index"
          >
            <div class="i_left" v-if="item.cover.images">
              <img
                class="cover"
                v-for="(item, index) in item.cover.images"
                :src="item"
                :key="index"
                v-lazy="item"
                alt=""
              />
            </div>
            <div class="i_left" v-else>
              <img
                class="cover"
                src="https://ftp.bmp.ovh/imgs/2021/09/335c2ce004186acb.jpg"
                alt=""
              />
            </div>
            <div class="i_right">
              <div class="r_title">
                {{ item.title }}
              </div>
              <div class="abstract">项目简介动力节点老师讲解的图书馆管理小项目，主要目的是让学完JavaSE的同学对之前掌握的知识做一些运用，该项目应用的知识点包括下面内容：面向对象的思想分层的思想接口异常集合日期处理Stream流IO流反射Javafx（了解）css（了解）通过学习本项目，可以巩固JavaSE的知识，对于后续的学习来说可以起到很好的衔接。环境搭建1. 基本信息开发工具：IDEAJD</div>
              <div class="user_info">
                <div class="author">作者:鸿蒙社区</div>
                <div class="add_time">{{ (index + 4) % 3 === 0 ? '6' : (index + 4) % 3 }} 小时前</div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from "@/api/home";
export default {
  components: {},
  data() {
    return {
      indexList: [],
      timestamp: Date.now(),
      loading: false,
      finished: false,
      refreshing: false,
      // 是否正在进行下拉刷新的请求
      isLoading: false,
      // 存储文章数据
      articleList: [],
      error: false,
      // userData: [],
    };
  },
  created() {
    this.getListData();
    // this.getUserData();

  },
  methods: {
    async getListData(isRefresh) {
      const { data: res } = await getArtListAPI(12, this.timestamp);
      if (res.message === "OK") {
        if (isRefresh) {
          this.timestamp = res.data.pre_timestamp;
          this.indexList = [...res.data.results, ...this.indexList];
          this.isLoading = false;
        } else {
          // 为时间戳重新赋值
          this.timestamp = res.data.pre_timestamp;
          // 1. 上拉加载更多时，应该是“旧数据”在前，“新数据”在后
          this.indexList = [...this.indexList, ...res.data.results];
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
      this.getListData();
    },
    // 下拉刷新事件
    onRefresh() {
      this.getListData(true);
      this.isLoading = false;
    },

    // getUserData() {
    //   this.axios.get("/data/p1.json").then((res) => {
    //     this.userData = res.data;
    //   });
    // },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.learn {
  padding-bottom: 30px;
  padding-right: 10px;
  .content {
    .c_item {
      display: flex;
      margin-bottom: 10px;
      .i_left {
        width: 120px;
        height: 85px;
        overflow: hidden;
        vertical-align: top;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .i_right {
        flex: 1;
        padding: 0 6px;
        box-sizing: border-box;
        .r_title {
          font-weight: bold;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          margin-bottom: 5px;
        }
        .abstract {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          width: 240px;
          font-size: 14px;
          color: #818181;
        }
        .user_info {
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          color: rgb(145, 134, 134);
          display: flex;
          justify-content: space-between;
          .author {
            width: 100px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>