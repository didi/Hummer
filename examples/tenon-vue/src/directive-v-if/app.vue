<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">v-if</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">v-if 普通布局(default-column)</text>
          <text class="item-title-text">当前状态：{{flagOfDefault? '展示': '隐藏'}}</text>
        </view>
        <view class="item-container">
          <view class="box-container" v-if="flagOfDefault">
            <view class="box"></view>
            <view class="box"></view>
          </view>
          <view class="operation-container">
            <button class="btn" @tap="toggleBoxOfDefault(false)">
              隐藏 Box
            </button>
            <button class="btn" @tap="toggleBoxOfDefault(true)">
              展示 Box
            </button>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">v-if 普通布局(flex-row)</text>
          <text class="item-title-text">当前状态：{{flagOfFlexRow? '展示': '隐藏'}}</text>
        </view>
        <view class="item-container">
          <view class="box-container box-flex-row" v-if="flagOfFlexRow">
            <view class="box"></view>
            <view class="box"></view>
          </view>
          <view class="operation-container">
            <button class="btn" @tap="toggleBoxOfFlexRow(false)">
              隐藏 Box
            </button>
            <button class="btn" @tap="toggleBoxOfFlexRow(true)">
              展示 Box
            </button>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">v-if 相对布局(relative)</text>
          <text class="item-title-text">当前状态：{{flagOfRelative? '展示': '隐藏'}}</text>
        </view>
        <view class="item-container">
          <view class="box-container" v-if="flagOfRelative">
            <view class="box box-relative"></view>
            <view class="box box-relative"></view>
          </view>
          <view class="operation-container">
            <button class="btn" @tap="toggleBoxOfRelative(false)">
              隐藏 Box
            </button>
            <button class="btn" @tap="toggleBoxOfRelative(true)">
              展示 Box
            </button>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">v-if 绝对布局(absolute)</text>
          <text class="item-title-text">当前状态：{{flagOfAbsolute? '展示': '隐藏'}}</text>
        </view>
        <view class="item-container">
          <view class="box-container" v-if="flagOfAbsolute">
            <view class="box box-ab box-ab-1"></view>
            <view class="box box-ab box-ab-2"></view>
          </view>
          <view class="operation-container operation-ab">
            <button class="btn" @tap="toggleBoxOfAbsolute(false)">
              隐藏 Box
            </button>
            <button class="btn" @tap="toggleBoxOfAbsolute(true)">
              展示 Box
            </button>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">v-if 固定布局(fixed)</text>
          <text class="item-title-text">当前状态：{{flagOfFixed? '展示': '隐藏'}}</text>
          <text class="item-title-text">子元素 Fixed 当前状态：{{flagOfFixed && flagOfSubFixed? '展示': '隐藏'}}</text>
        </view>
        <view class="item-container">
          <view class="box-container" v-if="flagOfFixed">
            <view class="box box-fixed box-fixed-1"></view>
            <view class="box box-fixed box-fixed-2"></view>
            <view class="box box-fixed box-fixed-3" v-if="flagOfSubFixed"></view>
          </view>
          <view class="operation-container operation-ab">
            <button class="btn" @tap="toggleBoxOfFixed(false)">隐藏 Box</button>
            <button class="btn" @tap="toggleBoxOfFixed(true)">展示 Box</button>
          </view>
          <view class="operation-container" style="margin-top:.2rem;">
            <button class="btn" @tap="toggleBoxOfSubFixed(false)">隐藏 Sub Fixed Box</button>
            <button class="btn" @tap="toggleBoxOfSubFixed(true)">展示 Sub Fixed Box</button>
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
.box {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: #fa9153;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
.operation-container {
  display: flex;
  justify-content: space-between;
}
.btn {
  flex: 1;
  margin: 0 0.2rem;
  height: 0.8rem;
  text-align: center;
  color: white;
  background: #fa9153;
  border-radius: 10px;
}
.box-ab {
  position: absolute;
}
.box-ab-1 {
  left: 0;
}
.box-ab-2 {
  left: 1.2rem;
}
.operation-ab {
  margin-top: 1.5rem;
}
.box-relative {
  position: relative;
}
.box-fixed {
  position: fixed;
}
.box-fixed-1 {
  top: 0;
  left: 0;
}
.box-fixed-2 {
  top: 0;
  left: 1.5rem;
}
.box-fixed-3{
  top: 1.5rem;
  left: 0;
  background-color: blue;
}
.warning-text {
  color: red;
  padding: 0 0.2rem;
}
</style>

<script>
export default {
  data() {
    return {
      flagOfDefault: false,
      flagOfFlexRow: true,
      flagOfRelative: true,
      flagOfAbsolute: true,
      flagOfFixed: false,
      flagOfSubFixed: false
    };
  },
  methods: {
    toggleBoxOfDefault(flag) {
      this.flagOfDefault = flag ? true : false;
    },
    toggleBoxOfFlexRow(flag) {
      this.flagOfFlexRow = flag ? true : false;
    },
    toggleBoxOfRelative(flag) {
      this.flagOfRelative = flag ? true : false;
    },
    toggleBoxOfAbsolute(flag) {
      this.flagOfAbsolute = flag ? true : false;
    },
    toggleBoxOfFixed(flag) {
      this.flagOfFixed = flag ? true : false;
    },
    toggleBoxOfSubFixed(flag){
      this.flagOfSubFixed = flag? true: false
    }
  },
};
</script>