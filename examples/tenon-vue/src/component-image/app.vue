<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Image</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">普通图片</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="image-item border-item"></view>
            <image class="image-item" :src="imageSrc"></image>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">普通图片带圆角</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <image class="image-item border-item" :src="imageSrc"></image>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Gif图片 & RepeatCount 2</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <image class="image-item" :src="gifSrc" :gifRepeatCount="gifRepeatCount"></image>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Gif图片 & RepeatCount 2</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <image class="image-item" :src="gifSrc" :gifRepeatCount="gifRepeatCount"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data(){
    return {
      imageSrc: 'https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg',
      gifSrc: 'https://pt-starimg.didistatic.com/static/starimg/img/NOrrIvZGhO1605683055216.gif',
      gifRepeatCount: 2
    }
  }
}
</script>
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
.box-container{
  display: flex;
  justify-content: center;
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
}
.image-item{
  width: 2rem;
  height: 2rem;
  background-color: red;
}
.border-item{
  border-radius: 50%;
  // overflow: hidden;
}
</style>
