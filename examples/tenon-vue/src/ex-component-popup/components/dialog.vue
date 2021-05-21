<template>
  <view>
    <ex-popup :show="show">
      <view class="dialog-wrapper">
        <view >
          <view class="wrapper">
            <text>{{title}}</text>
          </view>
          <button class="btn" @tap="closeDialog">关闭</button>
        </view>
      </view>

    </ex-popup>
  </view>
</template>
<style lang="less" scoped>
.dialog-wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper{
  width: 3rem;
  height: 4rem;
  border-radius: .1rem;
  background-color: #fa9153;
}
.btn{
   background-color: #fa9153;
   margin-top: .2rem;
   border-radius: .05rem;
}
</style>
<script>
export default {
  props: {
    show:{
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Popup'
    }
  },
  methods: {
    closeDialog(){
      this.$emit('close')
    }
  }
}
</script>