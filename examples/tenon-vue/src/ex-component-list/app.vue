<template>
  <view>
    <view>
      <text class="demo-title">Component List!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">普通列表</text>
      <view class="demo-box">
        <ex-list
          class="list"
          :data="list"
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
          <template v-slot:item="item">
            <view class="list-item" @tap="handleItemTap(item)">
              <text>index: {{item.index}}</text>
              <text>item: {{item.data.name}}</text>
              <text class="default-text">I Am Default View!</text>
            </view>
          </template>
        </ex-list>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">瀑布流列表</text>
      <view class="demo-box">
        <ex-list
          class="list album-list "
          :data="list"
          style="mode:waterfall;column:3;"
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
          <template v-slot:item="item">
            <view class="list-item" @tap="handleItemTap(item)">
              <text>index: {{item.index}}</text>
              <text>item: {{item.data.name}}</text>
              <text class="default-text">I Am Default View!</text>
            </view>
          </template>
        </ex-list>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">自定义渲染列表</text>
      <view class="demo-box">
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
              <text>item: {{item.data.name}}</text>
              <text class="default-text">I Am Custom Render Item 0!</text>
            </view>
          </template>
          <template v-slot:item="item">
            <view class="list-item" @tap="handleItemTap(item)">
              <text>index: {{item.index}}</text>
              <text>item: {{item.data.name}}</text>
              <text class="default-text">I Am Default View!</text>
            </view>
          </template>
        </ex-list>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
  .demo-title{
    font-size: .36rem;
    width: 100%;
    text-align: center;
  }
  .demo-item-image{
    font-size: .24rem;
    width: 100%;
  }
  .demo-box{
    margin-top: .2rem;
  }
  .list{
    width: 100%;
    height: 5rem;
  }
  .list-item{
    height: 1.5rem;
    background-color: #00ffff;
    margin-bottom: 0.2rem;
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
export default {
  pageConfig:{
    canScroll: false
  },
  data(){
    return {
      page: 0,
       list: Array.apply(null, new Array(20)).map((item, index) => {
        return {
          index: index,
          name: "Index-" + index,
        };
      })
    }
  },
  mounted(){
    console.log('hello world')
  },
  methods: {
    registerType(position){
      return position % 2
    },
    handleRefresh(state, list){
      console.log('state', state)
      if(state === 1){
        console.log('下拉刷新')
      }else if(state === 2){
        console.log('加载中')
        this.refreshList(list)
      }else {
        console.log('加载完毕')
      }
    },
    handleLoadMore( state, list){
      console.log('state:', state)
      if(state === 0){
        console.log('上拉加载')
      }else if(state === 1){
        console.log('加载中...')
        this.loadMoreData(list)
      }else {
        console.log('加载完成')
      }
    },
    refreshList(list){
      setTimeout(() => {
        this.list = Array.apply(null, new Array(10)).map((item, index) => {
          return {
            index: index,
            name: "Index Refresh - " + index,
          };
        })
        list.stopPullRefresh()
      }, 2000)
    },
    loadMoreData(list){
      setTimeout(() => {
        this.page++;
        this.list = this.list.concat(Array.apply(null, new Array(10)).map((item, index) => {
          let i = this.page * 10 + index
          return {
            index: i,
            name: "Index Refresh - " + i,
          };
        }))
        if(this.page >= 3){
          list.stopLoadMore(false)
        }else {
          list.stopLoadMore(true)
        }
      }, 500)
    }
  }
}
</script>