<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Demo App</text>
    </view>
    <view class="list-container">
      <view class="list-box" v-for="(menu, index) in menus" :key="index">
        <text class="list-box-title">{{ menu.title }}</text>
        <view class="list-box-container">
          <list-item
            class="list-item"
            v-for="(item, index) in menu.items"
            :key="index"
            :url="item.url"
            :name="item.name"
          ></list-item>
        </view>
      </view>
    </view>
  </view>
</template>
<style scoped>
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
.list-container {
  margin-top: 0.2rem;
  padding: 0 0.2rem;
}
.list-box {
  background-color: #ffffff;
  margin-top: .2rem;
  padding: .2rem;
}
.list-box-title{
  font-size: .32rem;
  text-align: center;
  margin-bottom: .2rem;
}
.list-item {
  border-top: 1px solid #eeeeff;
  border-bottom: 1px solid #eeeeff;
}
</style>
<script>
import ListItem from "./components/list-item";
import { Menu } from "./assets/menu";
export default {
  pageStyle: {
  },
  components: {
    ListItem,
  },
  data() {
    return {
      menus: Menu
    };
  },
};
</script>