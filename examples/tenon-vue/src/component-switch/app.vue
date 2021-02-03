<template>
  <view>
    <view>
      <text class="demo-title">Component Switch!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Switch</text>
      <view class="demo-box">
        <switch v-model="checked" @switch="handleSwitch" open-color="#00ff00"  close-color="#ff0000" thumb-color="#00ffff">
          HandleSwitch
        </switch>
        <button class="btn" @tap="handleToggle">Toggle Checked</button>
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
    background-color: yellow;
  }
</style>

<script>
export default {
  data(){
    return {
      checked: false
    }
  },
  methods:{
    handleSwitch(checked){
      Toast.show(JSON.stringify(checked))
    },
    handleToggle(){
      this.checked = !this.checked
    }
  }
}
</script>