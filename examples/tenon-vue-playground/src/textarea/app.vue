<template>
  <view class="page">
    <CommonPage titleText="TextArea" @selectBackGround="selectBackGround">
      <template v-slot:displayView>
        <textarea
          class="textareaComponent"
          ref="textarea"
          placeholder="This is a TextArea!"
          :rows="settingViewArray.textLineClamp.data[selectTextLineClampIndex]"
          :focused="settingViewArray.focus.data[selectFocusIndex] === 'focus'"
          :maxLength="settingViewArray.maxLength.data[selectMaxLengthIndex]"
          :type="settingViewArray.types.data[selectTypesIndex]"
          :returnKeyType="
            settingViewArray.returnKeyTypes.data[selectReturnKeyTypesIndex]
          "
          :style="`backgroundColor:${backgroundColor};textAlign:${settingViewArray.textAlign.data[selectTextAlignIndex]};color:${settingViewArray.textColor.data[selectTextColorIndex]};placeholderColor:${settingViewArray.placeholderColor.data[selectPlaceholderColorIndex]};cursorColor:${settingViewArray.cursorColor.data[selectCursorColorIndex]};fontSize:${settingViewArray.fontSize.data[selectFontSizeIndex]};`"
        />
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
.inputComponent {
  width: 220;
  background-color: #15d0b4;
  text-align: center;
  font-size: 22;
  color: #000000;
  placeholder-color: #00000060;
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
      backgroundColor: "#15d0b4",
      selectTextLineClampIndex: 0,
      selectTextColorIndex: 0,
      selectTextAlignIndex: 1,
      selectPlaceholderColorIndex: 0,
      selectCursorColorIndex: 0,
      selectFontSizeIndex: 2,
      selectMaxLengthIndex: 0,
      selectTypesIndex: 0,
      selectReturnKeyTypesIndex: 0,
      selectFocusIndex: 1,
      selectEnableIndex: 0,
      settingViewArray: {
        textLineClamp: {
          groupTitle: "文本行数",
          type: "textLineClamp",
          selectType: "border",
          data: [0, 1, 2, 3],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
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
        placeholderColor: {
          groupTitle: "占位提示文本颜色",
          type: "placeholderColor",
          selectType: "border",
          data: [Color.transparent_grey, Color.hm_yellow, Color.hm_blue],
          style: {
            width: 36,
            height: 20,
            marginTop: 8,
            marginBottom: 8,
          },
          textShow: false,
        },
        cursorColor: {
          groupTitle: "光标颜色",
          type: "cursorColor",
          selectType: "border",
          data: [Color.black, Color.hm_yellow, Color.hm_blue],
          style: {
            width: 36,
            height: 20,
            marginTop: 8,
            marginBottom: 8,
          },
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
        maxLength: {
          groupTitle: "最大输入长度",
          type: "maxLength",
          selectType: "border",
          data: [0, 3, 6, 9],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        types: {
          groupTitle: "键盘类型",
          type: "types",
          selectType: "border",
          data: ["default", "number", "tel", "email", "password"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        returnKeyTypes: {
          groupTitle: "键盘返回按钮类型",
          type: "returnKeyTypes",
          selectType: "border",
          data: ["done", "go", "next", "search", "send"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        focus: {
          groupTitle: "焦点",
          type: "focus",
          selectType: "border",
          data: ["focus", "unfocus"],
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
        case "textLineClamp":
          this.selectTextLineClampIndex = index;
          break;
        case "textAlign":
          this.selectTextAlignIndex = index;
          break;
        case "textColor":
          this.selectTextColorIndex = index;
          break;
        case "placeholderColor":
          this.selectPlaceholderColorIndex = index;
          break;
        case "cursorColor":
          this.selectCursorColorIndex = index;
          break;
        case "fontSize":
          this.selectFontSizeIndex = index;
          break;
        case "maxLength":
          this.selectMaxLengthIndex = index;
          break;
        case "types":
          this.selectTypesIndex = index;
          break;
        case "returnKeyTypes":
          this.selectReturnKeyTypesIndex = index;
          break;
        case "focus":
          this.selectFocusIndex = index;
          break;
        case "enable":
          this.selectEnableIndex = index;
          this.$refs.textarea.element.enabled =
            this.settingViewArray.enable.data[this.selectEnableIndex] !==
            "disable";
          break;
      }
    },
    getStyle(type, item) {
      switch (type) {
        case "textAlign":
          return { textAlign: `${item}` };
        case "textColor":
        case "placeholderColor":
        case "cursorColor":
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
        case "enable":
          return {
            color: `${item !== "disable" ? Color.black : Color.light_grey}`,
          };
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
        case "textLineClamp":
          return this.selectTextLineClampIndex;
        case "textAlign":
          return this.selectTextAlignIndex;
        case "textColor":
          return this.selectTextColorIndex;
        case "placeholderColor":
          return this.selectPlaceholderColorIndex;
        case "cursorColor":
          return this.selectCursorColorIndex;
        case "fontSize":
          return this.selectFontSizeIndex;
        case "maxLength":
          return this.selectMaxLengthIndex;
        case "types":
          return this.selectTypesIndex;
        case "returnKeyTypes":
          return this.selectReturnKeyTypesIndex;
        case "focus":
          return this.selectFocusIndex;
        case "enable":
          return this.selectEnableIndex;
      }
    },
    selectBackGround(backgroundColor) {
      this.backgroundColor = backgroundColor;
    },
  },
};
</script>