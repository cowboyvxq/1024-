
<template>
  <van-button
    :icon="value === '1' ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
    :loading="loading"
    @click="$emit('onCollect')"
  />
</template>

<script>
// import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      required: true
    },
    articleId: {
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // async onCollect () {
    //   this.loading = true
    //   try {
    //     if (this.value) {
    //       // 已收藏，取消收藏
    //       await deleteCollect(this.articleId)
    //     } else {
    //       // 没有收藏，添加收藏
    //       await addCollect(this.articleId)
    //     }

    //     // 更新视图
    //     // 自定义事件修改数据并不是立即的
    //     this.$emit('input', !this.value)

    //     this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
    //   } catch (err) {
    //     this.$toast.fail('操作失败，请重试！')
    //   }
    //   this.loading = false
    // }
  }
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
