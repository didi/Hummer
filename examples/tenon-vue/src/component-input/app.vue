<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component Input</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Input</text>
        </view>
        <view class="item-container">
          <input class="input" v-model="value"/>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Input(placeholder)</text>
        </view>
        <view class="item-container">
          <input class="input input-place" placeholder="我是PlaceHolder" />
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Input(focused)</text>
        </view>
        <view class="item-container">
          <input class="input input-place" :focused="focused" />
        </view>
        <view class="operation-container">
          <button class="btn" @tap="toggleFocus">Change Input Focus</button>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Input(MaxLength)</text>
        </view>
        <view class="item-container">
          <input class="input" :maxLength="maxLength" />
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Input(type)</text>
          <text class="item-title-text">type: {{ type }}</text>
        </view>
        <view class="item-container">
          <input class="input" :type="type" />
        </view>
        <view class="operation-container">
          <button class="btn" @tap="handleChangeType">Change Input Type</button>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Input(returnKeyType)</text>
          <text class="item-title-text"
            >returnKeyType: {{ returnKeyType }}</text
          >
        </view>
        <view class="item-container">
          <input class="input" :returnKeyType="returnKeyType" />
        </view>
        <view class="operation-container">
          <button class="btn" @tap="handleChangeKeyType">
            Change ReturnKey Type
          </button>
        </view>
      </view>
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Input事件</text>
        </view>
        <view class="item-container">
          <input
            class="input"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @confirm="handleConfirm"
          />
        </view>
      </view>
    </view>
  </view>
</template>


<script>
let i = 0;
let types = ["default", "number", "tel", "email", "password"];
let returnTypes = ["done", "go", "next", "search", "send"];
export default {
  data() {
    return {
      focused: false,
      maxLength: 10,
      type: "email",
      returnKeyType: "done",
      value: 'Init Value'
    };
  },
  methods: {
    toggleFocus() {
      this.focused = !this.focused;
    },
    handleChangeType() {
      this.type = types[i++ % 5];
    },
    handleChangeKeyType() {
      this.returnKeyType = returnTypes[i++ % 5];
    },
    handleInput({ value, text, state }) {
      console.log("Input Event:", value, text, state);
    },
    handleChange(value) {
      console.log("Change Event:", value);
    },
    handleFocus() {
      console.log("Focus Event:");
    },
    handleBlur(value) {
      console.log("Blur Event:");
    },
    handleConfirm(value) {
      console.log("Confirm Event:", value);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/assets/css/common.less";

.input {
  width: 100%;
  background-color: #eeffee;
  height: 0.5rem;
}
.input-place {
  placeholder-color: blue;
  cursor-color: #eedeee;
  placeholder-font-size: 0.24rem;
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
.demo-box {
  margin-top: 0.2rem;
}
</style>