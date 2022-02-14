<template>
  <view class="page">
    <CommonPage titleText="List" :showDisplayLayout="false" :showOption="false">
      <template v-slot:content>
        <view class="normalContentView">
          <view class="viewPagerContainer">
            <ex-viewpager
              class="viewpager1"
              ref="viewpager1"
              :data="list"
              :loopInterval="2000"
              :canLoop="true"
              :autoPlay="true"
              @itemclick="
                (position) => {
                  handleItemClick(position, 1);
                }
              "
              @pageChange="
                (current, total) => {
                  handlePageChange(current, total, 1);
                }
              "
            >
              <template v-slot:item="item">
                <image
                  class="banner-image"
                  resize="cover"
                  :src="item.data"
                ></image>
              </template>
            </ex-viewpager>
          </view>
          <view class="viewPagerContainer">
            <ex-viewpager
              class="viewpager2"
              ref="viewpager2"
              :data="colors"
              :loopInterval="2000"
              @itemclick="
                (position) => {
                  handleItemClick(position, 2);
                }
              "
              @pageChange="
                (current, total) => {
                  handlePageChange(current, total, 2);
                }
              "
            >
              <template v-slot:item="item">
                <text
                  class="banner-text"
                  :style="{ backgroundColor: item.data }"
                  >{{ item.index }}</text
                >
              </template>
            </ex-viewpager>
            <CommonViewOperation
              leftText="1"
              rightText="3"
              @leftClick="leftClick('viewpager2')"
              @rightClick="rightClick('viewpager2')"
            ></CommonViewOperation>
          </view>
          <view class="viewPagerContainer">
            <ex-viewpager
              class="viewpager3"
              ref="viewpager3"
              :data="list"
              :loopInterval="2000"
              :itemSpacing="20"
              :edgeSpacing="40"
              :canLoop="true"
              :autoPlay="true"
              @itemclick="
                (position) => {
                  handleItemClick(position, 3);
                }
              "
              @pageChange="
                (current, total) => {
                  handlePageChange(current, total, 3);
                }
              "
            >
              <template v-slot:item="item">
                <image
                  class="banner-image"
                  resize="cover"
                  :src="item.data"
                ></image>
              </template>
            </ex-viewpager>
          </view>
          <view class="viewPagerContainer">
              <ex-viewpager
              class="viewpager4"
              ref="viewpager4"
              :data="colors"
              :loopInterval="2000"
              :itemSpacing="20"
              :edgeSpacing="40"
              :canLoop="true"
              @itemclick="
                (position) => {
                  handleItemClick(position, 3);
                }
              "
              @pageChange="
                (current, total) => {
                  handlePageChange(current, total, 3);
                }
              "
            >
              <template v-slot:item="item">
                <text
                  class="banner-text"
                  :style="{ backgroundColor: item.data }"
                  >{{ item.index }}</text
                >
              </template>
            </ex-viewpager>
            <CommonViewOperation
              leftText="1"
              rightText="3"
              @leftClick="leftClick('viewpager4')"
              @rightClick="rightClick('viewpager4')"
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
    padding: 8;
    flex-shrink: 1;
    overflow: hidden;
    .viewPagerContainer {
      height: 25%;
      margin: 8;
      flex-shrink: 1;
      overflow: hidden;
      background-color: #ffffff;
      justify-content: center;
      align-items: center;
      .viewpager1,
      .viewpager2,
      .viewpager3,
      .viewpager4 {
        width: 100%;
        height: 100%;
        .banner-image {
          width: 100%;
          height: 100%;
        }
        .banner-text {
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 30;
        }
      }
      .viewpager2 {
        border-radius: 20;
      }
      .viewpager3,.viewpager4 {
        background-color: #15d0b420;
        .banner-image {
          border-radius: 20;
        }
      }
    }
  }
}
</style>

<script>
import CommonViewOperation from "../component/CommonViewOperation.vue";
import CommonPage from "../component/CommonPage.vue";
import { Color } from "../common/CommonColor";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
    CommonViewOperation,
  },
  data() {
    return {
      list: [
        "https://pt-starimg.didistatic.com/static/starimg/img/WjRyAMkJbL1607860816543.jpg",
        "https://pt-starimg.didistatic.com/static/starimg/img/jEv0wHEGSj1607860825566.png",
        "https://pt-starimg.didistatic.com/static/starimg/img/5IR0XHVxGa1607861443454.png",
      ],
      colors: [
        Color.hm_green,
        Color.hm_yellow,
        Color.hm_blue,
        Color.hm_orange,
        Color.hm_purple,
      ],
    };
  },
  methods: {
    handlePageChange(current, total, index) {
      console.log(
        `ViewPager${index} onPageChange, index: ${current + 1} + "/" + ${total}`
      );
    },
    handleItemClick(position, index) {
      console.log(`ViewPager${index} onItemClick, position:${position}`);
    },
    leftClick(name) {
      this.$refs[name].setCurrentItem(1);
    },
    rightClick(name) {
      this.$refs[name].setCurrentItem(3);
    },
  },
};
</script>