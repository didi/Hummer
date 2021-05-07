<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Plugin Error Handler</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">交互类事件错误</text>
        </view>
        <view class="item-container">
          <view class="operation-container">
            <button class="btn" @tap="triggerError">触发点击</button>
          </view>
        </view>
      </view>
       <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">上报自定义错误</text>
        </view>
        <view class="item-container">
          <view class="operation-container">
            <button class="btn" @tap="triggerCustomError">上报错误</button>
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
</style>

<script>
export default {
  data() {
    return {};
  },
  created() {
    throw new Error("Custom Error")
  },
  methods: {
    triggerError(){
      console.log('Trigger Error Click')
      console.log(a)
    },
    triggerCustomError(){
      throw new Error("Trigger Custom Error")
    }
  }
};
</script>