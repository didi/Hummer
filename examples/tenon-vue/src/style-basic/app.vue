<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">基础样式</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">盒模型</text>
        </view>
        <view class="item-container">
          <view class="box-item">
            <view class="box-content">
              <text>Box Content</text>
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
    }
  }
}
</script>