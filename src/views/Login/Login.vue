<template>
  <div class="login">
    <!-- 登录的表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="mobileNumber"
        v-model="form.mobile"
        type="tel"
        label="手机号码"
        placeholder="请输入手机号码"
        required
        :rules="rules.mobile"
        maxlength="11"
      >
        <i slot="left-icon" class="toutian toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="form.code"
        label="手机验证码"
        placeholder="请输入验证码"
        type="number"
        required
        :rules="rules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="forum mtime"></i>
        <template #button>
          <van-count-down
            :time="1000 * 10"
            format="ss s"
            @finish="isCountDownShow = false"
            v-if="isCountDownShow"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
            round
            size="small"
            type="default"
            text="发送验证码"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendSms, login } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      form: {
        // 用户的手机号
        mobile: "",
        // 登录的密码
        code: "",
      },
      // 只有同时满足以下两个验证规则，才能验证通过
      rules: {
        // 手机号的校验规则
        mobile: [
          { required: true, message: "请填写您的手机号" },
          { pattern: /^1\d{10}$/, message: "手机号格式错误" },
        ],
        // 密码的校验规则
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            required: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      // 是否展示倒计时
      isCountDownShow: false,
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await login(user);
        console.log("登录成功", res);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败,请稍后重试");
        }
      }
    },
    // 只有当表单数据校验通过之后，才会调用此 login 函数
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate("mobileNumber");
      } catch (err) {
        return console.log("验证失败", err);
      }
      this.isCountDownShow = true;
      try {
        await sendSms(this.form.mobile);
        this.$toast("发送成功");
      } catch (err) {
        console.log(err);
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁,请稍后重试");
        } else {
          this.$toast("发送失败，请重试");
        }
      }
    },
    // TODO：调用 API 接口，发起登录的请求
  },
  watch: {},
};
</script>
<style lang="less" scoped>
</style>