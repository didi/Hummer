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
          <view class="box-single-item">
            <view class="box-content">
              <text>Box Content</text>
            </view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Border</text>
        </view>
        <view class="item-container">
          <view class="box-item border-item" :style="borderStyle">
            <text>{{ borderStyle }}</text>
          </view>
        </view>
        <view class="operation-container">
          <button class="btn" @tap="updateBorderStyle('border:none')">
            border: none
          </button>
          <button class="btn" @tap="updateBorderStyle('border:0')">
            border: 0
          </button>
          <button class="btn" @tap="updateBorderStyle('border: dotted red')">
            border: dotted red
          </button>
          <button class="btn" @tap="updateBorderStyle('border:.1rem dashed red')">
            border: .1rem dashed red
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
.box-single-item {
  width: 4rem;
  height: 4rem;
  background-color: #eeeeee;
  padding: 0.5rem;
  border: 0.2rem solid blue;
}
.box-content {
  background-color: red;
  width: 100%;
  height: 100%;
}
.border-item {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  border: 0.05rem solid black;
}
</style>

<script>
export default {
  data() {
    return {
      borderStyle: "",
    };
  },
  methods: {
    updateBorderStyle(style) {
      this.borderStyle = style;
    },
  },
};
</script>