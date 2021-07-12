<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">语法——样式篇</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">静态 Class(并列选择器) </text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="static-class class1">
              <text>Box</text>
            </view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">静态 Class(聚合选择器) </text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="static-class class1 class2">
              <text>Box</text>
            </view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">静态 Class(单一类) </text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="static-class">
              <text>Box</text>
            </view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">静态 Class(多类) </text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box static-simple-class">
              <text>Box</text>
            </view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">动态 Class(单一，对象) </text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view
              class="box"
              :class="{ 'dynamic-black-class': isDynamicBlackBox }"
            >
              <text>Box</text>
            </view>
          </view>
          <view class="operation-container">
            <button class="btn" @tap="toggleBoxClass(false)">取消 Class</button>
            <button class="btn" @tap="toggleBoxClass(true)">设定 Class</button>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">动态 Class(单一，数组) </text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view
              :class="['box', isDynamicBlackBox ? 'dynamic-black-class' : '']"
            >
              <text>Box</text>
            </view>
          </view>
          <view class="operation-container">
            <button class="btn" @tap="toggleBoxClass(false)">取消 Class</button>
            <button class="btn" @tap="toggleBoxClass(true)">设定 Class</button>
          </view>
        </view>
        <text class="warning-text">
          Tips: 设定动态 Class 时，由于 Class 解析层在 Tenon 层做处理， 当 Class
          取消时，只能通过重新设定 Style 的方式，达到渲染的初始态回退，Hummer
          自身不保留状态。 建议给元素绑定默认类，实现效果。
        </text>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">静态 Style</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view
              class="static-class"
              style="background-color:black;"
            >
              <text>Box</text>
            </view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">动态 Style</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view
              class="static-class"
              style="background-color:#fa9153"
              :style="isDynamicBlackBox?'background-color:black;':''"
            >
              <text>Box</text>
            </view>
          </view>
          <view class="operation-container">
            <button class="btn" @tap="toggleBoxClass(false)">取消 Class</button>
            <button class="btn" @tap="toggleBoxClass(true)">设定 Class</button>
          </view>
          <text class="warning-text">
            Tips: 设定动态 Style 时，由于 Hummer 自身不保留状态。条件判断时，建议设定 Style 默认值。
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isDynamicBlackBox: false,
    };
  },
  methods: {
    toggleBoxClass(flag) {
      this.isDynamicBlackBox = flag;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("@common/assets/css/common.less");
.box {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: #fa9153;
  display: flex;
  justify-content: center;
  align-items: center;
}
.static-class {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: #fa9153;
  display: flex;
  justify-content: center;
  align-items: center;
}
.static-simple-class {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dynamic-black-class {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: black;
}
.box-opacity-hide {
  opacity: 0;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}

// 并列关系样式
.class1, .class2{
  background-color: #fa9153;
}
.class1.class2{
  background-color: #f3ba88;
}
</style>