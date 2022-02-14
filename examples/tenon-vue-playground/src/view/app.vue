<template>
  <view class="page">
    <CommonPage titleText="View">
      <template v-slot:displayView>
        <view class="viewComponent"></view>
      </template>
    </CommonPage>
  </view>
</template>
<style lang="less" scoped>
.viewComponent {
  width: 100;
  height: 100;
  background-color: "#15D0B4";
}
</style>

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
};
</script>