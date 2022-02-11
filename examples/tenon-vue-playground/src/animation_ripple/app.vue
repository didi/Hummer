<template>
  <view class="page">
    <CommonPage
      titleText="水波纹效果"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <scroller class="scrollContentView">
          <view class="layout">
            <view class="innerView"></view>
            <view class="outerView" v-animation="anim"></view>
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
    return {
      anim: {
        id: "scaleKey1",
        repeatCount: -1,
        duration: 1000,
        keyframes: [
          {
            styles: {
              scale: 1,
            },
            percent: 0,
            easing: "ease-in-out",
          },
          {
            styles: {
              scale: 2,
            },
            percent: 0.5,
            easing: "ease-in-out",
          },
          {
            styles: {
              scale: 1,
            },
            percent: 1,
            easing: "ease-in-out",
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .layout {
    width: 100;
    height: 100;
    justify-content: center;
    align-items: center;
  }
  .innerView {
    position: absolute;
    width: 36;
    height: 36;
    background-color: #15d0b4;
    border-radius: 18;
  }
  .outerView {
    position: absolute;
    width: 100;
    height: 100;
    justify-content: center;
    align-items: center;
    background-color: #15d0b422;
    border-radius: 50;
    border-width: 4;
    border-color: #15d0b4;
    border-style: solid;
  }
}
.scrollContentView {
  background: rgb(255, 255, 255);
  align-items: center;
  justify-content: center;
}
</style>