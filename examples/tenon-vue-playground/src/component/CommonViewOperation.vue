<template>
  <view class="commonViewOperation">
    <text class="addView" @tap="leftClick">{{ leftText }}</text>
    <text class="removeView" @tap="rightClick">{{ rightText }}</text>
  </view>
</template>
<style lang="less" scoped>
.commonViewOperation {
  flex-direction: row;
  position: absolute;
  bottom: 4;
  right: 4;
  z-index: 1;
  overflow: visible;
  .addView,
  .removeView {
    width: 30;
    height: 30;
    background-color: #ffffff;
    margin: 4;
    color: #000000;
    font-size: 18;
    text-align: center;
    box-shadow: 1 2 12 #00000030;
  }
}
</style>

<script>
export default {
  props: {
    leftText: {
      type: String,
      default: "+",
    },
    rightText: {
      type: String,
      default: "-",
    },
  },
  data() {
    return {};
  },
  methods: {
    leftClick() {
      this.$emit("leftClick");
    },
    rightClick() {
      this.$emit("rightClick");
    },
  },
};
</script>