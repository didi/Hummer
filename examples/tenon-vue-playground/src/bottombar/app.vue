<template>
  <view class="page">
    <CommonPage titleText="底部栏系列" :showDisplayLayout="false" :showOption="false">
      <template v-slot:content>
        <scroller class="scrollContentView" style="backgroundcolor: #ffffff">
          <view class="bottomLayout">
            <text class="textView">底部栏（absolute + bottom: 0）</text>
          </view>
          <view class="contentLayout"></view>
          <view class="bottomLayoutflexGrow">
            <text class="textView">底部栏（flexGrow: 1）</text>
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
  .textView {
    font-size: 18;
    color: #000000;
  }
  .bottomLayout {
    position: absolute; // 关键点
    bottom: 0; // 关键点
    width: 100%;
    height: 60;
    justify-content: center;
    align-items: center;
    background-color: #15d0b4;
  }
  .bottomLayoutflexGrow {
    width: 100%;
    height: 60;
    justify-content: center;
    align-items: center;
    background-color: #4a90e2;
    margin-bottom: 60; // 关键点
  }
  .contentLayout {
    width: 100%;
    flex-grow: 1; // 关键点
  }
}
</style>