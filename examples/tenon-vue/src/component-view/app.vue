<template>
  <view>
    <view>
      <text class="demo-title">Component View!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">View With Border</text>
      <view class="demo-box border-box"></view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">View With Background Image</text>
      <view class="demo-box background-box"></view>
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
    width: 2rem;
    height: 2rem;
    background-color: #FA9153;
  }
  .border-box{
    border-radius: .1rem;
    border: .2rem solid blue; 
  }
  .background-box{
    background-image: url("https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg");
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