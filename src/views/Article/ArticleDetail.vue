<template>
  <div class="detail">
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 加载中的状态 -->
    <div class="loading-wrap" v-if="loading">
      <van-loading color="#3296fa" vertical> 加载中 </van-loading>
    </div>

    <!-- 文章信息区域 -->
    <div class="article-container" v-else-if="artdetails.title">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artdetails.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artdetails.aut_name" :label="artdetails.pubdate">
        <template #icon>
          <!-- 头像 -->
          <img :src="artdetails.aut_photo" alt="" class="avatar" />
        </template>

        <FllowArticle
          class="follow-btn"
          v-model="artdetails.is_followed"
          :user-id="artdetails.aut_id"
        />
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div
        class="art-content"
        ref="art-content"
        v-html="artdetails.content"
      ></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="liking === '1'"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else
          >点赞</van-button
        >
      </div>
    </div>

    <div v-else-if="errStatus === 404" class="error-wrap">
      <van-icon name="failure"></van-icon>
      <p class="text">该资源不存在或已删除</p>
    </div>
    <div class="errr-wrap" v-else>
      <van-icon name="failure"></van-icon>
      <p class="text">内容加载失败</p>
      <van-button class="retry-btn">点击重试</van-button>
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <!-- 发布评论对话框 -->
      <!-- 发布评论 -->
      <van-popup v-model="isPostShow" position="bottom">
        <comment-post
          :target="artdetails.art_id"
          @post-success="onPostSuccess"
        />
      </van-popup>
      <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
        <comment-reply
          v-if="isReplyShow"
          :comment="currentComment"
          @close="isReplyShow = false"
        />
      </van-popup>
    </van-popup>
    <!-- 文章底部固定内容 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <!-- 渲染评论的数量 -->
      <van-badge :content="totalCommentCount" :max="99">
        <van-icon name="comment-o" @click="scrollToBottom" size="25" />
      </van-badge>
      <collect-article
        class="btn-item"
        v-model="collected"
        :article-id="artdetails.art_id"
        @onCollect="onCollect"
      />
      <likes-article
        class="btn-item"
        v-model="liking"
        :article-id="artdetails.art_id"
        @onLikes="onLikes"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 文章评论 -->
    <ArtCmt
      class="art_cmt"
      :art-id="articleId"
      @reply-click="onReplyClick"
      @onload-success="totalCommentCount = $event.total_count"
    ></ArtCmt>
  </div>
</template>

<script>
import { getArticleDetailAPI } from "@/api/detail";
import ArtCmt from "../Article/ArtCmt.vue";
// import CommentIssue from "../comment/comment_issue.vue";
import CollectArticle from "../Article/CollectArticle.vue";
import LikesArticle from "../Article/LikesArticle.vue";
import FllowArticle from "./FllowArticle.vue";
import CommentPost from "../comment/comment_post.vue";
import CommentReply from "../comment/comment_reply.vue";
import { ImagePreview } from "vant";
export default {
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  // 给所有的后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  components: {
    ArtCmt,
    CollectArticle,
    LikesArticle,
    FllowArticle,
    CommentPost,
    CommentReply,
  },
  data() {
    return {
      // 用于存储文章详情数据
      artdetails: {},
      loading: true,
      errStatus: 0,
      totalCommentCount: 0, //评论数量
      currentComment: {}, // 当前点击回复的评论项
      isPostShow: false, // 控制发布评论的显示状态
      isReplyShow: false,
      collected: "1",
      liking: "1",
    };
  },
  created() {
    this.initArticle();
    let collected = localStorage.getItem("collected");
    this.collected = collected;

    let likes = localStorage.getItem("artlikes");
    this.liking = likes;
    console.log(typeof collected);
  },
  methods: {
    //   初始化文章的数据
    async initArticle() {
      try {
        const { data: res } = await getArticleDetailAPI(this.articleId);
        if (res.message === "OK") {
          this.artdetails = res.data;
          console.log(res);
          this.totalCommentCount = res.data.comm_count;
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
      }
      this.loading = false;
      setTimeout(() => {
        this.previewImage();
      }, 0);
    },
    // 图片放大预览
    previewImage() {
      const articleContent = this.$refs["art-content"];
      const imgs = articleContent.querySelectorAll("img");
      console.log(imgs);
      const images = [];
      imgs.forEach((img, index) => {
        images.push(imgs.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPositon: index,
          });
        };
      });
    },
    // 文章点赞
    onLikes() {
      // console.log(this.value);
      if (this.liking === "1") {
        this.liking = "-1";
        this.$toast.success("取消点赞");
        localStorage.setItem("artlikes", JSON.parse(this.liking));
      } else {
        this.liking = "1";
        this.$toast.success("点赞成功");
        localStorage.setItem("artlikes", JSON.parse(this.liking));
      }
    },
    // 收藏文章
    onCollect() {
      if (this.collected === "1") {
        this.collected = "-1";
        this.$toast.success("取消收藏");
        localStorage.setItem("collected", JSON.parse(this.collected));
      } else {
        this.collected = "1";
        this.$toast.success("收藏成功");
        localStorage.setItem("collected", JSON.parse(this.collected));
      }
      console.log(this.collected);
    },
    onReplyClick(comment) {
      this.currentComment = comment;

      // 显示评论回复弹出层
      this.isReplyShow = true;
    },
    onPostSuccess(data) {
      // 关闭弹出层
      this.isPostShow = false;
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj);
    },
    // 滚动到页面底部
    scrollToBottom() {
      const gocomment = document.querySelector(".art_cmt");

      // 3. 滚动元素的父容器，使被调用 scrollIntoView() 的元素对用户可见
      gocomment.scrollIntoView({
        behavior: "smooth",
        // 定义垂直方向的对齐（end 表示元素的底端将和其所在滚动区的可视区域的底端对齐）
        block: "start",
      });
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.detail {
  width: 100vw;
  padding-top: 50px;
  height: 100vh;
  /deep/ .error-wrap {
    text-align: center;
    font-size: 25px;
    color: rgb(173, 152, 152);
    .van-icon-failure {
      width: 100%;
      height: 160px;
      line-height: 200px;
      font-size: 90px;
      text-align: center;
      color: rgb(150, 146, 146);
    }
  }
  /deep/ .van-nav-bar {
    background-color: #739df7;
    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-nav-bar__arrow {
          color: #fff;
          font-size: 22px;
        }
      }
      .van-nav-bar__title {
        color: #fff;
      }
    }
  }
  .article-container {
    padding: 10px;
    .art-title {
      font-size: 16px;
      font-weight: bold;
      margin: 10px 0;
    }

    .art-content {
      font-size: 12px;
      line-height: 24px;
      width: 100%;
      overflow-x: scroll;
      word-break: break-all;
    }

    .van-cell {
      padding: 5px 0;
      &::after {
        display: none;
      }
    }

    .avatar {
      width: 55px;
      height: 53px;
      border-radius: 50%;
      background-color: #f8f8f8;
      margin-right: 5px;
      border: none;
    }

    .like-box {
      display: flex;
      justify-content: center;
    }

    /deep/ pre {
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
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 45px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    z-index: 10;
    .comment-btn {
      width: 185px;
      height: 30px;
      border: 2px solid #eeeeee;
      font-size: 18px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-badge__wrapper {
      line-height: 0px;
    }
    /deep/ .van-icon {
      font-size: 30px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>