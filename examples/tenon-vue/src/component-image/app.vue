<template>
  <view>
    <view>
      <text class="demo-title">Component Image!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">普通图片</text>
      <view class="demo-box">
        <image class="image-item" :src="imageSrc"></image>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Gif图片</text>
      <view class="demo-box">
        <image class="image-item" :src="gifSrc"></image>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Gif图片 和 RepeatCount 2</text>
      <view class="demo-box">
        <image class="image-item" :src="gifSrc" :gifRepeatCount="gifRepeatCount"></image>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
  .demo-title{
    font-size: .36rem;
    width: 100%;
    text-align: center;
  }
  .demo-item-image{
    font-size: .24rem;
    width: 100%;
  }
  .demo-box{
    margin-top: .2rem;
  }
  .image-item{
    width: 2rem;
    height: 2rem;
  }
</style>

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