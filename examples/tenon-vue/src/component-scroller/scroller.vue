<template>
  <view>
    <view>
      <text class="demo-title">Component Scroller!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">普通垂直滚动</text>
      <view class="demo-box">
        <scroller 
          class="scroller vertical-scroller" 
          @scroll="handleScroll"
          @scrollToTop="handleScrollToTop"
          @scrollToBottom="handleScrollToBottom"
          >
          <view class="vertical-scroller-item" v-for="(item,index) in verList" :key="index">
            <text>{{item.name}}</text>
          </view>
        </scroller>
      </view>
    </view>
        <view class="demo-item">
      <text class="demo-item-title">普通垂直滚动(带下拉刷新和加载更多)</text>
      <view class="demo-box">
        <scroller 
          class="scroller vertical-scroller" 
          @scroll="handleScroll"
          @scrollToTop="handleScrollToTop"
          @scrollToBottom="handleScrollToBottom"
          @refresh="handleRefresh"
          @loadMore="handleLoadMore"
          >
          <refresh type="refresh">
            <view>
              <text>I am refresh view!</text>
            </view>
          </refresh>
          <loadmore type="load-more">
            <view>
              <text>I am loadmore view!</text>
            </view>
          </loadmore>
          <view class="vertical-scroller-item" v-for="(item,index) in verList" :key="index">
            <text>{{item.name}}</text>
          </view>
        </scroller>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">横向滚动</text>
      <view class="demo-box">
        <scroller scroll-direction="horizontal" class="scroller hori-scroller">
          <view class="hori-scroller-item" v-for="(item,index) in verList" :key="index">
            <text>{{item.name}}</text>
          </view>
        </scroller>
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
  .scroller{
    width: 100%;
    height: 3rem;
    background-color: fuchsia;
  }
  .vertical-scroller-item{
    width: 100%;
    margin-bottom: .2rem;
    background:white;
  }
  .hori-scroller-item{
    margin-right: .2rem;
    background-color: white;
  }
</style>

<script>
export default {
  pageConfig: {
    canScroll: false
  },
  data(){
    return {
      verList: Array.apply(null, new Array(10)).map((item,index) => {
        return {
          name: 'Vertical Scroll Item ' + index,
          index: index
        }
      })
    }
  },
  methods: {
    handleRefresh(state, instance){
      console.log('下拉刷新')
      console.log('State', state)
      setTimeout(() => {
        instance.stopPullRefresh()
      }, 3000)
    },
    handleLoadMore(state, instance){
      console.log('加载更多')
      console.log('State', state)
      setTimeout(() => {
        instance.stopLoadMore()
      }, 3000)
    },
    handleScroll(param){
      console.log('scroll param', param)
    },
    handleScrollToTop(param){
      console.log('scroll to top param', param)
    },
    handleScrollToBottom(param){
      console.log('scroll to bottom param', param)
    }
  }
}
</script>