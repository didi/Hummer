<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component View</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">View With Border</text>
        </view>
        <view class="item-container">
          <view class="demo-box border-box"></view>
        </view>
      </view>
       <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">View With Border Top</text>
        </view>
        <view class="item-container">
          <view class="demo-box border-top-box"></view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">View With Background Image</text>
        </view>
        <view class="item-container">
          <view class="demo-box background-box"></view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
.demo-box {
  margin-top: 0.2rem;
  width: 2rem;
  height: 2rem;
  background-color: #fa9153;
}
.border-box {
  border-radius: 0.1rem;
  border: 0.2rem solid blue;
}
.border-top-box{
  border-top: 0.2rem solid #444444;
}
.background-box {
  background-image: url("https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg");
}
</style>

<script>
export default {
  data() {
    return {};
  },
};
</script>