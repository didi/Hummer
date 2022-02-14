<template>
  <view class="page">
    <CommonPage
      titleText="价格居中 + 标签"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <scroller class="scrollContentView" style="backgroundcolor: #ffffff">
          <view class="layout">
            <text class="textView">￥88.88</text>
            <view class="flagLayout"><text class="flagView">优惠价</text></view>
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
  methods: {},
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
  align-content: center;
  justify-content: center;
  .layout {
    width: 100%;
    height: 60;
    flex-direction: row;
    justify-content: center;
    background-color: #15d0b4;
    .textView {
      font-size: 30;
      color: #000000;
    }
    .flagView {
      position: absolute;
      height: 16;
      min-width: 16;
      margin-top: 6;
      margin-left: -12;
      padding: 4;
      background-color: #ff0000;
      border-radius: 6;
      text-align: center;
      font-size: 10;
      color: #ffffff;
    }
  }
}
</style>