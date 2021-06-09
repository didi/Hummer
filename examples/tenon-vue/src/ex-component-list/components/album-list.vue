<template>
  <view class="list-container">
    <ex-list
      class="list album-list"
      :data="list"
      style="mode: waterfall; column: 3"
      @refresh="handleRefresh"
      @loadMore="handleLoadMore"
    >
      <template v-slot:refresh>
        <view class="refresh-view">
          <text>Refresh View</text>
        </view>
      </template>
      <template v-slot:loadmore>
        <view class="loadmore-view">
          <text>Load More View</text>
        </view>
      </template>
      <template v-slot:item="item">
        <view class="list-item" @tap="handleItemTap(item)">
          <text>index: {{ item.index }}</text>
          <text>item: {{ item.data.name }}</text>
          <text class="default-text">I Am Default View!</text>
        </view>
      </template>
    </ex-list>
  </view>
</template>
<style lang="less" scoped>
.list-container {
  height: 100%;
  width: 100%;
}
.list {
  height: 100%;
  width: 100%;
}
.list-item {
  background-color: #fa9153;
  margin-bottom: 0.2rem;
}
.refresh-view {
  display: flex;
  justify-content: center;
}
.loadmore-view {
  display: flex;
  justify-content: center;
}
.album-list {
  item-spacing: 8;
  line-spacing: 8;
  left-spacing: 8;
  right-spacing: 8;
  top-spacing: 8;
  bottom-spacing: 34;
}
</style>
<script>
import { ListMixin } from "../mixins/base";
export default {
  name: "album-list",
  mixins: [ListMixin],
  data() {
     return {}
  },
};
</script>