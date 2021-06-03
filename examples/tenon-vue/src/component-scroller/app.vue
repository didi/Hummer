<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Scroller</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">横向滚动</text>
        </view>
        <view class="item-container">
          <scroller scrollDirection="horizontal" class="scroller hori-scroller">
            <view
              class="scroller-item hori-scroller-item"
              v-for="(item, index) in verList"
              :key="index"
            >
              <text>{{ item.name }}</text>
            </view>
          </scroller>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text"
            >普通垂直滚动(带下拉刷新和加载更多)</text
          >
        </view>
        <view class="item-container">
          <scroller
            class="scroller vertical-scroller"
            @scroll="handleScroll"
            @scrollToTop="handleScrollToTop"
            @scrollToBottom="handleScrollToBottom"
            @refresh="handleRefresh"
            @loadMore="handleLoadMore"
          >
            <refresh type="refresh">
              <view class="refresh-view">
                <text>I am refresh view!</text>
              </view>
            </refresh>
            <loadmore type="loadmore">
              <view class="loadmore-view">
                <text>I am loadmore view!</text>
              </view>
            </loadmore>
            <view
              class="scroller-item vertical-scroller-item"
              v-for="(item, index) in verList"
              :key="index"
            >
              <text>{{ item.name }}</text>
            </view>
          </scroller>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">普通垂直滚动</text>
        </view>
        <view class="item-container">
          <view class="item-scroller-container">
            <text class="align-center-text"> Default </text>
            <scroller
              class="scroller vertical-scroller"
              @scroll="handleScroll"
              @scrollToTop="handleScrollToTop"
              @scrollToBottom="handleScrollToBottom"
            >
              <view
                class="scroller-item vertical-scroller-item"
                v-for="(item, index) in verList"
                :key="index"
              >
                <text>{{ item.name }}</text>
              </view>
            </scroller>
          </view>
          <view class="item-scroller-container">
            <text class="align-center-text">showScrollBar</text>
            <scroller
              class="scroller vertical-scroller"
              :showScrollBar="true"
              @scroll="handleScroll"
              @scrollToTop="handleScrollToTop"
              @scrollToBottom="handleScrollToBottom"
            >
              <view
                class="scroller-item vertical-scroller-item"
                v-for="(item, index) in verList"
                :key="index"
              >
                <text>{{ item.name }}</text>
              </view>
            </scroller>
          </view>
          <view class="item-scroller-container">
            <text class="align-center-text">bounces</text>
            <scroller
              class="scroller vertical-scroller"
              :bounces="false"
              @scroll="handleScroll"
              @scrollToTop="handleScrollToTop"
              @scrollToBottom="handleScrollToBottom"
            >
              <view
                class="scroller-item vertical-scroller-item"
                v-for="(item, index) in verList"
                :key="index"
              >
                <text>{{ item.name }}</text>
              </view>
            </scroller>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";

.scroller {
  width: 100%;
  height: 3rem;
}
.hori-scroller {
  width: 100%;
  height: 2rem;
}
.scroller-item {
  border-radius: 0.1rem;
  background-color: #fa9153;
  padding: 0 0.1rem;
  display: flex;
  justify-content: center;
}
.vertical-scroller-item {
  margin-bottom: 0.1rem;
  min-height: 0.5rem;
}
.hori-scroller-item {
  margin-right: 0.1rem;
}
.refresh-view {
  display: flex;
  justify-content: center;
}
.loadmore-view {
  display: flex;
  justify-content: center;
}
.item-container {
  display: flex;
}
.item-scroller-container {
  flex: 1;
  margin: 0.1rem;
}
.align-center-text{
  text-align: center;
}
</style>

<script>
export default {
  pageConfig: {
    canScroll: false,
  },
  data() {
    return {
      verList: Array.apply(null, new Array(10)).map((item, index) => {
        return {
          name: "Item " + index,
          index: index,
        };
      }),
    };
  },
  methods: {
    handleRefresh(state, instance) {
      console.log("下拉刷新");
      console.log("State", state);
      setTimeout(() => {
        instance.stopPullRefresh();
      }, 3000);
    },
    handleLoadMore(state, instance) {
      console.log("加载更多");
      console.log("State", state);
      setTimeout(() => {
        instance.stopLoadMore();
      }, 3000);
    },
    handleScroll(param) {
      console.log("scroll param", param);
    },
    handleScrollToTop(param) {
      console.log("scroll to top param", param);
    },
    handleScrollToBottom(param) {
      console.log("scroll to bottom param", param);
    },
  },
};
</script>