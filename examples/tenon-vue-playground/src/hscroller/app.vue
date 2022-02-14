<template>
  <view class="page">
    <CommonPage
      titleText="HorizontalScroller"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <view class="normalContentView">
          <view class="scrollerContainer">
            <view class="scrollerWrapper">
              <scroller class="scroller1" scrollDirection="horizontal">
                <text
                  class="scroller-item"
                  v-for="(item, index) in itmeViews1"
                  :style="{ height: 30 + index * 20 }"
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
              <scroller class="scroller2" scrollDirection="horizontal">
                <text
                  class="scroller-item"
                  v-for="(item, index) in itmeViews2"
                  :style="{ height: 30 + index * 20 }"
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
          <view class="scrollerContainer">
            <view class="scrollerWrapper">
              <scroller
                class="scroller3"
                scrollDirection="horizontal"
                ref="scroller3"
              >
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
    .scrollerContainer {
      height: 25%;
      margin: 4;
      flex-shrink: 1;
      background-color: #ffffff;
      overflow: hidden;
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
    .scroller3 {
      width: 100%;
      height: 100%;
      align-self: flex-start;
    }
    .scroller-item {
      width: 30;
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
  },
};
</script>