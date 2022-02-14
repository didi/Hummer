<template>
  <view class="page">
    <CommonPage titleText="Text">
      <template v-slot:displayView>
        <text
          class="textComponent"
          :style="`textAlign:${
            settingViewArray.textAlign.data[selectTextAlignIndex]
          };color:${
            settingViewArray.textColor.data[selectTextColorIndex]
          };fontSize:${
            settingViewArray.fontSize.data[selectFontSizeIndex]
          };fontWeight:${
            settingViewArray.fontStyle.data[selectFontStyleIndex] === 'bold' ||
            settingViewArray.fontStyle.data[selectFontStyleIndex] ===
              'bold & italic'
              ? 'bold'
              : 'normal'
          };fontStyle:${
            settingViewArray.fontStyle.data[selectFontStyleIndex] ===
              'italic' ||
            settingViewArray.fontStyle.data[selectFontStyleIndex] ===
              'bold & italic'
              ? 'italic'
              : 'normal'
          };textDecoration:${
            settingViewArray.textDecoration.data[selectTextDecorationIndex]
          };textOverflow:${
            settingViewArray.textOverflow.data[selectTextOverflowIndex]
          };textLineClamp:${
            settingViewArray.textLineClamp.data[selectTextLineClampIndex]
          };letterSpacing:${
            settingViewArray.letterSpacing.data[selectLetterSpacingIndex]
          };lineSpacingMulti:${
            settingViewArray.lineSpacing.data[selectLineSpacingIndex]
          }`"
        >
          {{
            `This is a Text!\nThis is a Text!\nThis is a Text!\nThis is a Text!`
          }}
        </text>
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
.textComponent {
  width: 220;
  //   background-color: #15d0b4;
  text-align: center;
  font-size: 22;
  color: #000000;
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
      selectTextColorIndex: 0,
      selectTextAlignIndex: 1,
      selectFontSizeIndex: 2,
      selectFontStyleIndex: 0,
      selectTextDecorationIndex: 0,
      selectTextOverflowIndex: 0,
      selectTextLineClampIndex: 0,
      selectLetterSpacingIndex: 0,
      selectLineSpacingIndex: 1,
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
        fontStyle: {
          groupTitle: "文本样式",
          type: "fontStyle",
          selectType: "border",
          data: ["normal", "bold", "italic", "bold & italic"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        textDecoration: {
          groupTitle: "文本装饰",
          type: "textDecoration",
          selectType: "border",
          data: ["none", "underline", "line-through"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        textOverflow: {
          groupTitle: "文本装饰",
          type: "textOverflow",
          selectType: "border",
          data: ["ellipsis", "clip"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        textLineClamp: {
          groupTitle: "文本行数",
          type: "textLineClamp",
          selectType: "border",
          data: [0, 1, 2, 3],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        letterSpacing: {
          groupTitle: "字间距",
          type: "letterSpacing",
          selectType: "border",
          data: [0, 1, 2, 3],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        lineSpacing: {
          groupTitle: "行间距",
          type: "lineSpacing",
          selectType: "border",
          data: [0.5, 1, 1.5, 2],
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
        case "fontStyle":
          this.selectFontStyleIndex = index;
          break;
        case "textDecoration":
          this.selectTextDecorationIndex = index;
          break;
        case "textOverflow":
          this.selectTextOverflowIndex = index;
          break;
        case "textLineClamp":
          this.selectTextLineClampIndex = index;
          break;
        case "letterSpacing":
          this.selectLetterSpacingIndex = index;
          break;
        case "lineSpacing":
          this.selectLineSpacingIndex = index;
          break;
      }
    },
    getStyle(type, item) {
      switch (type) {
        case "textAlign":
          return { textAlign: `${item}` };
        case "textColor":
          return { backgroundColor: `${item}` };
        case "fontStyle":
          return {
            fontWeight: `${
              item === "bold" || item === "bold & italic" ? "bold" : "normal"
            }`,
            fontStyle: `${
              item === "italic" || item === "bold & italic"
                ? "italic"
                : "normal"
            }`,
          };
        case "textDecoration":
          return { textDecoration: `${item}` };
        default:
          return {};
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
                ? "#FF0000"
                : "#00000000"
            }`,
          };

        case "background":
          return {
            backgroundColor:
              this.getSelectIndex(value.type) == index ? "#FF0000" : "#15D0B4",
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
        case "fontStyle":
          return this.selectFontStyleIndex;
        case "textDecoration":
          return this.selectTextDecorationIndex;
        case "textOverflow":
          return this.selectTextOverflowIndex;
        case "textLineClamp":
          return this.selectTextLineClampIndex;
        case "letterSpacing":
          return this.selectLetterSpacingIndex;
        case "lineSpacing":
          return this.selectLineSpacingIndex;
      }
    },
  },
};
</script>