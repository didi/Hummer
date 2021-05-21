<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Popup Component</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Popup</text>
        </view>
        <view class="item-container">
        </view>
        <view class="operation-container">
          <button class="btn" @tap="openDialog">打开弹窗</button>
        </view>
      </view>
    </view>
    <dialog :show="showPopup" @close="closeDialog"></dialog>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";

</style>

<script>
import Dialog from './components/dialog'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      showPopup: false
    }
  },
  methods: {
    openDialog(){
      this.showPopup = true
    },
    closeDialog(){
      this.showPopup = false
    }
  }
};
</script>