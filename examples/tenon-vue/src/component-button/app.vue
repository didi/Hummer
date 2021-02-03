<template>
  <view>
    <view>
      <text class="demo-title">Component Button!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Button</text>
      <view class="demo-box">
        <button class="btn" @tap="handleClickBtn('Button')">Button</button>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Button With Disabled</text>
      <view class="demo-box">
        <button class="btn" :disabled="true" :disabled-style="disabledStyle"  @tap="handleClickBtn('Button With Disabled')">Button</button>
      </view>
    </view>
     <view class="demo-item">
      <text class="demo-item-title">Button With PressedStyle</text>
      <view class="demo-box">
        <button class="btn" :pressed-style="pressedStyle"  @tap="handleClickBtn('Button With PressedStyle')">Button</button>
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
  .btn{
    background-color: blanchedalmond;
    border-radius: .2rem;
  }
</style>

<script>
export default {
  data(){
    return {
      pressedStyle:{
        'background-color': 'black'
      },
      disabledStyle: {
        'background-color': 'yellow'
      }
    }
  },
  methods: {
    handleClickBtn(msg){
      Toast.show(msg);
    }
  }
}
</script>