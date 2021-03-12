<template>
  <view>
    <view>
      <text class="demo-title">Component Input!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Input</text>
      <view class="demo-box">
        <input class="input"/>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Input 含有placeholder</text>
      <view class="demo-box">
         <input 
          class="input input-place" 
          placeholder="我是PlaceHolder" 
          />
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Input设定focused</text>
      <view class="demo-box">
        <input class="input" :focused="focused"/>
        <text class="btn" @tap="toggleFocus">Toggle Focus</text>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Input设定max</text>
      <view class="demo-box">
        <input class="input" :max-length="maxLength"/>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Input设定type</text>
      <view class="demo-box">
        <text>当前Type:{{type}}</text>
        <input class="input" :type="type"/>
        <button @tap="handleChangeType">Change Input Type</button>
      </view>
    </view>
     <view class="demo-item">
      <text class="demo-item-title">Input设定ReturnKeyType</text>
      <view class="demo-box">
        <text>当前Return Key:{{returnKeyType}}</text>
        <input class="input" :return-key-type="returnKeyType"/>
        <button @tap="handleChangeKeyType">Change ReturnKey Type</button>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Input事件测试</text>
      <view class="demo-box">
        <input class="input" 
          @input="handleInput" 
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"/>
      </view>
    </view>
  </view>
</template>


<script>
let i = 0;
let types = ['default','number','tel','email','password']
let returnTypes = ['done' ,'go' ,'next','search' ,'send']
export default {
  data(){
    return {
      focused: false,
      maxLength: 10,
      type: 'email',
      returnKeyType: 'done'
    }
  },
  methods: {
    toggleFocus(){
      this.focused = !this.focused
    },
    handleChangeType(){
      this.type = types[i++%5]
    },
    handleChangeKeyType(){
      this.returnKeyType = returnTypes[i++%5]
    },
    handleInput({value,text, state}){
      console.log('Input Event:', value,text, state)
    },
    handleChange(value){
      console.log('Change Event:', value)
    },
    handleFocus(value){
      console.log('Focus Event:', value)
    },
     handleBlur(value){
      console.log('Blur Event:', value)
    },
     handleConfirm(value){
      console.log('Confirm Event:', value)
    }
  }
}
</script>

<style lang="less" scoped>
  .demo-title{
    font-size: .36rem;
    width: 100%;
    text-align: center;
  }
  .input{
    width: 100%;
    background-color: aquamarine;
    height: .5rem;
  }
  .input-place{
   placeholder-color: blue;
   cursor-color: #eedeee;
   placeholder-font-size: .24rem;
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
  .demo-box{
    margin-top: .2rem;
  }
</style>