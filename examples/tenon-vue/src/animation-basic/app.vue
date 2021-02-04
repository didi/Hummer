<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">基础动画</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">透明度(opacity)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box" v-animation="animFadeOut"></view>
            <view class="box box-opacity-hide" v-animation="animFadeIn"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">旋转(rotate)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box" v-animation="animRotation"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">位移(position)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box" v-animation="animTranslate"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">放缩(scale)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box" v-animation="animScale"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">背景色(backgroundColor)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box" v-animation="animBackground"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">宽度(width)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box" v-animation="animWidth"></view>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">高度(height)</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <view class="box" v-animation="animHeight"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
const baseAnimation = {
  duration: 5000, // 动画持续时间，单位 ms
  repeatCount: -1, // 重复的次数（-1 无限次，0 一次，1 两次）
  easing: "linear",
};
export default {
  data() {
    return {
      animFadeOut: {
        ...baseAnimation,
        styles: {
          opacity: 0,
        },
      },
      animFadeIn: {
        ...baseAnimation,
        styles: {
          opacity: 1,
        },
      },
      animRotation: {
        ...baseAnimation,
        styles: {
          rotationZ: 180,
        },
      },
      animTranslate: {
        ...baseAnimation,
        styles: {
          position: {
            x: "100hm",
            y: 0,
          },
        },
      },
      animScale: {
        ...baseAnimation,
        styles: {
          scale: 0.5,
        },
      },
      animBackground: {
        ...baseAnimation,
        styles: {
          backgroundColor: "black",
        },
      },
      animWidth: {
        ...baseAnimation,
        styles: {
          width: "1.5rem",
        },
      },
      animHeight: {
        ...baseAnimation,
        styles: {
          height: "1.5rem",
        },
      },
    };
  },
  methods: {},
};
</script>
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
.box-opacity-hide {
  opacity: 0;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
.warning-text {
  color: red;
  padding: 0 0.2rem;
}
</style>