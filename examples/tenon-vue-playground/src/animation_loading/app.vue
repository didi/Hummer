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
            <view
              class="loadView"
              v-for="(item, index) in loadViewList"
              :key="index"
              v-animation="doLoadingAnimation(index)"
            >
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
    return {
      loadViewList: new Array(3),
    };
  },
  methods: {
    doLoadingAnimation(index) {
      let delay, anim;
      delay = 300 * index;
      console.log(delay)
      anim = {
        id: "scaleKeyAndOpacityKey",
        repeatCount: -1,
        duration: 1000,
        easing: "ease-out",
        delay: delay,
        keyframes: [
          {
            styles: {
              opacity: 0.5,
              scale: 1,
            },
            percent: 0,
          },
          {
            styles: {
              opacity: 1,
              scale: 1.3,
            },
            percent: 0.1,
          },
          {
            styles: {
              opacity: 0.5,
              scale: 1,
            },
            percent: 0.4,
          },
          {
            styles: {
              opacity: 0.5,
              scale: 1,
            },
            percent: 1,
          },
        ],
      };
      return anim;
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .layout {
    flex-direction: row;
    width: 80;
    justify-content: space-between;
  }
  .loadView {
    width: 20;
    height: 20;
    background-color: #15d0b4;
    border-radius: 10;
    opacity: 0.5;
  }
}
.scrollContentView {
  background: rgb(255, 255, 255);
  align-items: center;
  justify-content: center;
}
</style>