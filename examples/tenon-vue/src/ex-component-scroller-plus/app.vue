<template>
  <view class="page">
    <ex-scroller-plus style="height: 100hm">
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>I am Scroller Text 1!</text>
      <text>{{ aaa }}</text>
    </ex-scroller-plus>
  </view>
</template>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  pageConfig: {
    canScroll: false,
  },
  data() {
    return {
      aaa: 1111,
    };
  },
};
</script>
