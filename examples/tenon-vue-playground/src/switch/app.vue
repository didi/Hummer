<template>
  <view class="page">
    <CommonPage titleText="Switch" ref="commonPage" @selectBackGround="selectBackGround">
      <template v-slot:displayView>
        <switch
          class="switchComponent"
          :value="settingViewArray.check.data[selectCheckIndex] !== '关'"
          :openColor="settingViewArray.onColor.data[selectOnColorIndex]"
          :closeColor="settingViewArray.offColor.data[selectOffColorIndex]"
          :thumbColor="settingViewArray.thumbColor.data[selectThumbColorIndex]"
        >
        </switch>
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
  mounted() {
    this.$refs.commonPage.selectBackground(3)
  },
  data() {
    return {
      backgroundColor: "#15d0b4",
      selectThumbColorIndex: 2,
      selectOnColorIndex: 0,
      selectOffColorIndex: 1,
      selectCheckIndex: 0,
      settingViewArray: {
        thumbColor: {
          groupTitle: "滑块颜色",
          type: "thumbColor",
          selectType: "border",
          data: [Color.hm_green, Color.hm_yellow, Color.hm_blue],
          style: Style.SelectColorItemStyle,
          textShow: false,
        },
        onColor: {
          groupTitle: "打开时的颜色",
          type: "onColor",
          selectType: "border",
          data: [Color.hm_green, Color.hm_yellow, Color.hm_blue],
          style: Style.SelectColorItemStyle,
          textShow: false,
        },
        offColor: {
          groupTitle: "关闭时的颜色",
          type: "offColor",
          selectType: "border",
          data: [Color.hm_green, Color.hm_yellow, Color.hm_blue],
          style: Style.SelectColorItemStyle,
          textShow: false,
        },
        check: {
          groupTitle: "开关",
          type: "check",
          selectType: "border",
          data: ["开", "关"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
      },
    };
  },
  methods: {
    select(type, index) {
      switch (type) {
        case "thumbColor":
          this.selectThumbColorIndex = index;
          break;
        case "onColor":
          this.selectOnColorIndex = index;
          break;
        case "offColor":
          this.selectOffColorIndex = index;
          break;
        case "check":
          this.selectCheckIndex = index;
          break;
      }
    },
    getStyle(type, item) {
      switch (type) {
        case "thumbColor":
        case "offColor":
        case "onColor":
          return { backgroundColor: `${item}` };
        case "check":
          return { color: `${item !== "关" ? Color.black : Color.light_grey}` };
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
        case "thumbColor":
          return this.selectThumbColorIndex;
        case "onColor":
          return this.selectOnColorIndex;
        case "offColor":
          return this.selectOffColorIndex;
        case "check":
          return this.selectCheckIndex;
      }
    },
    selectBackGround(backgroundColor) {
      this.backgroundColor = backgroundColor;
    },
  },
};
</script>