<template>
  <view class="page">
    <CommonPage
      titleText="通用布局样式"
      :showDefaultOption="false"
      :showDefaultLayout="false"
    >
      <template v-slot:displayView>
        <view
          class="displayView"
          :style="{
            flexDirection:
              settingViewArray.containerAttribute.flexDirection.data[
                selectFlexDirectionIndex
              ],
            justifyContent:
              settingViewArray.containerAttribute.justifyContent.data[
                selectJustifyContentIndex
              ],
            alignItems:
              settingViewArray.containerAttribute.alignItems.data[
                selectAlignItemsIndex
              ],
            alignContent:
              settingViewArray.containerAttribute.alignContent.data[
                selectAlignContentIndex
              ],
            flexWrap:
              settingViewArray.containerAttribute.flexWrap.data[
                selectFlexWrapIndex
              ],
          }"
        >
          <view
            class="itemView"
            v-for="(item, index) in viewList"
            :key="index"
            :ref="item + index"
            @tap="selectView(index)"
            :style="{ ...selectItemWithBorder(index) }"
          >
            <text
              class="itemViewText"
              :style="`width:${30 + (index % 2) * 10};height:${
                30 + (index % 2) * 10
              }`"
              >{{ index + 1 }}</text
            >
          </view>
          <CommonViewOperation
            leftText="+"
            rightText="-"
            @leftClick="addView()"
            @rightClick="removeView()"
          ></CommonViewOperation>
        </view>
      </template>
      <template v-slot:settingView>
        <view v-for="(item, key, index) in settingViewArray" :key="index">
          <text class="layoutTitle">{{
            key === "containerAttribute" ? "容器属性" : "元素属性"
          }}</text>
          <view v-for="(value, key, idx) in item" :key="idx">
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
        </view>
      </template>
    </CommonPage>
  </view>
</template>
<style lang="less" scoped>
.displayView {
  width: 100%;
  height: 180;
  background-color: #15d0b420;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  .itemView {
    background-color: #15d0b4;
    margin: 4;
    justify-content: center;
    align-items: center;
    .itemViewText {
      text-align: center;
      font-size: 14;
      color: #333333;
    }
  }
}
.layoutTitle {
  color: #000000;
  font-size: 18;
  margin-top: 32;
  margin-left: 8;
}
</style>

<script>
import CommonPage from "../component/CommonPage.vue";
import { Color } from "../common/CommonColor";
import { Style } from "../common/CommonStyle";
import CommonViewOperation from "../component/CommonViewOperation.vue";
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
      backgroundColor: "#15d0b4",
      selectFlexDirectionIndex: 0,
      selectJustifyContentIndex: 0,
      selectAlignItemsIndex: 0,
      selectAlignContentIndex: 0,
      selectFlexWrapIndex: 0,
      selectFlexGrowIndex: 0,
      selectFlexShrinkIndex: 0,
      selectFlexBasisIndex: 0,
      selectAlignSelfIndex: 0,

      settingViewArray: {
        containerAttribute: {
          flexDirection: {
            groupTitle: "FlexDirection",
            type: "flexDirection",
            selectType: "border",
            data: ["row", "column"],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
          justifyContent: {
            groupTitle: "JustifyContent",
            type: "justifyContent",
            selectType: "border",
            data: [
              "flex-start",
              "flex-end",
              "center",
              "space-between",
              "space-around",
              "space-evenly",
            ],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
          alignItems: {
            groupTitle: "AlignItems",
            type: "alignItems",
            selectType: "border",
            data: ["flex-start", "flex-end", "center", "baseline", "stretch"],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
          alignContent: {
            groupTitle: "AlignContent",
            type: "alignContent",
            selectType: "border",
            data: [
              "flex-start",
              "flex-end",
              "center",
              "space-between",
              "space-around",
              "stretch",
            ],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
          flexWrap: {
            groupTitle: "FlexWrap",
            type: "flexWrap",
            selectType: "border",
            data: ["nowrap", "wrap", "wrap-reverse"],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
        },
        elementAttribute: {
          flexGrow: {
            groupTitle: "FlexGrow",
            type: "flexGrow",
            selectType: "border",
            data: [0, 1],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
          flexShrink: {
            groupTitle: "FlexShrink",
            type: "flexShrink",
            selectType: "border",
            data: [0, 1],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
          flexBasis: {
            groupTitle: "FlexBasis",
            type: "flexBasis",
            selectType: "border",
            data: ["auto", "20", "40", "60"],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
          alignSelf: {
            groupTitle: "AlignSelf",
            type: "alignSelf",
            selectType: "border",
            data: ["flex-start", "flex-end", "center", "baseline", "stretch"],
            style: Style.SelectTextItemStyle,
            textShow: true,
          },
        },
      },
      viewList: ["view", "view", "view"],
      selectedDisplayItemViewIndex: 0,
      selectedDisplayItemView: null,
    };
  },
  mounted() {
      this.selectedDisplayItemView = this.$refs[`view${0}`];
  },
  methods: {
    select(type, index) {
      switch (type) {
        case "flexDirection":
          this.selectFlexDirectionIndex = index;
          break;
        case "justifyContent":
          this.selectJustifyContentIndex = index;
          break;
        case "alignItems":
          this.selectAlignItemsIndex = index;
          break;
        case "alignContent":
          this.selectAlignContentIndex = index;
          break;
        case "flexWrap":
          this.selectFlexWrapIndex = index;
          break;
        case "flexGrow":
          this.selectFlexGrowIndex = index;
          this.selectedDisplayItemView.style = {
            ...this.selectedDisplayItemView.style,
            flexGrow:
              this.settingViewArray.elementAttribute.flexGrow.data[
                this.selectFlexGrowIndex
              ],
          };
          break;
        case "flexShrink":
          this.selectFlexShrinkIndex = index;
          this.selectedDisplayItemView.style = {
            ...this.selectedDisplayItemView.style,
            flexShrink:
              this.settingViewArray.elementAttribute.flexShrink.data[
                this.selectFlexShrinkIndex
              ],
          };
          break;
        case "flexBasis":
          this.selectFlexBasisIndex = index;
          this.selectedDisplayItemView.style = {
            ...this.selectedDisplayItemView.style,
            flexBasis:
              this.settingViewArray.elementAttribute.flexBasis.data[
                this.selectFlexBasisIndex
              ],
          };
          break;
        case "alignSelf":
          this.selectAlignSelfIndex = index;
          this.selectedDisplayItemView.style = {
            ...this.selectedDisplayItemView.style,
            alignSelf:
              this.settingViewArray.elementAttribute.alignSelf.data[
                this.selectAlignSelfIndex
              ],
          };
          break;
      }
    },
    getStyle(type, item) {
      switch (type) {
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
    selectItemWithBorder(index) {
      return {
        borderWidth: `${index === this.selectedDisplayItemViewIndex ? 1.5 : 0}`,
        borderColor: `${
          index === this.selectedDisplayItemViewIndex
            ? Color.red
            : Color.transparent
        }`,
      };
    },
    selectView(index) {
      this.selectedDisplayItemViewIndex = index;
      this.selectedDisplayItemView = this.$refs[`view${index}`];
    },
    getSelectIndex(type) {
      switch (type) {
        case "flexDirection":
          return this.selectFlexDirectionIndex;
        case "justifyContent":
          return this.selectJustifyContentIndex;
        case "alignItems":
          return this.selectAlignItemsIndex;
        case "alignContent":
          return this.selectAlignContentIndex;
        case "flexWrap":
          return this.selectFlexWrapIndex;
        case "flexGrow":
          return this.selectFlexGrowIndex;
        case "flexShrink":
          return this.selectFlexShrinkIndex;
        case "flexBasis":
          return this.selectFlexBasisIndex;
        case "alignSelf":
          return this.selectAlignSelfIndex;
      }
    },
    addView() {
      this.viewList.push("view");
    },
    removeView() {
      this.viewList.pop();
    },
  },
};
</script>