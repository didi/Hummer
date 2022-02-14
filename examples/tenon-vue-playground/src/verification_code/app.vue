<template>
  <view class="page">
    <text class="titleView">获取验证码</text>
    <text class="descView1">验证码已发送到您手机</text>
    <text class="descView2">+86 15888888888</text>
    <VerifyCodeView></VerifyCodeView>
  </view>
</template>
<script>
import CommonPage from "../component/CommonPage.vue";
import VerifyCodeView from '../component/VerifyCodeView.vue'
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
    VerifyCodeView
  },
  data() {
    return {};
  },
  methods: {
    menuClick() {
      Toast.show("menu click");
    },
    backClick() {
      Navigator.popPage();
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  margin-top: 40;
  padding: 20;
  background-color: #ffffff;
  .titleView {
    font-size: 26;
    font-weight: bold;
    color: #333333;
  }
  .descView1 {
    margin-top: 16;
  }
  .descView2 {
    margin-top: 16;
  }
}
</style>