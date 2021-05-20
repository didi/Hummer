<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Button</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Button</text>
        </view>
        <view class="item-container">
          <button class="btn" @tap="handleClickBtn('Button')">Button</button>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Button With Disabled</text>
        </view>
        <view class="item-container">
          <button
            class="btn"
            disabled
            :disabled-style="disabledStyle"
            @tap="handleClickBtn('Button With Disabled')"
          >
            Button
          </button>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Button With PressedStyle</text>
        </view>
        <view class="item-container">
          <button
            class="btn"
            :pressedStyle="pressedStyle"
            @click="handleClickBtn('Button With PressedStyle')"
          >
            Button
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
</style>

<script>
export default {
  data() {
    return {
      pressedStyle: {
        "background-color": "black",
      },
      disabledStyle: {
        "background-color": "#eeeeee",
        color: "#333333",
      },
    };
  },
  methods: {
    handleClickBtn(msg) {
      Toast.show(msg);
    },
  },
};
</script>