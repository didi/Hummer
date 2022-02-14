<template>
  <view class="page">
    <CommonPage titleText="Button" @selectBackGround="selectBackGround">
      <template v-slot:displayView>
        <button
          class="buttonComponent"
          :pressedStyle="{
            backgroundColor: '#FF0000',
            color: '#FFFF00',
          }"
          :disabledStyle="{
            backgroundColor: '#EEEEEE',
            color: '#CCCCCC',
          }"
          :disabled="
            settingViewArray.enable.data[selectEnableIndex] === 'disable'
          "
          :style="`backgroundColor:${backgroundColor};textAlign:${settingViewArray.textAlign.data[selectTextAlignIndex]};color:${settingViewArray.textColor.data[selectTextColorIndex]};fontSize:${settingViewArray.fontSize.data[selectFontSizeIndex]}`"
        >
          {{ `This is a Button!` }}
        </button>
      </template>
      <template v-slot:settingView>
        <view v-for="(value, key, idx) in settingViewArray" :key="idx">
          <text class="groupTitle">{{ value.groupTitle }}</text>
          <view class="groupContent">
            <text
              @tap="select(value.type, index)"
              :style="{
                ...value.style,
                ...getStyle(value.type, item),
                ...selectItemStyle(value, index),
              }"
              v-for="(item, index) in value.data"
              :key="index"
            >
              {{ value.textShow ? item : "" }}
            </text>
          </view>
        </view>
      </template>
    </CommonPage>
  </view>
</template>
<style lang="less" scoped>
.buttonComponent {
  width: 220;
  text-align: center;
  font-size: 22;
  color: #000000;
}
.groupTextAlign {
  min-width: 44;
  height: 24;
  margin-top: 6;
  margin-bottom: 6;
  margin-left: 2;
  margin-right: 2;
  background-color: #15d0b420;
  font-size: 12;
  color: #000000;
  text-align: center;
}
.groupFontColor {
  width: 36;
  height: 24;
  margin-top: 6;
  margin-bottom: 6;
}
.selectTextItemStyle {
  min-width: 44;
  height: 24;
  margin: 6;
  font-size: 12;
  color: #000000;
  text-align: center;
}
</style>

<script>
import CommonPage from "../component/CommonPage.vue";
import { Color } from "../common/CommonColor";
import { Style } from "../common/CommonStyle";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
  },
  data() {
    return {
      backgroundColor:'#15d0b4',
      selectTextColorIndex: 0,
      selectTextAlignIndex: 1,
      selectFontSizeIndex: 2,
      selectEnableIndex: 0,
      settingViewArray: {
        textAlign: {
          groupTitle: "文本对齐",
          type: "textAlign",
          selectType: "border",
          data: ["left", "center", "right"],
          style: Style.SelectColorTextItemStyle,
          textShow: true,
        },
        textColor: {
          groupTitle: "文本颜色",
          type: "textColor",
          selectType: "border",
          data: [Color.black, Color.hm_yellow, Color.hm_blue],
          style: Style.SelectColorItemStyle,
          textShow: false,
        },
        fontSize: {
          groupTitle: "文本大小",
          type: "fontSize",
          selectType: "border",
          data: [10, 16, 22, 28],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        enable: {
          groupTitle: "可用性",
          type: "enable",
          selectType: "border",
          data: ["enable", "disable"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
      },
    };
  },
  methods: {
    select(type, index) {
      switch (type) {
        case "textAlign":
          this.selectTextAlignIndex = index;
          break;
        case "textColor":
          this.selectTextColorIndex = index;
          break;
        case "fontSize":
          this.selectFontSizeIndex = index;
          break;
        case "enable":
          this.selectEnableIndex = index;
          console.log(this.settingViewArray.enable.data[this.selectEnableIndex] !== 'disable')
          break;
      }
    },
    getStyle(type, item) {
      switch (type) {
        case "textAlign":
          return { textAlign: `${item}` };
        case "textColor":
          return { backgroundColor: `${item}` };
        case "fontSize":
          return { fontSize: `${item}` };
        case "enable":
          return {
            color: `${item !== "disable" ? Color.black : Color.light_grey}`,
          };
      }
    },
    selectItemStyle(value, index) {
      switch (value.selectType) {
        case "border":
          return {
            borderWidth: `${
              this.getSelectIndex(value.type) === index ? 1.5 : 0
            }`,
            borderColor: `${
              this.getSelectIndex(value.type) === index
                ? Color.red
                : Color.transparent
            }`,
          };

        case "background":
          return {
            backgroundColor:
              this.getSelectIndex(value.type) == index
                ? Color.red
                : Color.hm_green,
          };
      }
    },
    getSelectIndex(type) {
      switch (type) {
        case "textAlign":
          return this.selectTextAlignIndex;
        case "textColor":
          return this.selectTextColorIndex;
        case "fontSize":
          return this.selectFontSizeIndex;
        case "enable":
          return this.selectEnableIndex;
      }
    },
    selectBackGround(backgroundColor){
        this.backgroundColor = backgroundColor
    },
  },
};
</script>