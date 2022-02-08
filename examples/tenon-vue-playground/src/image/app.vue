<template>
  <view class="page">
    <CommonPage titleText="Image" @selectBackGround="selectBackGround">
      <template v-slot:displayView>
        <image
          src="https://pt-starimg.didistatic.com/static/starimg/img/Trkwzs6DOl1642409515891.png"
          class="imageComponent"
          :resize="settingViewArray.resize.data[selectResizeIndex]"
          :style="`backgroundColor:${backgroundColor};`"
        >
        </image>
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
.imageComponent {
  width: 240;
  height: 140;
  background-color: "#15D0B4";
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
      selectResizeIndex: 0,
      settingViewArray: {
        resize: {
          groupTitle: "拉伸模式",
          type: "resize",
          selectType: "border",
          data: ["origin", "contain", "cover", "stretch"],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
      },
    };
  },
  methods: {
    select(type, index) {
      switch (type) {
        case "resize":
          this.selectResizeIndex = index;
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
    getSelectIndex(type) {
      switch (type) {
        case "resize":
          return this.selectResizeIndex;
      }
    },
    selectBackGround(backgroundColor) {
      this.backgroundColor = backgroundColor;
    },
  },
};
</script>