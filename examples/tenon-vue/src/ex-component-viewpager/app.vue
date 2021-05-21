<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Viewpager</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">ViewPager</text>
        </view>
        <view class="item-container">
          <ex-viewpager
            class="banner"
            ref="viewpager"
            :data="list"
            :itemSpacing="10"
            :edgeSpacing="50"
            :scaleFactor="0.99"
            :alphaFactor="1"
            @itemclick="handleItemClick"
            @pageChange="handlePageChange"
            @pageScroll="handlePageScroll"
            @pageScrollStateChange="handlePageScrollStateChange"
          >
            <template v-slot:item="item">
              <view class="banner-item" @tap="handleClickTap(item)">
                <text class="banner-item-index">Index: {{ item.index }}</text>
                <image class="banner-image" :src="item.data.url"></image>
              </view>
            </template>
          </ex-viewpager>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">ViewPager</text>
        </view>
        <view class="item-container">
          <ex-viewpager
            class="banner"
            ref="viewpager"
            :data="list"
            :itemSpacing="10"
            :edgeSpacing="20"
            :canLoop="true"
            :autoPlay="true"
            :loopInterval="2000"
            @itemclick="handleItemClick"
            @pageChange="handlePageChange"
            @pageScroll="handlePageScroll"
            @pageScrollStateChange="handlePageScrollStateChange"
          >
            <template v-slot:item="item">
              <view class="banner-item" @tap="handleClickTap(item)">
                <text class="banner-item-index">Index: {{ item.index }}</text>
                <image class="banner-image" :src="item.data.url"></image>
              </view>
            </template>
          </ex-viewpager>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
.banner{
  height: 4rem;
  width: 100%;
}
.banner-image {
  width: 100%;
  height: 3rem;
  border-radius: .1rem;
}
.banner-item-index {
  text-align: center;
}
</style>

<script>
const ImageData = [
  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3207781657,3460758070&fm=27&gp=0.jpg",
  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg",
  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3464499095,1074840881&fm=27&gp=0.jpg",
];
export default {
  data() {
    return {
      index: 0,
      list: Array.apply(null, new Array(3)).map((item, index) => {
        return {
          url: ImageData[2 - (index % 3)],
          index: index,
        };
      }),
    };
  },
  watch: {
    index() {
      this.$refs.viewpager.setCurrentItem(this.index);
    },
  },
  methods: {
    handleIncrease() {
      if (this.index >= this.list.length) {
        return;
      }
      this.index++;
    },
    handleDecrease() {
      if (this.index <= 0) {
        return;
      }
      this.index--;
    },
    handleClickTap(data) {
      console.log("Data");
      // Toast.show(JSON.stringify(data))
    },
    handleItemClick(position) {
      console.log("Item Click", position);
    },
    handlePageChange(current, total) {
      console.log("Page Change", current, total);
    },
    handlePageScroll(position, percent) {
      // console.log('Page Scroll', position, percent)
    },
    handlePageScrollStateChange(state) {
      console.log("Page Scroll State", state);
    },
  },
};
</script>