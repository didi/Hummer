<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Store Demo Sub1</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Store Data</text>
        </view>
        <view class="item-container">
          <text>{{count}}</text>
        </view>
      </view>
            <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">Store Keys</text>
        </view>
        <view class="item-container">
          <text>{{storeKeys}}</text>
           <text>{{storeData}}</text>
        </view>
      </view>
    </view>
    <view class="operation-container">
      <button class="btn" @tap="backToMain">
        Back Main Store Page
      </button>
    </view>
  </view>
</template>
<style lang="less" scoped>
.page {
  background-color: #eeeeee;
  margin-bottom: 0.5rem;
}
.demo-header {
  padding: 0.2rem 0;
  background-color: #fa9153;
}
.demo-title {
  font-size: 0.36rem;
  width: 100%;
  text-align: center;
  color: white;
}
.demo-container {
  margin-top: 0.2rem;
}
.demo-item {
  background-color: #ffffff;
  width: 100%;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0;
}
.item-title {
  text-align: center;
}
.item-title-text {
  text-align: center;
  font-size: 0.28rem;
}
.item-container {
  margin-top: 0.2rem;
  width: 100%;
  height: .5rem;
}
.box {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  background-color: #fa9153;
  opacity: 1;
}
.box-opacity-hide{
  opacity: 0;
}
.box-flex-row {
  display: flex;
  flex-direction: row;
}
.operation-container {
  display: flex;
  justify-content: space-between;
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
</style>

<script>
import {mapState, mapActions} from '@hummer/tenon-store';

export default {
  data() {
    return {

    }
  },
  computed:{
    ...mapState(["count"]),
    storeKeys(){
      return Object.keys(this.$store.state).join(';')
    },
    storeData(){
      return JSON.stringify(this.$store.state)
    }
  },
  mounted(){
  },
  methods: {
    ...mapActions(['increment']),
    backToMain(){
      Navigator.popPage({animated: true});
    }
  }
};
</script>