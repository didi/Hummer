<template>
  <view class="commonVerifyCodeView">
    <input
      class="inputView"
      :ref="`input${idx}`"
      v-for="(item, idx) in inputViews"
      :key="idx"
      type="number"
      :maxLength="1"
      @input="input($event, idx)"
    />
  </view>
</template>
<style lang="less" scoped>
.commonVerifyCodeView {
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  margin-top: 32;
  .inputView {
    width: 40;
    height: 40;
    border-radius: 6;
    border-width: 2;
    border-color: #15d0b4;
    text-align: center;
    font-size: 20;
    cursor-color: #15d0b4;
  }
}
</style>

<script>
export default {
  props: {},
  data() {
    return {
      inputViews: new Array(6),
    };
  },
  methods: {
    input(event, idx) {
      console.log(event, idx);
      if (event.state == 2) {
        // 输入中
        if (event.text) {
          // 有内容输入
          if (idx < this.inputViews.length - 1) {
            this.$refs[`input${idx + 1}`].focused = true;
          } else {
            this.$refs[`input${idx}`].focused = false;
          }
        } else {
          // 无内容输入
          if (idx > 0) {
            this.$refs[`input${idx - 1}`].focused = true;
          } else {
            this.$refs[`input${0}`].focused = true;
          }
        }
      }
    },
  },
};
</script>