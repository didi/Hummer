<template>
  <view class="page">
    <CommonPage
      titleText="次序动画"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <scroller class="scrollContentView">
          <view class="demo-container">
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">透明度(opacity) & 位移</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animStep"></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">位移</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="translateStep"></view>
                </view>
              </view>
            </view>
          </view>
        </scroller>
      </template>
    </CommonPage>
  </view>
</template>
<script>
const baseAnimation = {
  duration: 3000, // 动画持续时间，单位 ms
  repeatCount: 0, // 次序动画repeatCount不能为-1 无限次
  easing: "linear",
};
import CommonPage from "../component/CommonPage.vue";
export default {
  components: {
    CommonPage,
  },
  data() {
    return {
      animStep: {
        steps: [
          {
            ...baseAnimation,
            onStart: () => {
              console.log("Animation1 Start!");
            },
            onEnd: () => {
              console.log("Animation1 End!");
            },
            styles: {
              opacity: 0,
              position: {
                x: "100hm",
                y: 0,
              },
            },
          },
          {
            ...baseAnimation,
            onStart: () => {
              console.log("Animation2 Start!");
            },
            onEnd: () => {
              console.log("Animation2 End!");
            },
            styles: {
              opacity: 1,
              position: {
                x: "500hm",
                y: 0,
              },
            },
          },
        ],
      },
      translateStep: {
        steps: [
          {
            ...baseAnimation,
            onStart: () => {
              console.log("Animation3 Start!");
            },
            onEnd: () => {
              console.log("Animation3 End!");
            },
            styles: {
              // opacity: 0,
              position: {
                x: "100hm",
                y: 0,
              },
            },
          },
          {
            ...baseAnimation,
            onStart: () => {
              console.log("Animation4 Start!");
            },
            onEnd: () => {
              console.log("Animation4 End!");
            },
            styles: {
              // opacity: 1,
              // position 基于初始位置
              position: {
                x: "400hm",
                y: 0,
              },
            },
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.page {
  background-color: #eeeeee;
}
.demo-item {
  background-color: #ffffff;
  width: 100%;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0;
}
.item-title {
  text-align: center;
}
.item-title-text {
  text-align: center;
  font-size: 0.28rem;
}
.item-container {
  margin-top: 0.2rem;
}
.box {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: #fa9153;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
.warning-text {
  color: red;
  padding: 0 0.2rem;
}
</style>