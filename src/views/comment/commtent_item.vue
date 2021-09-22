<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="{
          liked: comment.is_liking,
        }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        @click="onCommentLike"
        >{{ comment.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ relativeTime(comment.pubdate) }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addLikeCmtAPI, delLikeCmtAPI } from "@/api/comment";

export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    relativeTime(time) {
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
    async onCommentLike() {
      this.commentLoading = true;
      try {
        if (this.comment.is_liking) {
          // 已赞，取消点赞
          await delLikeCmtAPI(this.comment.com_id);
          // this.comment.like_count--
        } else {
          // 没有点赞，添加点赞
          await addLikeCmtAPI(this.comment.com_id);
          // this.comment.like_count++
        }
        // this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast("操作失败，请重试");
      }
      this.commentLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 16px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
    line-height: 23px;
    margin: 8px 0;
  }
  .comment-pubdate {
    font-size: 13px;
    color: #222;
    margin-right: 10px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 70px;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    color: rgb(104, 98, 98);
  }
  .like-btn {
    height: 25px;
    padding: 0;
    border: none;
    font-size: 13px;
    line-height: 25px;
    margin-right: 7px;
    .van-icon {
      font-size: 15px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
