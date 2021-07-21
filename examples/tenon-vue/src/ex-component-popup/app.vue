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
          <button class="btn" @tap="openDialog(1)">打开弹窗1</button>
          <button class="btn" @tap="openDialog(2)">打开弹窗2</button>
        </view>
      </view>
    </view>
    <dialog :show="showPopup" @close="closeDialog(1)"></dialog>
    <dialog :show="showPopup2" @close="closeDialog(2)"></dialog>
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
      showPopup: true,
      showPopup2: false,
    }
  },
  methods: {
    openDialog(type){
      if(type === 1){
        this.showPopup = true
      }else if(type === 2){
        this.showPopup2 = true
      }
    },
    closeDialog(type){
      if(type === 1){
        this.showPopup = false
      }else if(type === 2){
        this.showPopup2 = false
      }
    }
  }
};
</script>