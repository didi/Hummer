<template>
  <view class="page">
    <view class="titleBar">
      <view class="imageWrapper" @tap="goBack">
        <image
          class="navigatorBackImage"
          resize="contain"
          src="https://pt-starimg.didistatic.com/static/starimg/img/vbcsZOJMB51642409516103.png"
        ></image>
      </view>
      <text class="titleView">{{ titleText }}</text>
      <view class="line"></view>
    </view>
    <view v-if="showDisplayLayout" class="displayLayout">
      <view
        v-if="showDefaultLayout"
        class="displayView"
        :style="`backgroundColor:${
          displayViewBackground || bgColors[0]
        };borderRadius:${displayViewRadius || cornerRadiuses[0]};borderStyle:${
          displayViewBorder || borderStyles[0]
        };borderColor:${
          selectBorderIndex === 0 ? '#00000000' : '#000000'
        };borderWidth:${selectBorderIndex === 0 ? 0 : 2};boxShadow:${
          (displayViewShadow || shadows[0]) === 'none'
            ? '0 0 0 #00000000'
            : displayViewShadow
        }`"
      >
        <slot name="displayView"> </slot>
      </view>
      <slot v-else name="displayView"> </slot>
    </view>
    <scroller v-if="showOption" class="scrollContentView">
      <template v-if="showDefaultOption">
        <text class="groupTitle">背景</text>
        <view class="groupContent">
          <text
            class="groupText"
            @tap="selectBackground(index)"
            :style="`backgroundColor:${
              index === 3 ? '#15D0B420' : item
            };borderWidth:${
              selectBackGroundIndex === index ? 1.5 : 0
            };borderColor:${
              selectBackGroundIndex === index ? '#FF0000' : '#00000000'
            }`"
            v-for="(item, index) in bgColors"
            :key="index"
          >
            {{ index === 3 ? "无" : "" }}
          </text>
        </view>
        <text class="groupTitle">圆角</text>
        <view class="groupContent">
          <view
            class="groupRadius"
            @tap="selectRadius(index)"
            :style="`borderRadius:${(item * 3) / 10};borderWidth:${
              selectRadiusIndex === index ? 1.5 : 0
            };borderColor:${
              selectRadiusIndex === index ? '#FF0000' : '#00000000'
            }`"
            v-for="(item, index) in cornerRadiuses"
            :key="index"
          >
          </view>
        </view>
        <text class="groupTitle">边框</text>
        <view class="groupContent">
          <view
            class="groupBorder"
            @tap="selectBorder(index)"
            :style="`borderStyle:${item};backgroundColor:${
              selectBorderIndex === index ? '#FF0000' : '#15D0B4'
            }`"
            v-for="(item, index) in borderStyles"
            :key="index"
          >
          </view>
        </view>
        <text class="groupTitle">阴影</text>
        <view class="groupContent">
          <view
            class="groupShadow"
            @tap="selectShadow(index)"
            :style="`boxShadow:${item};borderWidth:${
              selectShadowIndex === index ? 1.5 : 0
            };borderColor:${
              selectShadowIndex === index ? '#FF0000' : '#00000000'
            }`"
            v-for="(item, index) in shadows"
            :key="index"
          >
          </view>
        </view>
      </template>
      <slot name="settingView"> </slot>
    </scroller>
    <slot name="content"> </slot>
  </view>
</template>
<style lang="less">
.page {
  width: 100%;
  height: 100%;
  .titleBar {
    flex-direction: row;
    width: 100%;
    height: 52;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8d2;
    .imageWrapper {
      position: absolute;
      left: 0;
      width: 40;
      height: 40;
      padding: 8;
      margin-left: 4;
      .navigatorBackImage {
        width: 22;
        height: 22;
      }
    }
    .titleView {
      color: "#000000";
      font-size: 20;
    }
    .line {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #00000040;
    }
  }
  .displayLayout {
    width: 100%;
    padding: 24;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
  }
  .groupTitle {
    color: #808080;
    font-size: 14;
    margin-left: 16;
    margin-top: 24;
    margin-bottom: 4;
  }
  .groupContent {
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    background-color: #ffffff;
    // padding-left: 16;
    padding-right: 16;
    padding-top: 4;
    padding-bottom: 4;
    padding-left: 20;
    .groupText {
      font-size: 10;
      color: #000000;
      text-align: center;
      width: 36;
      height: 24;
      margin-top: 6;
      margin-bottom: 6;
    }
    .groupRadius {
      border-color: #000000;
      width: 30;
      height: 30;
      margin: 4;
      background-color: #15d0b4;
    }
    .groupBorder {
      width: 30;
      height: 30;
      margin: 4;
      background-color: #15d0b4;
      border-color: #000000;
      border-width: 1;
    }
    .groupShadow {
      width: 30;
      height: 30;
      margin: 4;
      background-color: #15d0b4;
    }
  }
  .scrollContentView {
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    background-color: #eeeeee70;
  }
  .displayView {
    overflow: hidden;
  }
}
</style>

<script>
import { Color } from "../common/CommonColor";
export default {
  props: {
    titleText: String,
    showDisplayLayout: {
      type: Boolean,
      default: true,
    },
    showOption: {
      type: Boolean,
      default: true,
    },
    showDefaultOption: {
      type: Boolean,
      default: true,
    },
    showDefaultLayout: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      bgColors: [
        Color.hm_green,
        Color.hm_yellow,
        Color.hm_linear_gradient,
        Color.transparent,
      ],
      cornerRadiuses: [0, 25, 50],
      borderStyles: ["none", "solid", "dashed", "dotted"],
      shadows: ["none", "2 2 5 #000000", "2 2 5 #FF0000", "2 2 5 #0000FF"],
      selectBackGroundIndex: 0,
      selectRadiusIndex: 0,
      selectBorderIndex: 0,
      selectShadowIndex: 0,
      displayViewBackground: null,
      displayViewRadius: null,
      displayViewBorder: null,
      displayViewShadow: null,
    };
  },
  methods: {
    selectBackground(i) {
      this.selectBackGroundIndex = i;
      this.displayViewBackground = this.bgColors[i];
      this.$emit("selectBackGround", this.displayViewBackground);
    },
    selectRadius(i) {
      this.selectRadiusIndex = i;
      this.displayViewRadius = this.cornerRadiuses[i];
    },
    selectBorder(i) {
      this.selectBorderIndex = i;
      this.displayViewBorder = this.borderStyles[i];
    },
    selectShadow(i) {
      this.selectShadowIndex = i;
      this.displayViewShadow = this.shadows[i];
    },
    goBack() {
      Navigator.popPage();
    },
  },
};
</script>