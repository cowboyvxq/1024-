<template>
  <div class="article" @click="$router.push('/artdetail/' + artid)">
    <van-cell>
      <template #title>
        <!-- 标题区域的插槽 -->
        <div class="art-title">
          <span>{{ title }}</span>
          <!-- 单张图片 -->
          <img :src="cover.images[0]" alt="" v-if="cover.type === 1" v-lazy="cover.images[0]"/>
        </div>
        <!-- 三张图片下的封面 -->
        <div class="thumb-box" v-if="cover.type === 3">
          <img
            :src="item"
            v-for="(item, index) in cover.images"
            :key="index"
            v-lazy="item"
          />
        </div>
      </template>
      <!-- label区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>
            作者 &nbsp;&nbsp;{{ author }}&nbsp;&nbsp;{{
              cmtCount
            }}
            评论&nbsp;&nbsp;发布日期{{ time }}
          </span>
          <!-- 关闭按钮 -->
          <!-- <van-icon name="cross"></van-icon> -->
        </div>
      </template>
    </van-cell>
  </div>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    cmtCount: {
      type: [Number, String],
      default: 0,
    },
    time: {
      type: String,
      default: "",
    },
    cover: {
      type: Object,
    },
    artid: {
      type: String,
    },
    // 是否展示关闭按钮
    closable: {
      type: Boolean,
      // 默认值为 true，表示展示关闭按钮
      default: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.article {
  img {
    width: 113px;
    height: 70px;
  }
  .art-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .thumb-box {
    // 矩形黄金比例：0.618
    display: flex;
    justify-content: space-between;
  }
  .label-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>