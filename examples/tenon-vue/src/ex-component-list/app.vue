<template>
  <view class="page">
    <view class="demo-header">
      <text class="demo-title">Component List</text>
    </view>
    <view class="demo-container">
      <view class="demo-item">
        <view class="item-title">
          <text class="item-title-text">{{ listTitle }}</text>
        </view>
        <view class="item-container">
          <view class="list-container">
            <component :is="component"></component>
          </view>
        </view>
        <view class="operation-container">
          <button class="btn" @tap="changeListComponent('common')">
            普通列表
          </button>
          <button class="btn" @tap="changeListComponent('album')">
            瀑布流列表
          </button>
          <button class="btn" @tap="changeListComponent('custom')">
            自定义列表
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
@import "../common/assets/css/common.less";
.item-container {
  flex:1;
  max-height: 6rem;
}
.list-container{
  height: 100%;
  width: 100%;
}
.operation-container {
  margin-top: 0.1rem;
}
.btn-group {
  display: flex;
  background-color: #fa9153;
  justify-content: left;
  border-radius: 0.1rem;
}
.btn-group-item {
  padding: 0.25rem;
  text-align: center;
}
</style>

<script>
import CommonList from "./components/common-list";
import AlbumList from "./components/album-list";
import CustomList from "./components/custom-list";
export default {
  pageConfig: {
    canScroll: false,
  },
  components: {
    CommonList,
    AlbumList,
    CustomList,
  },
  data() {
    return {
      component: CommonList,
      listTitle: "普通列表",
    };
  },
  methods: {
    changeListComponent(component) {
      switch (component) {
        case "common":
          this.component = CommonList;
          this.listTitle = "普通列表";
          break;
        case "album":
          this.component = AlbumList;
          this.listTitle = "瀑布流列表";
          break;
        case "custom":
          this.component = CustomList;
          this.listTitle = "自定义列表";

          break;
        default:
          this.component = CommonList;
          break;
      }
    },
  },
};
</script>