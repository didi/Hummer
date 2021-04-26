<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Custom Native Component</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">webview</text>
        </view>
        <view class="item-container">
         <ex-webview @webview-ready="webviewReady"></ex-webview>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
.page {
  background-color: #eeeeee;
  margin-bottom: 0.5rem;
}
.demo-header {
  padding: 0.2rem 0;
  background-color: #fa9153;
}
.demo-title {
  font-size: 0.36rem;
  width: 100%;
  text-align: center;
  color: white;
}
.demo-container {
  margin-top: 0.2rem;
}
.demo-item {
  background-color: #ffffff;
  width: 100%;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0;
}
.item-title {
  text-align: center;
}
.item-title-text {
  text-align: center;
  font-size: 0.28rem;
}
.item-container {
  margin-top: 0.2rem;
  width: 100%;
  height: .5rem;
}
.box {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: #fa9153;
  opacity: 1;
}
.box-opacity-hide{
  opacity: 0;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
</style>

<script>

export default {
  data() {
    return {
      showPopup: true,
      showPopup2: true
    }
  },
  created(){
    // this.showPopup2 = false
  },
  methods: {
    webviewReady(){

    }
  }
};
</script>