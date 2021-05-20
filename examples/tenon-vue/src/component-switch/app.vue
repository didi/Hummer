<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Switch</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Switch</text>
        </view>
        <view class="item-container">
          <switch
            v-model="checked"
            style="width: 1rem;"
            @switch="handleSwitch"
            openColor="#00ff00"
            closeColor="#ff0000"
            thumbColor="#00ffff"
          ></switch>
        </view>
        <view class="operator-container">
          <button class="btn" @tap="handleToggle">Toggle Checked</button>
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
      checked: false,
    };
  },
  methods: {
    handleSwitch(checked) {
      Toast.show(checked);
    },
    handleToggle() {
      this.checked = !this.checked;
    },
  },
};
</script>