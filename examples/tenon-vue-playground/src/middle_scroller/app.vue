<template>
  <view class="page">
    <view class="titleLayout">
      <image
        resize="contain"
        class="backView"
        @tap="backClick"
        src="https://pt-starimg.didistatic.com/static/starimg/img/vbcsZOJMB51642409516103.png"
      ></image>
      <text class="titleView">标题栏</text>
      <image
        class="menuView"
        resize="contain"
        @tap="menuClick"
        src="https://pt-starimg.didistatic.com/static/starimg/img/yM18N7aJb61642409516005.png"
      ></image>
    </view>
    <scroller class="contentLayout">
      <text
        class="contentLayoutText"
        :style="`backgroundColor:${index % 2 == 0 ? '#00FF0010' : '#FF000010'}`"
        v-for="(item, index) in textList"
        :key="index"
        >{{ index }}</text
      >
    </scroller>
    <view class="bottomLayout">
      <text class="bottomLayoutText">底部栏</text>
    </view>
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
    return {
      textList: new Array(10),
    };
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
.titleLayout {
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
    flex-grow: 1;
    color: #000000;
  }
  .menuView {
    width: 24;
    height: 24;
    margin-right: 20;
  }
}
.contentLayout {
  width: "100%";
  flex-grow: 1; // 关键点
  flex-shrink: 1; // 关键点（如果内容比较多时不想撑开布局，就用这个属性）
  .contentLayoutText {
    width: 100%;
    height: 100;
    font-size: 20;
    text-align: center;
    color: #000000;
  }
}
.bottomLayout {
  width: 100%;
  height: 60;
  justify-content: center;
  align-items: center;
  background-color: #4a90e2;
  .bottomLayoutText {
    font-size: 18;
    color: #000000;
  }
}
</style>