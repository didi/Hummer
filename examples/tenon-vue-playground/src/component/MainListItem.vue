<template>
  <view class="commonMainListItem">
    <view
      class="mainListItem"
      v-for="(item, idx) in list"
      :key="idx"
      @tap="goDemo(item.dstPageName)"
    >
      <text class="mainListText">{{ item.title }}</text>
      <image
        class="mainListImage"
        resize="contain"
        src="https://pt-starimg.didistatic.com/static/starimg/img/mKuP6LHRsJ1642409515837.png"
      ></image>
    </view>
  </view>
</template>
<style lang="less" scoped>
.commonMainListItem {
  .mainListItem {
    flex-direction: row;
    height: 64;
    margin-top: 10;
    background-color: #ffffff;
    box-shadow: 1 2 12 #00000014;
    border-radius: 8;
    justify-content: space-between;
    align-items: center;
    .mainListText {
      color: #1f1944;
      font-size: 18;
      margin-left: 21;
    }
    .mainListImage {
      width: 16;
      height: 16;
      margin-right: 24;
    }
  }
}
</style>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    goDemo(dstPageName) {
      let page = {
        url: "./" + dstPageName,
      };
      Navigator.openPage(page);
    },
  },
};
</script>