<template>
  <view>
    <view>
      <text class="demo-title">Component Textarea!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea</text>
      <view class="demo-box">
        <textarea class="textarea"></textarea>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea 含有placeholder</text>
      <view class="demo-box">
         <textarea 
          class="textarea input-place" 
          placeholder="我是PlaceHolder" 
          />
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea设定focused</text>
      <view class="demo-box">
        <textarea class="textarea" :focused="focused"/>
        <button @tap="handleFocus">Toggle Focus</button>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea设定max</text>
      <view class="demo-box">
        <textarea class="textarea" :max-length="maxLength"/>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea设定type</text>
      <view class="demo-box">
        <text>当前Type:{{type}}</text>
        <textarea class="textarea" :type="type"/>
        <button @tap="handleChangeType">Change Textarea Type</button>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea设定ReturnKeyType</text>
      <view class="demo-box">
        <text>当前Return Key:{{returnKeyType}}</text>
        <textarea class="textarea" :return-key-type="returnKeyType"/>
        <button @tap="handleChangeKeyType">Change ReturnKey Type</button>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea设定Rows</text>
      <view class="demo-box">
        <textarea class="textarea" rows="2"/>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">Textarea事件测试</text>
      <view class="demo-box">
        <textarea class="textarea" 
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
      type: 'default',
      returnKeyType: 'done'
    }
  },
  methods: {
    handleFocus(){
      this.focused = !this.focused
    },
    handleChangeType(){
      this.type = types[i++%5]
    },
    handleChangeKeyType(){
      this.returnKeyType = returnTypes[i++%5]
    },
    handleInput({value, state}){
      console.log('Input Event:', value)
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
  .textarea{
    width: 100%;
    background-color: aquamarine;
  }
  .input-place{
   placeholder-color: blue;
   cursor-color: #eedeee;
   placeholder-font-size: .24rem;
  }

  .demo-box{
    margin-top: .2rem;
  }
</style>