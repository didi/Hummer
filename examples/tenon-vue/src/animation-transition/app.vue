<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Transition 动画</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">透明度(opacity)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box animation" :class="startAnimation? 'animation-opacity': ''"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">旋转(rotate)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box animation" :class="startAnimation? 'animation-rotate': ''"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">位移(position)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box animation" :class="startAnimation? 'animation-translate': ''"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">放缩(scale)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box animation" :class="startAnimation? 'animation-scale': ''"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">背景色(backgroundColor)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box animation" :class="startAnimation? 'animation-background': ''"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">宽度(width)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box animation" :class="startAnimation? 'animation-width': ''"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">高度(height)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box animation" :class="startAnimation? 'animation-height': ''"></view>
          </view>
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
.animation{
  transition: all 3s ease-out;
}
.animation-scale{
  transform: scale(0.8);
}
.animation-opacity{
  opacity: 0.2;
}
.animation-translate{
  transform:translate(1rem, 0);
}
.animation-rotate{
  transform:rotate(45);
}
.animation-background{
  background-color: black;
}
.animation-width{
  width: 1.5rem;
}
.animation-height{
  height: 1.5rem;
}
</style>

<script>
export default {
  data() {
    return {
      startAnimation: false
    }
  },
  mounted(){
    setTimeout(() => {
      this.startAnimation = true
    }, 1000)
  },
  methods: {},
};
</script>