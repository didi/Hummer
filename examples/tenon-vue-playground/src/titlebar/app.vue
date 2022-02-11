<template>
  <view class="page">
    <CommonPage
      titleText="标题栏系列"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <scroller class="scrollContentView" style="backgroundcolor: #ffffff">
          <view class="titleLayout">
            <text class="titleView">标题栏（文本居中）</text>
          </view>
          <view class="titleBarWithMargin">
            <text class="titleView">标题栏（外边距）</text>
          </view>
          <view class="titleBarWithBackMenu">
            <image
              resize="contain"
              class="backView"
              @tap="backClick"
              src="https://pt-starimg.didistatic.com/static/starimg/img/vbcsZOJMB51642409516103.png"
            ></image>
            <text class="titleView">标题栏（按钮）</text>
            <image
              class="menuView1"
              resize="contain"
              @tap="menuClick"
              src="https://pt-starimg.didistatic.com/static/starimg/img/yM18N7aJb61642409516005.png"
            ></image>
          </view>
          <view class="titleBarWithBackMenuBadge">
            <image
              resize="contain"
              class="backView"
              @tap="backClick"
              src="https://pt-starimg.didistatic.com/static/starimg/img/vbcsZOJMB51642409516103.png"
            ></image>
            <text class="titleView">标题栏（按钮）</text>
            <view class="menuLayout">
              <image
                class="menuView"
                resize="contain"
                @tap="menuClick"
                src="https://pt-starimg.didistatic.com/static/starimg/img/yM18N7aJb61642409516005.png"
              ></image>
              <text class="badgeView">111</text>
            </view>
          </view>
        </scroller>
      </template>
    </CommonPage>
  </view>
</template>
<script>
import CommonPage from "../component/CommonPage.vue";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
  },
  data() {
    return {};
  },
  methods: {
    menuClick() {
      Toast.show("menu click");
    },
    backClick() {
      Navigator.popPage();
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.scrollContentView {
  width: 100%;
  .titleView {
    font-size: 18;
    color: #000000;
  }
  .titleLayout {
    width: 100%;
    height: 60;
    justify-content: center;
    align-items: center;
    background-color: #15d0b4;
  }
  .titleBarWithMargin {
    height: 60;
    justify-content: center;
    align-items: center;
    margin: 10;
    align-self: stretch; // 关键点
    background-color: #4a90e2;
  }
  .menuView1 {
    width: 24;
    height: 24;
    margin-right: 20;
  }
  .titleBarWithBackMenu,
  .titleBarWithBackMenuBadge {
    flex-direction: row;
    width: 100%;
    height: 60;
    align-items: center;
    background-color: #15d0b4;
    .backView {
      width: 24;
      height: 24;
      margin-left: 16;
    }
    .titleView {
      font-size: 18;
      text-align: center;
      flex-grow: 1; // 关键点
      color: #000000;
    }
  }
  .titleBarWithBackMenuBadge {
    background-color: #4a90e2;
    .menuLayout {
      flex-direction: row;
      margin-right: 8;
      .menuView {
        width: 24;
        height: 24;
        margin-right: 0;
      }
      .badgeView {
        height: 16;
        min-width: 16;
        margin-top: -6; // 关键点
        margin-left: -12; // 关键点
        padding: 4; // 关键点
        background-color: #ff0000;
        border-radius: 8;
        text-align: center;
        font-size: 10;
        color: #ffffff;
      }
    }
  }
}
</style>