<template>
  <view class="page">
    <CommonPage
      titleText="基础动画"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <scroller class="scrollContentView">
          <view class="demo-container">
            <view class="demo-item">
              <view class="item-title" @click="cons">
                <text class="item-title-text">透明度(opacity)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animFadeOut"></view>
                  <view
                    class="box box-opacity-hide"
                    v-animation="animFadeIn"
                  ></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">旋转(rotate)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animRotation"></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">位移(position)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animTranslate"></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">放缩(scale)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animScale"></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">背景色(backgroundColor)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animBackground"></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">宽度(width)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animWidth"></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">高度(height)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animHeight"></view>
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
  repeatCount: -1, // 重复的次数（-1 无限次，0 一次，1 两次）
  easing: "linear",
};
import CommonPage from "../component/CommonPage.vue";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
  },
  data() {
    return {
      animFadeOut: {
        ...baseAnimation,
        styles: {
          opacity: 0,
        },
      },
      animFadeIn: {
        ...baseAnimation,
        styles: {
          opacity: 1,
        },
      },
      animRotation: {
        ...baseAnimation,
        styles: {
          rotationZ: 180,
        },
      },
      animTranslate: {
        ...baseAnimation,
        styles: {
          scale: 0.5,
          position: {
            x: "100hm",
            y: 0,
          },
        },
      },
      animScale: {
        ...baseAnimation,
        styles: {
          scale: 0.5,
        },
      },
      animBackground: {
        ...baseAnimation,
        styles: {
          backgroundColor: "black",
        },
      },
      animWidth: {
        ...baseAnimation,
        styles: {
          width: "1.5rem",
        },
      },
      animHeight: {
        ...baseAnimation,
        styles: {
          height: "1.5rem",
        },
      },
    };
  },
  methods: {
    cons() {
      console.log(this.animFadeOut);
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
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
.box-opacity-hide {
  opacity: 0;
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