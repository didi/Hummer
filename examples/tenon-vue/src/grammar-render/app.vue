<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">语法——Render</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Render 函数</text>
        </view>
        <view class="item-container">
          <test-component></test-component>
        </view>
         <view class="item-container">
          <demo-component></demo-component>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import TestComponent from './components/test'
import DemoComponent from './components/demo-component.vue'

export default {
  components: {
    TestComponent,
    DemoComponent
  },
  data() {
    return {
    };
  },
  methods: {
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