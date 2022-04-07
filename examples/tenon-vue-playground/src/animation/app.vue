<template>
  <view class="page">
    <CommonPage titleText="动画" :showDisplayLayout="false" :showOption="false">
      <template v-slot:content>
        <scroller class="scrollContentView" style="backgroundColor:#ffffff">
          <MainListItem :list="list"></MainListItem>
        </scroller>
      </template>
    </CommonPage>
  </view>
</template>
<script>
import MainListItem from "../component/MainListItem.vue";
import CommonPage from "../component/CommonPage.vue";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
    MainListItem,
  },
  data() {
    return {
      list: [
        {
          title: "基础动画",
          dstPageName: "animation_basic.js",
        },
        {
          title: "关键帧动画",
          dstPageName: "animation_keyframe.js",
        },
        {
          title: "次序动画",
          dstPageName: "animation_steps.js",
        },
        {
          title: "水波纹效果",
          dstPageName: "animation_ripple.js",
        },
        {
          title: "Loading 效果",
          dstPageName: "animation_loading.js",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
}
.scrollContentView {
  width: 100%;
  flex-grow: 1;
  padding: 18;
}
</style>