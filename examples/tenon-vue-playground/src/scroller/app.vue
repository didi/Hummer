<template>
  <view class="page">
    <CommonPage
      titleText="Scroller"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <view class="normalContentView">
          <view class="row1">
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <scroller class="scroller1">
                  <text
                    class="scroller-item"
                    v-for="(item, index) in itmeViews1"
                    :style="{ width: 30 + index * 20 }"
                    :key="index"
                    >{{ index.toString() }}
                  </text>
                </scroller>
              </view>
              <CommonViewOperation
                leftText="+"
                rightText="-"
                @leftClick="addView(0)"
                @rightClick="removeView(0)"
              ></CommonViewOperation>
            </view>
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <scroller class="scroller2">
                  <text
                    class="scroller-item"
                    v-for="(item, index) in itmeViews2"
                    :style="{ width: 30 + index * 20 }"
                    :key="index"
                    >{{ index.toString() }}
                  </text>
                </scroller>
              </view>
              <CommonViewOperation
                leftText="+"
                rightText="-"
                @leftClick="addView(1)"
                @rightClick="removeView(1)"
              ></CommonViewOperation>
            </view>
          </view>
          <view class="row2">
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <scroller class="scroller3" ref="scroller3">
                  <text
                    class="scroller-item"
                    v-for="(item, index) in itmeViews3"
                    :key="index"
                    >{{ index.toString() }}
                  </text>
                </scroller>
              </view>
              <CommonViewOperation
                leftText="▲"
                rightText="▼"
                @leftClick="scrollToTop()"
                @rightClick="scrollToBottom()"
              ></CommonViewOperation>
            </view>
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <scroller
                  class="scroller4"
                  @refresh="handleRefresh"
                  @loadMore="handleLoadMore"
                >
                  <refresh type="refresh">
                    <view class="refresh-view">
                      <text class="textView">{{ pullRefreshText }}</text>
                    </view>
                  </refresh>
                  <loadmore type="loadmore">
                    <view class="loadmore-view">
                      <text class="textView">{{ loadMoreText }}</text>
                    </view>
                  </loadmore>
                  <text
                    class="scroller-item"
                    v-for="(item, index) in itmeViews4"
                    :key="index"
                    >{{ index.toString() }}
                  </text>
                </scroller>
              </view>
            </view>
          </view>
        </view>
      </template>
    </CommonPage>
  </view>
</template>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  .normalContentView {
    width: 100%;
    flex-grow: 1;
    background-color: #eeeeee70;
    padding: 4;
    flex-shrink: 1;
    overflow: hidden;
    .row1 {
      flex-direction: row;
      width: 100%;
      height: 50%;
    }
    .row2 {
      flex-direction: row;
      width: 100%;
      height: 50%;
      flex-shrink: 1;
      overflow: hidden;
    }
    .scrollerContainer {
      width: 50%;
      margin: 4;
      flex-shrink: 1;
      overflow: hidden;
      background-color: #ffffff;
    }
    .scroller1 {
      background-color: #15d0b420;
      align-self: flex-start;
    }
    .scroller2 {
      width: 100%;
      height: 100%;
      background-color: #15d0b420;
    }
    .scroller3,
    .scroller4 {
      width: 100%;
      height: 100%;
      align-self: flex-start;
    }
    .refresh-view {
      width: 100%;
      height: 30;
      justify-content: center;
      align-items: center;
      background-color: #e2ed00;
      .textView {
        font-size: 12;
      }
    }
    .loadmore-view {
      width: 100%;
      height: 30;
      justify-content: center;
      align-items: center;
      background-color: #4a90e2;
      .textView {
        font-size: 12;
      }
    }
    .scroller-item {
      height: 30;
      margin: 6;
      background-color: #15d0b4;
      text-align: center;
    }
    .scrollerWrapper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<script>
import CommonViewOperation from "../component/CommonViewOperation.vue";
import CommonPage from "../component/CommonPage.vue";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonViewOperation,
    CommonPage,
  },
  data() {
    return {
      itmeViews1: [1, 1, 1],
      itmeViews2: [1, 1, 1],
      itmeViews3: new Array(20),
      itmeViews4: new Array(5),
      pullRefreshText: "PullRefreshCell",
      loadMoreText: "PullRefreshCell",
      page: 0,
    };
  },
  methods: {
    addView(index) {
      switch (index) {
        case 0:
          this.itmeViews1.push(1);
          break;
        case 1:
          this.itmeViews2.push(1);
          break;
        default:
          break;
      }
    },
    removeView(index) {
      switch (index) {
        case 0:
          this.itmeViews1.pop();
          break;
        case 1:
          this.itmeViews2.pop();
          break;
        default:
          break;
      }
    },
    scrollToTop() {
      this.$refs.scroller3.scrollToTop();
    },
    scrollToBottom() {
      this.$refs.scroller3.scrollToBottom();
    },
    handleRefresh(state, instance) {
      console.log("PullRefresh: state = " + state);
      if (state == 1) {
        this.pullRefreshText = "下拉刷新";
      } else if (state == 2) {
        this.pullRefreshText = "加载中...";
        this.page = 0;
        this.loadData(instance);
      } else if (state == 3) {
        this.pullRefreshText = "释放刷新";
      } else {
        this.pullRefreshText = "加载完成";
      }
    },
    handleLoadMore(state, instance) {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        this.loadMoreText = "加载中...";
        this.page++;
        this.loadMore(instance);
      } else if (state == 2) {
        this.loadMoreText = "没有更多数据了";
      } else {
        this.loadMoreText = "加载完成";
      }
    },
    loadMore(instance) {
      if (this.page < 5) {
        setTimeout(() => {
          instance.stopLoadMore(true);
          this.itmeViews4 = this.itmeViews4.concat([1, 1, 1, 1, 1]);
        }, 300);
      } else {
        // 到最后一页
        instance.stopLoadMore(false);
      }
    },
    loadData(instance) {
      setTimeout(() => {
        this.itmeViews4 = new Array(5);
        instance.stopPullRefresh();
      }, 300);
    },
  },
};
</script>