<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell v-for='item in list' :key="item.art_id">
      <template #title>
        <!-- 标题区域的插槽 -->
        <div class="art-title">
          <span>{{ item.title }}</span>
          <!-- 单张图片 -->
          <img :src="item.cover.images[0]" alt="" v-if="item.cover.type === 1" />
        </div>
        <!-- 三张图片下的封面 -->
        <div class="thumb-box" v-if="item.cover.type === 3">
          <img
            :src="item"
            alt=""
            v-for="(item, index) in item.cover.images"
            :key="index"
          />
        </div>
      </template>
      <!-- label区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>
            作者 &nbsp;&nbsp;{{ item.author }}&nbsp;&nbsp;{{
              item.cmtCount
            }}
            评论&nbsp;&nbsp;发布日期{{ item.pubdate }}
          </span>
          <!-- 关闭按钮 -->
          <!-- <van-icon name="cross"></van-icon> -->
        </div>
      </template>
    </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 查询关键词
        })

        // 2. 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        console.log(results);

        // 3. 将本次加载中的 loading 关闭
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true

        // 加载失败了 loading 也要关闭
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
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
