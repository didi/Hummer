<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Image</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">普通图片</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <image class="image-item" :src="imageSrc"></image>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">普通图片带圆角</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <image class="image-item border-item" :src="imageSrc"></image>
          </view>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">普通图片（resize）</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <image
              class="image-item"
              :resize="resizeStyle"
              :src="imageSrc"
            ></image>
          </view>
        </view>
        <view class="operation-container">
          <button class="btn" @tap="updateResizeStyle('stretch')">
            stretch
          </button>
          <button class="btn" @tap="updateResizeStyle('origin')">
            origin
          </button>
          <button class="btn" @tap="updateResizeStyle('contain')">
           contain
          </button>
          <button class="btn" @tap="updateResizeStyle('cover')">
            cover
          </button>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Gif图片 & RepeatCount 2</text>
        </view>
        <view class="item-container">
          <view class="box-container">
            <image
              class="image-item"
              :src="gifSrc"
              :gifRepeatCount="gifRepeatCount"
            ></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      imageSrc:
        "https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg",
      gifSrc:
        "https://pt-starimg.didistatic.com/static/starimg/img/NOrrIvZGhO1605683055216.gif",
      gifRepeatCount: 2,
      resizeStyle: "stretch",
    };
  },
  methods: {
    updateResizeStyle(style) {
      this.resizeStyle = style;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
.image-item {
  width: 2rem;
  height: 2rem;
  background-color: red;
}
.box-container {
  display: flex;
  justify-content: center;
}
.border-item {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
</style>
