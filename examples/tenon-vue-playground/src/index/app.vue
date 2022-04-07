<template>
  <view class="page">
    <view class="topBackground"></view>
    <view class="logoView">
      <image
        class="logoImage"
        resize="contain"
        src="https://pt-starimg.didistatic.com/static/starimg/img/Trkwzs6DOl1642409515891.png"
      ></image>
      <text class="logoText">超轻量动态化跨端框架Tenon组件库</text>
    </view>
    <view class="contentView">
      <view v-for="(value, key, index) in viewJson" :key="index">
        <text class="mainListGroupTitle">{{ key }}</text>
        <MainListItem :list="value"></MainListItem>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}
.topBackground {
  width: 100%;
  height: 218;
  background-color: linear-gradient(90deg #15d0b4 #e2ed00);
}
.logoView {
  width: 90%;
  height: 190;
  margin-top: -150;
  align-self: center;
  background-color: #ffffff;
  border-radius: 8;
  box-shadow: 1 2 12 #00000014;
  justify-content: center;
  align-items: center;
}
.logoImage {
  width: 180;
  height: 80;
}
.logoText {
  color: #292a36;
  font-size: 11;
  margin-top: 24;
}
.contentView {
  width: 100%;
  flex-grow: 1;
  padding: 18;
  .mainListGroupTitle {
    color: #9b9b9b;
    font-size: 13;
    margin-top: 24;
    margin-bottom: 3;
    margin-left: 20;
  }
}
</style>

<script>
import MainListItem from "../component/MainListItem.vue";
export default {
  pageConfig: {
    canScroll: true,
  },
  components: {
    MainListItem,
  },
  data() {
    return {
      viewJson: {
        通用样式: [
          {
            title: "通用布局样式",
            dstPageName: "normal_layout_style.js",
          },
          {
            title: "通用视图样式",
            dstPageName: "normal_view_style.js",
          },
        ],
        视图组件: [
          {
            title: "View",
            dstPageName: "view.js",
          },
          {
            title: "Text",
            dstPageName: "text.js",
          },
          {
            title: "Button",
            dstPageName: "button.js",
          },
          {
            title: "Image",
            dstPageName: "image.js",
          },
          {
            title: "Switch",
            dstPageName: "switch.js",
          },
          {
            title: "Input",
            dstPageName: "input.js",
          },
          {
            title: "TextArea",
            dstPageName: "textarea.js",
          },
          {
            title: "Scroller",
            dstPageName: "scroller.js",
          },
          {
            title: "HorizontalScroller",
            dstPageName: "hscroller.js",
          },
          {
            title: "List",
            dstPageName: "list.js",
          },
          {
            title: "Popup",
            dstPageName: "popup.js",
          },
          {
            title: "ViewPager",
            dstPageName: "view_pager.js",
          },
          {
            title: "Canvas",
            dstPageName: "canvas.js",
          },
        ],
        最佳实践: [
          {
            title: "标题栏系列",
            dstPageName: "titlebar.js",
          },
          {
            title: "底部栏系列",
            dstPageName: "bottombar.js",
          },
          {
            title: "标题栏 + 底部栏",
            dstPageName: "title_and_bottom_bar.js",
          },
          {
            title: "动画系列",
            dstPageName: "animation.js",
          },
          {
            title: "价格居中 + 标签",
            dstPageName: "price_flag.js",
          },
          {
            title: "验证码页面",
            dstPageName: "verification_code.js",
          },
        ],
      },
    };
  },
  methods: {
    goDemo(dstPageName) {
      let page = {
        url: "./" + dstPageName,
      };
      Navigator.openPage(page);
    },
  },
};
</script>