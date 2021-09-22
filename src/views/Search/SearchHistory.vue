<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span class="all_del" @click="$emit('clear-search-histories')"
          >全部删除</span
        >
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
      class="h_list"
    >
      <van-icon v-show="isDeleteShow" name="cross" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false, // 控制删除显示状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录数据
        this.searchHistories.splice(index, 1);
      } else {
        // 非删除状态，直接进入搜索
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
.search-history {
  /deep/ .h_list {
    background-color: rgb(247, 243, 243);
    border-bottom: solid #fff 1px;
    .van-cell__title {
      font-size: 17px;
      flex: 5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .van-cell__value {
      // display: none;
      flex: 1;
      color: red;
    }
  }
  .all_del {
    color: red;
  }
}
</style>
