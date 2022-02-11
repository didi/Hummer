<template>
  <view class="page">
    <CommonPage titleText="标题栏 + 底部栏" :showDisplayLayout="false" :showOption="false">
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
          title: "中间是普通 View",
          dstPageName: "middle_view.js",
        },
        {
          title: "中间是 Scroller",
          dstPageName: "middle_scroller.js",
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