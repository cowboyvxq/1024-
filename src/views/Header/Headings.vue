<template>
  <div class="top">
    <div class="headings">
      <div class="logo"><span>1</span><span>024</span></div>
      <div class="search-box">
        <div class="search">
          <div class="content" @click="$router.push({ path: '/search' })">
            <div class="s_input">
              <!-- 纵向轮播数据 -->
              <van-swipe style="height: 200px" :autoplay="3000" vertical>
                <van-swipe-item>人工智能教程</van-swipe-item>
                <van-swipe-item>前端性能优化</van-swipe-item>
                <van-swipe-item>java后端</van-swipe-item>
                <van-swipe-item>python实现进度条的6种方式</van-swipe-item>
                <van-swipe-item>c语言经典例题100道</van-swipe-item>
                <van-swipe-item>超详细node教程</van-swipe-item>
                <van-swipe-item>c++的第一个hello world程序</van-swipe-item>
                <van-swipe-item>javaScript性能优化</van-swipe-item>
                <van-swipe-item>mysql原来很简单</van-swipe-item>
              </van-swipe>
            </div>
            <div class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="#fff"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="login">登录</div>
    </div>
  </div>
</template>

<script>
// import Search from "./Search.vue";
export default {
  components: {
    // Search,
  },
  data() {
    return {};
  },
  // mounted() {
  //   let canvas = this.$refs.logo;
  //   let logo = canvas.getContext("2d");
  //   logo.font = "30px Arial";
  //   let grd = logo.createLinearGradient(0, 0, canvas.width, 0); //渐变
  //   grd.addColorStop("0", "magenta");
  //   grd.addColorStop("0.3", "#fc5531");
  //   grd.addColorStop("0.6", "#fd775a");
  //   grd.addColorStop("1.0", "red");
  //   logo.fillStyle = grd; //使用渐变填充
  //   logo.textAlign = "center";
  //   logo.textBaseline = "middle";
  //   logo.strokeStyle = grd;
  //   logo.strokeText("猿", 20, 20, 35);
  // },
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  .headings {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #007bff;
    .logo {
      padding: 0 10px;
      font-family: Arial, Helvetica, sans-serif;
      span {
        font-size: 23px;
        font-weight: 600;
        
        text-shadow: 0 1px 1px rgb(70, 8, 112);
        // 发光文字
        text-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
        color: #f7eeee;
        &:first-child {
          color: #fa9d86;
        }
      }
    }
    .login {
      width: 55px;
      text-align: center;
      color: #fff;
      font-weight: 800;
    }
    .search-box {
      flex: 1;
      .search {
        .content {
          display: flex;
          align-items: center;
          // border: solid #f04b26 1px;
          border-radius: 5px;
          .s_input {
            height: 30px;
            flex: 1;
            line-height: 30px;
            border-radius: 5px 0 0 5px;
            border: none;
            background-color: #f1f1f1;
            overflow: hidden;
            padding-left: 20px;
            color: rgb(163, 157, 157);
          }
          .btn {
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            padding-top: 5px;
            box-sizing: border-box;
            border-radius: 0 5px 5px 0;
            background-color: #fc5531;
          }
        }
      }
    }
  }
}
</style>
