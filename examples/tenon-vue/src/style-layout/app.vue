<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">布局样式</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">flex</text>
        </view>
        <view class="item-container flex-container">
          <view class="box-item"  :style="flexStyle">
            <text>{{flexStyle}}</text>
          </view>
          <view class="box-item flex-1">
            <text>flex:1</text>
          </view>
          <view class="box-item flex-1">
            <text>flex:1</text>
          </view>
        </view>
        <view class="operation-container">
          <button class="btn" @tap="updateFlexStyle('flex:0.6')">
            flex: 0.6
          </button>
          <button class="btn" @tap="updateFlexStyle('flex:1')">
            flex: 1
          </button>
          <button class="btn" @tap="updateFlexStyle('flex:1 2')">
            flex: 1 2
          </button>
          <button class="btn" @tap="updateFlexStyle('flex:1 3rem')">
            flex: 1 3rem
          </button>
          <button class="btn" @tap="updateFlexStyle('flex:1 4rem')">
            flex: 1 4rem
          </button>
        </view>
      </view>
       <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">width: auto</text>
        </view>
        <view class="item-container flex-container">
          <view class="box-item width-auto">
            <text>width: auto</text>
          </view>
           <view class="box-item">
            <text>width: auto</text>
          </view>
          <view class="box-item"></view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
.flex-container{
  display: flex;
}
.flex-1{
  flex: 1;
}
.operation-container{
  flex-wrap: wrap;
}
.btn{
  margin-top: .1rem;
}
.box-item{
  display: flex;
  justify-content: center;
  align-items: center;
}
.width-auto{
  width: auto;
}
</style>

<script>
export default {
  data(){
    return {
      flexStyle: "flex:1"
    }
  },
  methods:{
    updateFlexStyle(style){
      this.flexStyle = style
    }
  }
}
</script>