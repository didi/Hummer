<template>
  <view class="page">
    <CommonPage
      titleText="通用视图样式"
      :showDisplayLayout="false"
      :showDefaultOption="false"
    >
      <template v-slot:settingView>
        <view v-for="(value, key, idx) in viewArray" :key="idx">
          <text class="groupTitle">{{ value.groupTitle }}</text>
          <view class="groupContent">
            <view v-for="(item, index) in value.data" :key="index">
              <template v-if="item.type === 'view'">
                <view
                  :style="{
                    ...item.style,
                  }"
                >
                  <view v-for="(child, idx) in item.children" :key="idx">
                    <template v-if="child.type === 'view'">
                      <view
                        :style="{
                          ...child.style,
                        }"
                      >
                      </view>
                    </template>
                    <text
                      v-else-if="child.type === 'text'"
                      :style="{
                        ...child.style,
                      }"
                    >
                      {{ child.text && child.text }}
                    </text>
                  </view>
                </view>
              </template>
              <text
                v-else-if="item.type === 'text'"
                :style="{
                  ...item.style,
                }"
              >
                {{ item.text && item.text }}
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
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonPage,
  },
  data() {
    return {
      viewArray: {
        background: {
          groupTitle: "背景",
          type: "view",
          data: [
            { type: "view", style: { ...Style.SquareItemStyle }, children: [] },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                backgroundColor: Color.hm_linear_gradient,
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                backgroundImage:
                  "https://pt-starimg.didistatic.com/static/starimg/img/Trkwzs6DOl1642409515891.png",
              },
              children: [],
            },
          ],
        },
        borderShadow: {
          groupTitle: "边框 & 阴影",
          type: "view",
          data: [
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                ...Style.ItemBorderStyle,
                ...Style.ItemShadowStyle,
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                ...Style.ItemBorderStyle,
                ...Style.ItemShadowStyle,
                borderStyle: "dashed",
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                ...Style.ItemBorderStyle,
                ...Style.ItemShadowStyle,
                borderStyle: "dotted",
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                ...Style.ItemBorderLeftStyle,
                ...Style.ItemBorderTopStyle,
                ...Style.ItemBorderRightStyle,
                ...Style.ItemBorderBottomStyle,
                ...Style.ItemShadowStyle,
                backgroundColor: Color.hm_linear_gradient,
                borderLeftColor: "#FF0080",
                borderTopColor: "#FF8000",
                borderRightColor: "#0080FF",
                borderBottomColor: "#008000",
                borderLeftWidth: 4,
                borderTopWidth: 6,
                borderRightWidth: 8,
                borderBottomWidth: 6,
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                ...Style.ItemBorderLeftStyle,
                ...Style.ItemBorderTopStyle,
                ...Style.ItemBorderRightStyle,
                ...Style.ItemBorderBottomStyle,
                ...Style.ItemShadowStyle,
                backgroundColor: Color.hm_linear_gradient,
                borderLeftColor: "#FF0080",
                borderTopColor: "#FF8000",
                borderRightColor: "#0080FF",
                borderBottomColor: "#008000",
                borderLeftWidth: 4,
                borderTopWidth: 6,
                borderRightWidth: 8,
                borderBottomWidth: 6,
                borderTopLeftRadius: 12,
                borderBottomRightRadius: 12,
              },
              children: [],
            },
          ],
        },
        cornerRadiusShadow: {
          groupTitle: "圆角 & 阴影",
          type: "view",
          data: [
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                ...Style.ItemShadowStyle,
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                ...Style.ItemShadowStyle,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.RoundItemStyle,
                ...Style.ItemShadowStyle,
              },
              children: [],
            },
            {
              type: "view",
              style: {
                ...Style.CircleItemStyle,
                ...Style.ItemShadowStyle,
                backgroundColor: Color.hm_linear_gradient,
              },
              children: [],
            },
          ],
        },
        opacity: {
          groupTitle: "透明度",
          type: "view",
          selectType: "border",
          data: [
            {
              type: "text",
              style: {
                ...Style.SquareItemStyle,
                ...Style.SmallTextStyle,
                opacity: 0.8,
              },
              text: "80%",
              children: [],
            },
            {
              type: "text",
              style: {
                ...Style.SquareItemStyle,
                ...Style.SmallTextStyle,
                opacity: 0.2,
              },
              text: "20%",
              children: [],
            },
          ],
          style: Style.SelectTextItemStyle,
          textShow: true,
        },
        visibility: {
          groupTitle: "可见性",
          type: "view",
          data: [
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                width: "100",
                backgroundColor: "#00A0FF",
              },
              children: [
                {
                  type: "text",
                  text: "display: 'none'",
                  style: {
                    ...Style.SmallTextStyle,
                    backgroundColor: Color.hm_yellow,
                  },
                },
                {
                  type: "text",
                  text: "normal",
                  style: {
                    ...Style.SmallTextStyle,
                    backgroundColor: Color.hm_green,
                  },
                },
              ],
            },
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                width: "100",
                backgroundColor: Color.hm_blue,
              },
              children: [
                {
                  type: "text",
                  text: "visibility: 'hidden'",
                  style: {
                    ...Style.SmallTextStyle,
                    backgroundColor: Color.hm_yellow,
                  },
                },
                {
                  type: "text",
                  text: "normal",
                  style: {
                    ...Style.SmallTextStyle,
                    backgroundColor: Color.hm_green,
                  },
                },
              ],
            },
          ],
        },
        overflow: {
          groupTitle: "Overflow",
          type: "view",
          data: [
            {
              type: "view",
              style: {
                ...Style.SquareItemStyle,
                justifyContent: "center",
              },
              children: [
                {
                  type: "view",
                  style: {
                    width: 40,
                    height: 30,
                    backgroundColor: Color.hm_yellow,
                    marginLeft: 16,
                  },
                },
              ],
            },
          ],
        },
        zIndex: {
          groupTitle: "ZIndex",
          type: "view",
          data: [
            {
              type: "view",
              style: {
                flexDirection: "row",
                alignItems: "center",
              },
              children: [
                {
                  type: "view",
                  style: {
                    ...Style.SquareItemStyle,
                  },
                },
                {
                  type: "view",
                  style: {
                    width: 40,
                    height: 30,
                    backgroundColor: Color.hm_yellow,
                    marginLeft: -28,
                  },
                },
              ],
            },
          ],
        },
      },
      visibleTime: null,
      zIndexTime: null,
      visibilityTime: null,
      visible: true,
      zIndex: true,
      show:true,
    };
  },
  mounted() {
    this.visibleTime = setInterval(() => {
      this.viewArray.overflow.data[0].style = {
        overflow: this.visible ? "hidden" : "visible",
      };
      this.visible = !this.visible;
    }, 1000);
    this.zIndexTime = setInterval(() => {
      this.viewArray.zIndex.data[0].children[1].style = {
        zIndex: this.zIndex ? -1 : 1,
      };
      this.zIndex = !this.zIndex;
    }, 1000);
    this.visibilityTime = setInterval(() => {
      this.viewArray.visibility.data[0].children[0].style = { display: this.show ? 'none' : 'flex' };
      this.viewArray.visibility.data[1].children[0].style =  { visibility: this.show ? 'hidden' : 'visible' };
      this.show = !this.show;
    }, 1000);
  },
  destroyed() {
    clearInterval(this.visibleTime);
    clearInterval(this.zIndexTime);
  },
  methods: {},
};
</script>