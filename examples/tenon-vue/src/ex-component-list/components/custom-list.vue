<template>
  <view class="list-container">
    <ex-list
      class="list"
      :data="list"
      :register="registerType"
      @refresh="handleRefresh"
      @loadMore="handleLoadMore"
    >
      <template v-slot:refresh>
        <view>
          <text>Refresh View</text>
        </view>
      </template>
      <template v-slot:loadmore>
        <view>
          <text>Load More View</text>
        </view>
      </template>
      <template v-slot:item_0="item">
        <view class="list-item" @tap="handleItemTap(item)">
          <text>item: {{ item.data.name }}</text>
          <text class="default-text">I Am Custom Render Item 0!</text>
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
</style>
<script>
import { ListMixin } from "../mixins/base";
export default {
  name: "custom-list",
  mixins: [ListMixin],
  data() {
    return {}
  },
  methods: {
    registerType(position){
      return position % 2
    },
  }
};
</script>