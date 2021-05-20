<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Text</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">普通文本</text>
        </view>
        <view class="item-container">
          <text>我是普通的文本</text>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">富文本(richText)</text>
        </view>
        <view class="item-container">
          <text :richText="baseRichText"></text>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">富文本~图片(richText)</text>
        </view>
        <view class="item-container">
          <text :richText="imageRichText"></text>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">富文本~超链接(richText)</text>
        </view>
        <view class="item-container">
          <text :richText="hrefRichText"></text>
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
      baseRichText: [{
        text: "文本1",
        color: "#00FF00",
      },{
        text: "文本2",
        color: "#0000FF",
      },{
        text: "文本3",
        color: "#000000",
        fontSize: "18"
      }],
      imageRichText: [{
        text: "文本1",
        color: "#00FF00",
      },{
        image: "ic_loading",
        imageWidth: 20,
        imageHeight: 20,
        imageAlign: "center",
        color: "#0000FF",
        fontSize: "10",
      }],
      hrefRichText: [
        {
          text: "超链接",
          color: "#00FF00",
          fontSize: "18",
          href: "http://www.baidu.com",
          hrefColor: "#0000FF",
        },
         {
          text: "普通文本",
          color: "#00FF00",
          fontSize: "18"
        }
      ],
    };
  },
  mounted() {
  },
};
</script>