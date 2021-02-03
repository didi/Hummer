<template>
  <view>
    <view>
      <text class="demo-title">基础样式</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">盒模型</text>
      <view class="demo-box">
        <view class="box-item">
          <view class="box-content">
            <text>Box Content</text>
          </view>
        </view>
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
  .box-item{
    width: 4rem;
    height: 4rem;
    background-color: #eeeeee;
    padding: 0.5rem;
    border: 0.2rem solid blue;
  }
  .box-content{
    background-color: red;
    width: 100%;
    height: 100%;
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