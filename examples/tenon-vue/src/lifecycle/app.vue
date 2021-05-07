<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">生命周期</text>
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
</style>

<script>
import LifeMixin from "./mixins/life-mixin";
import LifeExtend1 from "./extends/life-mxin";
export default {
  mixins: [LifeMixin],
  extends: LifeExtend1,
  data() {
    return {};
  },
  onShow() {
    // onShow 生命周期
    console.log("Base Lifecycle On Show!");
  },
  onHide() {
    // onHide 生命周期
    console.log("Base Lifecycle On Hide!");
  },
  onBack(){
    // onBack 生命周期
    console.log("on Back 生命周期")
    // return true
  }
};
</script>