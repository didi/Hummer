<template>
  <view>
    <view>
      <text class="demo-title">Demo App</text>
    </view>
    <view class="list-container">
      <list-item class="list-item" v-for="(item,index) in menuList" :key="index" :url="item.url" :name="item.name"></list-item>
    </view>
  </view>
</template>
<style scoped>
  .demo-title{
    font-size: 24;
    width: 100%;
    text-align: center;
    color: #0f0;
  }
  .list-container{
    margin-top: .2rem;
    padding: 0 .2rem;
  }
  .list-item{
    border-bottom: 1px solid #eeeeff;
  }
</style>
<script>
import ListItem from './components/list-item'
import {Menu} from './assets/menu'
export default {
  pageStyle: {
    backgroundColor: "#eeffee"
  },
  components: {
    ListItem
  },
  data(){
    return {
      menuList: Menu
    }
  }
}
</script>