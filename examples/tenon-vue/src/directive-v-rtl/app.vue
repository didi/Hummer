<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">v-rtl(自定义指令)</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">v-rtl 布局</text>
        </view>
        <view class="item-container">
          <view class="box-container" v-rtl>
            <view class="box">
              <text>Box 1</text>
            </view>
            <view class="box">
              <text>Box 2</text>
            </view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text" v-rtl>v-rtl 文本</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box">
              <text v-rtl="'text'">Box 1</text>
            </view>
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
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
.operation-container {
  display: flex;
  justify-content: space-between;
}
.btn {
  flex: 1;
  margin: 0 0.2rem;
  height: 0.8rem;
  text-align: center;
  color: white;
  background: #fa9153;
  border-radius: 10px;
}
.box-ab {
  position: absolute;
}
.box-ab-1 {
  left: 0;
}
.box-ab-2 {
  left: 1.2rem;
}
.operation-ab {
  margin-top: 1.5rem;
}
.box-relative {
  position: relative;
}
.box-fixed {
  position: fixed;
}
.box-fixed-1 {
  top: 0;
  left: 0;
}
.box-fixed-2 {
  top: 0;
  left: 1.5rem;
}
.box-fixed-3{
  top: 1.5rem;
  left: 0;
  background-color: blue;
}
.warning-text {
  color: red;
  padding: 0 0.2rem;
}
</style>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    
  },
};
</script>