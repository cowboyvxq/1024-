<template>
  <!--
    只有 List 在可视范围内才会检查滚动位置触发 onLoad
   -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    @load="initCmtList"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getCmtListAPI } from '@/api/comment'
import CommentItem from '../comment/commtent_item.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    artId: {
      type: [Number, String, Object],
      required: true
    },
    // list: {
    //   type: Array,
    //   default: () => []
    // },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false,
    }
  },
  computed: {},
  watch: {},
  created () {
    // 当你手动初始 onLoad 的话，它不会自动开始初始的 loading
    // 所以我们要手动的开启初始 loading
    this.loading = true
    this.initCmtList()
  },
  mounted () {},
  methods: {
    // 初始化评论列表的数据
async initCmtList() {
  // 调用 API 接口
  const { data: res } = await getCmtListAPI(this.artId, this.offset)
  if (res.message === 'OK') {
    // 为偏移量赋值
    this.offset = res.data.last_id

    // 1. 数据拼接：“旧数据”在前，“新数据”在后
    this.list = [...this.list, ...res.data.results]
    // 2. 将 loading 重置为 false
    this.loading = false

    // 3. 判断所有数据是否加载完毕
    if (res.data.results.length === 0) {
      this.finished = true
    }
  }
},
  }
}
</script>

<style scoped lang="less"></style>
