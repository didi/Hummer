<template>
  <view class="page">
    <CommonPage titleText="List" :showDisplayLayout="false" :showOption="false">
      <template v-slot:content>
        <view class="normalContentView">
          <view class="row1">
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <ex-list
                  class="list1"
                  style="mode: list"
                  :data="itmeViews1"
                  @refresh="
                    (state, instance) => {
                      handleRefresh(state, instance, 0);
                    }
                  "
                  :register="registerType"
                  @loadMore="
                    (state, instance) => {
                      handleLoadMore(state, instance, 0);
                    }
                  "
                >
                  <template v-slot:refresh>
                    <view class="refresh-view">
                      <text class="textView">{{ pullRefreshText[0] }}</text>
                    </view>
                  </template>
                  <template v-slot:loadmore>
                    <view class="loadmore-view">
                      <text class="textView">{{ loadMoreText[0] }}</text>
                    </view>
                  </template>
                  <template v-slot:item_0>
                    <view
                      class="listItem"
                      :style="{ backgroundColor: '#00ff0040' }"
                    >
                      <text class="textView">{{ `It\'s a title` }}</text>
                    </view>
                  </template>
                  <template v-slot:item="item">
                    <view class="listItem">
                      <text class="textView">{{ item.index }}</text>
                    </view>
                  </template>
                </ex-list>
              </view>
            </view>
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <ex-list
                  class="list2"
                  style="mode: grid; column: 4"
                  :data="itmeViews2"
                  @refresh="
                    (state, instance) => {
                      handleRefresh(state, instance, 1);
                    }
                  "
                  @loadMore="
                    (state, instance) => {
                      handleLoadMore(state, instance, 1);
                    }
                  "
                >
                  <template v-slot:refresh>
                    <view class="refresh-view">
                      <text class="textView">{{ pullRefreshText[1] }}</text>
                    </view>
                  </template>
                  <template v-slot:loadmore>
                    <view class="loadmore-view">
                      <text class="textView">{{ loadMoreText[1] }}</text>
                    </view>
                  </template>
                  <template v-slot:item="item">
                    <view class="listItem">
                      <text class="gridTextView">{{ item.index }}</text>
                    </view>
                  </template>
                </ex-list>
              </view>
            </view>
          </view>
          <view class="row2">
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <ex-list
                  class="list3"
                  style="mode: waterfall; column: 3"
                  :data="itmeViews3"
                  @refresh="
                    (state, instance) => {
                      handleRefresh(state, instance, 2);
                    }
                  "
                  @loadMore="
                    (state, instance) => {
                      handleLoadMore(state, instance, 2);
                    }
                  "
                >
                  <template v-slot:refresh>
                    <view class="refresh-view">
                      <text class="textView">{{ pullRefreshText[2] }}</text>
                    </view>
                  </template>
                  <template v-slot:loadmore>
                    <view class="loadmore-view">
                      <text class="textView">{{ loadMoreText[2] }}</text>
                    </view>
                  </template>
                  <template v-slot:item="item">
                    <view class="listItem">
                      <text
                        class="gridTextView"
                        :style="{ height: randomHeight() }"
                        >{{ item.index }}</text
                      >
                    </view>
                  </template>
                </ex-list>
              </view>
            </view>
            <view class="scrollerContainer">
              <view class="scrollerWrapper">
                <ex-list
                  class="list1"
                  style="mode: list;scrollDirection:horizontal"
                  :data="itmeViews4"
                  @refresh="
                    (state, instance) => {
                      handleRefresh(state, instance, 3);
                    }
                  "
                  :register="registerType"
                  @loadMore="
                    (state, instance) => {
                      handleLoadMore(state, instance, 3);
                    }
                  "
                >
                  <template v-slot:refresh>
                    <view class="refresh-view">
                      <text class="textView">{{ pullRefreshText[3] }}</text>
                    </view>
                  </template>
                  <template v-slot:loadmore>
                    <view class="loadmore-view">
                      <text class="textView">{{ loadMoreText[3] }}</text>
                    </view>
                  </template>
                  <template v-slot:item="item">
                    <view class="horizontalListItem">
                      <text class="horizontalTextView">{{ item.index }}</text>
                    </view>
                  </template>
                </ex-list>
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
    .list1 {
      width: 100%;
      height: 100%;
      line-spacing: 4;
      top-spacing: 8;
      left-spacing: 8;
      right-spacing: 8;
      bottom-spacing: 8;
    }
    .list2,
    .list3 {
      width: 100%;
      height: 100%;
      line-spacing: 4;
      item-spacing: 4;
      top-spacing: 8;
      left-spacing: 8;
      right-spacing: 8;
      bottom-spacing: 8;
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
    .listItem {
      background-color: #15d0b4;
      .textView {
        height: 30;
        text-align: center;
      }
      .gridTextView {
        height: 40;
        text-align: center;
      }
    }
    .horizontalListItem {
      height: 100%;  
      width: 30;
      background-color: #15d0b4;
      .horizontalTextView {
        width: 30;
        height: 100%;
        text-align: center;
      }
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
      itmeViews1: new Array(20),
      itmeViews2: new Array(20),
      itmeViews3: new Array(20),
      itmeViews4: new Array(20),
      pullRefreshText: [
        "PullRefreshCell",
        "PullRefreshCell",
        "PullRefreshCell",
      ],
      loadMoreText: ["PullRefreshCell", "PullRefreshCell", "PullRefreshCell"],
      page1: 0,
      page2: 0,
      page3: 0,
      TYPE_TITLE: 1,
      TYPE_ITEM: 2,
      ITEM_COUNT: 20,
    };
  },
  methods: {
    registerType(position) {
      return position % 2;
    },
    handleRefresh(state, instance, index) {
      console.log("PullRefresh: state = " + state, index);
      if (state == 1) {
        this.pullRefreshText[index] = "下拉刷新";
      } else if (state == 2) {
        this.pullRefreshText[index] = "加载中...";
        this.loadData(instance, index);
      } else if (state == 3) {
        this.pullRefreshText[index] = "释放刷新";
      } else {
        this.pullRefreshText[index] = "加载完成";
      }
    },
    handleLoadMore(state, instance, index) {
      console.log("LoadMore: state = " + state);
      if (state == 1) {
        this.loadMoreText[index] = "加载中...";
        switch (index) {
          case 0:
            this.page1++;
            this.loadMore(instance, index, this.page1);
            break;
          case 1:
            this.page2++;
            this.loadMore(instance, index, this.page2);
            break;
          case 2:
            this.page3++;
            this.loadMore(instance, index, this.page3);
            break;
        }
      } else if (state == 2) {
        this.loadMoreText[index] = "没有更多数据了";
      } else {
        this.loadMoreText[index] = "加载完成";
      }
    },
    loadMore(instance, index, page) {
      if (page < 5) {
        setTimeout(() => {
          instance.stopLoadMore(true);
          switch (index) {
            case 0:
              this.itmeViews1 = this.itmeViews1.concat(new Array(20));
              break;
            case 1:
              this.itmeViews2 = this.itmeViews2.concat(new Array(20));
              break;
            case 2:
              this.itmeViews3 = this.itmeViews3.concat(new Array(20));
              break;
          }
        }, 300);
      } else {
        // 到最后一页
        instance.stopLoadMore(false);
      }
    },
    loadData(instance, index) {
      setTimeout(() => {
        switch (index) {
          case 0:
            this.itmeViews1 = new Array(20);
            this.page1 = 0;
            break;
          case 1:
            this.itmeViews2 = new Array(20);
            this.page2 = 0;
            break;
          case 2:
            this.itmeViews3 = new Array(20);
            this.page3 = 0;
            break;
        }
        instance.stopPullRefresh();
      }, 300);
    },
    randomHeight() {
      return Math.random() * 80 + 40;
    },
  },
};
</script>