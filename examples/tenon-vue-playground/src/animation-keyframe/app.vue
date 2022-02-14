<template>
  <view class="page">
    <CommonPage
      titleText="帧动画"
      :showDisplayLayout="false"
      :showOption="false"
    >
      <template v-slot:content>
        <scroller class="scrollContentView">
          <view class="demo-container">
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">透明度(opacity)</text>
              </view>
              <view class="item-container">
                <view class="box-container">
                  <view class="box" v-animation="animFadeOut"></view>
                  <view class="box" v-animation="animFadeIn"></view>
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
                  <view class="box" v-animation="animTranslateBack"></view>
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
                  <view class="box" v-animation="animScaleBack"></view>
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
                  <view class="box" v-animation="animBackgroundBack"></view>
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
                  <view class="box" v-animation="animWidthBack"></view>
                </view>
              </view>
            </view>
            <view class="demo-item">
              <view class="item-title">
                <text class="item-title-text">高度(height)</text>
              </view>
              <view class="item-container">
                <view class="box-container box-flex-row">
                  <view class="box" v-animation="animHeight"></view>
                  <view class="box" v-animation="animHeightBack"></view>
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
  easing: "linear", // 过渡函数类型
  onStart: () => {
    // 动画开始
    console.log("Animation Start!");
  },
  onEnd: () => {
    // 动画结束
    console.log("Animation End By Animation!");
  },
};
import CommonPage from "../component/CommonPage.vue";
export default {
  components: {
    CommonPage,
  },
  data() {
    return {
      animFadeOut: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              opacity: 1,
            },
            percent: 0,
          },
          {
            styles: {
              opacity: 0,
            },
            percent: 1,
          },
        ],
      },
      animFadeIn: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              opacity: 0,
            },
            percent: 0,
          },
          {
            styles: {
              opacity: 1,
            },
            percent: 1,
          },
        ],
      },
      animRotation: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              rotationZ: 0,
            },
            percent: 0,
          },
          {
            styles: {
              rotationZ: 180,
            },
            percent: 1,
          },
        ],
      },
      animTranslate: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              position: {
                x: 0,
                y: 0,
              },
            },
            percent: 0,
          },
          {
            styles: {
              position: {
                x: "1rem",
                y: 0,
              },
            },
            percent: 0.5,
          },
          {
            styles: {
              position: {
                x: 0,
                y: 0,
              },
            },
            percent: 1,
          },
        ],
      },
      animTranslateBack: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              position: {
                x: "1rem",
                y: 0,
              },
            },
            percent: 0,
          },
          {
            styles: {
              position: {
                x: "0",
                y: 0,
              },
            },
            percent: 1,
          },
        ],
      },
      animScale: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              scale: 0,
            },
            percent: 0,
          },
          {
            styles: {
              scale: 1,
            },
            percent: 1,
          },
        ],
      },
      animScaleBack: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              scale: 1,
            },
            percent: 0,
          },
          {
            styles: {
              scale: 0,
            },
            percent: 1,
          },
        ],
      },
      animBackground: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              backgroundColor: "#FA9153",
            },
            percent: 0,
          },
          {
            styles: {
              backgroundColor: "black",
            },
            percent: 1,
          },
        ],
      },
      animBackgroundBack: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              backgroundColor: "black",
            },
            percent: 0,
          },
          {
            styles: {
              backgroundColor: "#FA9153",
            },
            percent: 1,
          },
        ],
      },
      animWidth: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              width: "1rem",
            },
            percent: 0,
          },
          {
            styles: {
              width: "1.5rem",
            },
            percent: 1,
          },
        ],
      },
      animWidthBack: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              width: "1.5rem",
            },
            percent: 0,
          },
          {
            styles: {
              width: "1rem",
            },
            percent: 1,
          },
        ],
      },
      animHeight: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              height: "1rem",
            },
            percent: 0,
          },
          {
            styles: {
              height: "1.5rem",
            },
            percent: 1,
          },
        ],
      },
      animHeightBack: {
        ...baseAnimation,
        keyframes: [
          {
            styles: {
              height: "1.5rem",
            },
            percent: 0,
          },
          {
            styles: {
              height: "1rem",
            },
            percent: 1,
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
.box-opacity-hide {
  opacity: 0;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
.operation-container {
  display: flex;
  justify-content: space-between;
}
.btn {
  flex: 1;
  margin: 0 0.2rem;
  height: 0.8rem;
  text-align: center;
  color: white;
  background: #fa9153;
  border-radius: 10px;
}

.warning-text {
  color: red;
  padding: 0 0.2rem;
}
</style>