<template>
  <div class="compile">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">
        我的频道
        <span class="t_tips">{{ isEdit ? "点击编辑频道" : "点击进入频道" }}</span>
        </div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        v-for="(channel, index) in channels"
        :key="index"
        class="grid-item"
        :text="channel.name"
        @click="onMyChannel(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">
        频道推荐
        <span class="t_tips">点击添加频道</span>
        </div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        v-for="item in moreChannels"
        :key="item.id"
        :text="item.name"
        class="grid-item"
        @click="addChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannelAPI,
  deleteUserChannel,
  addUserChannel,
} from "@/api/navList";
import { mapState } from "vuex";
import { setItem } from "@/utils/stroage";
// 引入vuex
export default {
  props: {
    channels: Array,
    active: {
      type: Number,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      // 所有的频道列表数据
      allChannel: [],
      // 是否处于编辑状态
      isEdit: false,
      // 固定不可编辑的频道
      fiexdChannels: [0, 1, 2],
    };
  },
  created() {
    // 请求所有的频道列表数据
    this.initAllChannel();
  },
  computed: {
    ...mapState(["user"]),
    // 更多频道的数据
    moreChannels() {
      // 1. 对数组进行 filter 过滤，返回的是符合条件的新数组
      return this.allChannel.filter((item) => {
        // 判断当前循环项，是否在 “我的频道” 列表之中
        const index = this.channels.findIndex((x) => x.id === item.id);
        // 如果不在，则 return true，表示需要把这一项存储到返回的新数组之中
        if (index === -1) return true;
      });
    },
  },
  methods: {
    // 获取所有频道的列表数据
    async initAllChannel() {
      const { data: res } = await getAllChannelAPI();
      if (res.message === "OK") {
        // 将请求到的数据，转存到 allChannel 中
        this.allChannel = res.data.channels;
      }
    },

    onMyChannel(channel, index) {
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return;
        }

        // 2. 删除频道项
        this.channels.splice(index, 1);

        // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
        // 参数1：要删除的元素的开始索引（包括）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        if (index <= this.active) {
          // 让激活频道的索引 - 1
          this.$emit("update-active", this.active - 1, true);
        }

        // 4. 处理持久化,进行本地存储
        this.deleteChannel(channel);
      } else {
        // 非编辑状态，执行切换频道
        this.$emit("update-active", index, false);
      }
    },

    async addChannel(item) {
      // 将用户点击的频道，添加到“用户频道”列表中
      this.channels.push(item);

      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: item.id, // 频道ID
            seq: this.channels.length, // 序号
          });
        } catch (err) {
          this.$toast("保存失败，请稍后重试");
        }
      } else {
        // 未登录，把数据存储到本地
        setItem("APES_CHANNELS", this.channels);
      }
    },

    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id);
        } else {
          // 未登录，将数据更新到本地
          setItem("APES_CHANNELS", this.channels);
        }
      } catch (err) {
        this.$toast("操作失败，请稍后重试");
      }
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.compile {
  margin-top: 40px;
 /deep/ .title-text {
    .t_tips {
      font-size: 13px;
      color: #757373;
    }
  } 
  .edit-btn {
    width: 60px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #f85959;
    border: 1px solid #757373;
    margin-bottom: 5px;
  }

  /deep/ .grid-item {
    height: 40px;
    width: 90px;
    // overflow: hidden;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 13px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
        font-weight: 500;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 16px;
        color: #f70f0f;
        z-index: 4;
      }
    }
  }

  /deep/ .van-grid-item__text {
    font-size: 16px;
    margin-right: 6px;
  }

  /deep/ .recommend-grid {
    overflow: hidden;
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        font-size: 20px;
        .van-icon-plus {
          font-size: 17px;
          color: rgb(139, 151, 144);
        }
      }
    }
  }
}
</style>