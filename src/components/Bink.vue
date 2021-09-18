<template>
  <div class="bink">
    <!-- <keep-alive> -->
    <nav class="navbar">
      <router-link
        :class="{ active: cs('good') }"
        :to="{ path: '/bink', query: { tab: 'good' } }"
        >精华</router-link
      >
      <router-link
        :class="{ active: cs('share') }"
        :to="{ path: '/bink', query: { tab: 'share' } }"
        >分享</router-link
      >
      <router-link
        :class="{ active: cs('ask') }"
        :to="{ path: '/bink', query: { tab: 'ask' } }"
        >问答</router-link
      >
      <router-link
        :class="{ active: cs('job') }"
        :to="{ path: '/bink', query: { tab: 'job' } }"
        >招聘</router-link
      >
    </nav>
    <section class="content">
      <!-- 上拉加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="loadMore"
        error-text="请求失败,点击重新加载"
      >
        <section class="main">
          <section class="every" v-for="item in titleList" :key="item.id">
            <router-link :to="`/serum/${item.id}`">
              <p class="cont-title">
                <span class="tips-btn">{{
                  item.top ? "置顶" : type[item.tab]
                }}</span>
                {{ item.title }}
              </p>
              <p class="author">
                <img class="avatar" :src="item.author.avatar_url" alt="" />
                <span class="loginname">{{ item.author.loginname }}</span>
                <span class="visit_count"
                  >{{
                    item.visit_count > 0 ? item.visit_count : "0"
                  }}次阅读</span
                >

                <span class="issue"
                  >发布于&nbsp;{{ shear(item.last_reply_at) }}</span
                >
              </p>
            </router-link>
          </section>
        </section>
      </van-list>
    </section>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      titleList: [],
      page: 1,
      loading: false,
      firstLoading: true,
      topStatus: "",
      finished: false,
    };
  },
  computed: {
    type() {
      return this.$store.state.tab_type;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init(fn) {
      this.page = 1;
      this.titleList = [];
      this.fetchData(() => {
        this.firstLoading = false;
        fn && fn();
      });
    },

    // 发布日期
    shear(time) {
      time = (Date.now() - new Date(time).getTime()) / 1000;
      if (time < 3600) {
        return ~~(time / 60) + "分钟前";
      } else if (time < 86400) {
        return ~~(time / 3600) + "小时前";
      } else if (time < 2592000) {
        return ~~(time / 86400) + "天前";
      } else if (time < 31104000) {
        return ~~(time / 2592000) + "个月前";
      } else {
        return ~~(time / 31104000) + "年前";
      }
    },
    fetchData(fn) {
      this.axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.page++,
            tab: this.$route.query.tab,
            limit: 30,
          },
        })
        .then((res) => {
          this.titleList = [...this.titleList, ...res.data.data];
          fn && fn();
          // console.log(this.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cs(tabName) {
      return this.$route.query.tab == tabName;
    },

    loadMore() {
      if (!this.firstLoading) {
        this.loading = true;
        this.fetchData(() => {
          this.loading = false;
        });
      }
    },
  },
  watch: {
    $route: function () {
      this.firstLoading = true;
      this.init();
    },
  },
};
</script>
<style lang="less" scoped>
.bink {
  padding: 50px 0 10px;
  .navbar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 18px;
    background-color: #fff;
    padding-left: 10px;
    box-shadow: 1px 0 4px rgb(229, 226, 226);
    a {
      margin-right: 10px;
      color: rgb(177, 174, 174);
      // font-weight: 600;
      &.active {
        color: rgb(42, 47, 49);
        font-weight: 600;
        box-shadow: 3px 3px 6px #f0f0f0;
      }
    }
  }
  .content {
    width: 100%;
    box-sizing: border-box;
    .main {
      .every {
        padding: 0 15px;
        border-bottom: solid #d8d8d8 1px;
        .cont-title {
          font-size: 18px;
          font-weight: 600;
          color: #2f2f2f;
          word-break: break-all;
          outline: none;
          line-height: 24px;
          .tips-btn {
            font-size: 14px !important;
            padding: 3px 5px;
            color: rgb(248, 246, 247);
            background-color: #f581c8;
          }
        }
        .author {
          display: flex;
          align-items: center;
          margin-top: -10px;
          .loginname {
            width: 70px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: #5a5558;
            font-weight: 600;
            font-size: 16px;
          }
          .avatar {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
          span {
            font-size: 14px;
            color: rgb(85, 83, 83);
          }
          .visit_count {
            margin-left: 5px;
          }
          .issue {
            // display: inline-block;
            color: #8e7a7a;
            margin-left: 30px;
            white-space: nowrap;
            font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          }
        }
      }
    }
  }
}
</style>