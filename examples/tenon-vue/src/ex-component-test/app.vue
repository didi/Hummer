<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Custom Native Component</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">custom view</text>
        </view>
        <view class="item-container">
         <ex-webview content="I am custom view" @webview-ready="webviewReady"></ex-webview>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
</style>

<script>

export default {
  data() {
    return {}
  },
  methods: {
    webviewReady(){

    }
  }
};
</script>