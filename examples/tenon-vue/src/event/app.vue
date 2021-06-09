<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">事件</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Tap</text>
        </view>
        <view class="item-container">
          <view class="box static-simple-class" @tap="handleTap">
            <text>Tap Me</text>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">longPress</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box static-simple-class" @longPress="handleLongPress">
              <text>longPress</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isDynamicBlackBox: false,
    };
  },
  methods: {
    handleTap(event) {
      console.log('Tap Event:', event)
    },
    handleLongPress(event){
      console.log('Long Press Event:', event)
    }
  },
};
</script>
<style lang="less" scoped>
@import url("@common/assets/css/common.less");
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
}
.static-class {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: #fa9153;
  display: flex;
  justify-content: center;
  align-items: center;
}
.static-simple-class {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dynamic-black-class {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: black;
}
.box-opacity-hide {
  opacity: 0;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
</style>