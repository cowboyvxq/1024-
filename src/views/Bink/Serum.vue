<template>
  <div class="serum">
    <van-nav-bar
      title="内容详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <div class="content">
      <p class="serum-title">
        {{ serumitem.title }}
        <span class="original" v-if="serumitem.visit_count > 2000">原创</span>
      </p>
      <div class="issue-date">
        <span>{{ serumitem.last_reply_at }}</span>
        <!-- <span class="timer">{{ serumitem.last_reply_at }}</span> -->
      </div>
      <div class="user">
        <div class="user-info">
          <img
            src="https://avatars.githubusercontent.com/u/958063?v=4&s=120"
            alt=""
          />
          <div class="login-info">
            <div>梦想像笔檫</div>
            <div>码龄{{ CodeAge(serumitem.create_at) }}</div>
          </div>
        </div>
        <div class="attention">
          <van-icon name="plus" />
          <span>关注</span>
        </div>
      </div>
      <div class="main-point" v-html="serumitem.content"></div>
      <!-- 文章内容 -->
      <div class="art_content">
        <p v-for="item in serumitem" :key="item.id" v-html="item.content"></p>
      </div>
      <!-- 评论区 -->
    </div>
    <Discuss></Discuss>
  </div>
</template>

<script>
import Discuss from "../Bink/Discuss.vue";
// import { ImagePreview } from "vant";
export default {
  components: {
    Discuss,
  },
  data() {
    return {
      serumitem: {},
      loading: false,
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then((res) => {
          this.serumitem = res.data.data;
          console.log(this.serumitem.author.avatar_url);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    CodeAge(time) {
      time = (Date.now() - new Date(time).getTime()) / 1000;
      if (time < 3600) {
        return ~~(time / 60) + "分钟";
      } else if (time < 86400) {
        return ~~(time / 3600) + "小时";
      } else if (time < 2592000) {
        return ~~(time / 86400) + "天";
      } else if (time < 31104000) {
        return ~~(time / 2592000) + "个月";
      } else {
        return ~~(time / 31104000) + "年";
      }
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.serum {
  padding-top: 50px;
  overflow: hidden;
  box-sizing: border-box;
  /deep/ .content {
    padding: 10px 14px;
    .main-point {
      .markdown-text {
        p {
          img {
            width: calc(100vw - 28px);
          }
        }
        pre {
          border: 1px solid #d1d1d1;
          background-color: #f1f1f1;
          line-height: 190%;
          margin: 0 0 1.75em;
          max-width: 100%;
          overflow: auto;
          padding: 15px;
          white-space: pre;
          white-space: pre-wrap;
          word-wrap: break-word;
          code {
            // background: #f1f1f1;
            color: rgb(24, 21, 21);
            margin: 0 2px;
            padding: 2px 4px;
            border-radius: 2px;
            font-size: 14px;
          }
        }
      }
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0 30px;
      .user-info {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .login-info {
          div {
            line-height: 24px;
            color: #555666;
            font-size: 13px;
          }
        }
      }
      .attention {
        display: flex;
        align-items: center;
        padding: 3px 13px;
        border-radius: 20px;
        color: #fff;
        justify-content: center;
        background-color: #409ff8;
      }
    }
    .serum-title {
      font-size: 22px;
      font-weight: 800;
      .original {
        background: #fc5531;
        padding: 4px 5px;
        border-radius: 3px 3px 14px 3px;
        color: #fff;
        font-weight: 500;
        font-size: 13px;
      }
    }
    .issue-date {
      margin-top: -5px !important;
      .timer {
        margin-left: 10px;
      }
    }

    .main-point {
      .markdown-text {
        p {
          word-break: break-all;
        }
      }
    }
  }

  /deep/ .van-nav-bar {
    background-color: #739df7;
    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-nav-bar__arrow {
          color: #fff;
          font-size: 22px;
          .van-nav-bar__text {
            color: #fff !important;
          }
        }
      }
      .van-nav-bar__title {
        color: #fff;
      }
    }
  }
}
</style>