<template>
  <div class="discuss">
    <p class="com_title">热门评论</p>
    <div class="comments-box">
      <div
        class="com_content"
        v-for="(item, index) in comments.replies"
        :key="item.id"
      >
        <div class="user_info">
          <div class="left">
            <img class="avatar" :src="item.author.avatar_url" alt="" />
            <span class="login_name">{{ item.author.loginname }}</span>
            <span class="floor"
              >{{ index + 1 }}楼•{{ formatDate(item.create_at) }}</span
            >
          </div>
          <div class="right">
            <i class="iconfont icon-dianzan_active-copy-copy-copy"></i>
          </div>
        </div>
        <div class="remark" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: {},
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    getComment() {
      this.axios
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then((res) => {
          this.comments = res.data.data;
          console.log(this.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(time) {
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
  },
};
</script>

<style lang='less'>
.discuss {
  .com_title {
    height: 35px;
    line-height: 35px;
    color: #8e8e8e;
    padding-left: 10px;
    background-color: #fafafa;
  }
  .comments-box {
    .com_content {
      padding: 0 15px;
      border-bottom: solid #f6f6f6 1px;
      margin-bottom: 10px;
      .user_info {
        display: flex;
        justify-content: space-around;
        .left {
          display: flex;
          align-items: center;
          width: 80vw;
          .avatar {
            width: 35px;
            height: 35px;
          }
          .login_name {
            font-size: 18px;
            color: #666;
            margin: 0 10px 0 5px;
          }
          .floor {
            color: #5d8ef7;
            font-size: 14px;
          }
        }
      }
      .remark {
        font-size: 14px;
        color: #333333;
        .markdown-text {
          p {
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .no_data {
    font-size: 20px;
    color: rgb(168, 165, 165);
    text-align: center;
  }
}
</style>