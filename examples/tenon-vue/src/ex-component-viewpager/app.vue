<template>
  <view>
    <view>
      <text class="demo-title">Component Viewpager!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">普通 ViewPager</text>
      <view class="demo-box">
        <view class="operate-area">
          <text class="btn" @tap="handleDecrease">减小</text>
          <text>{{index}}</text>
          <text class="btn" @tap="handleIncrease">增加</text>
        </view>
        <ex-viewpager
          class="banner"
          ref="viewpager"
          :data="list"
          :itemSpacing="10"
          :edgeSpacing="50"
          :scaleFactor="0.99"
          :alphaFactor="1"
          @itemclick="handleItemClick"
          @pageChange="handlePageChange"
          @pageScroll="handlePageScroll"
          @pageScrollStateChange="handlePageScrollStateChange"
        >
          <template v-slot:item="item">
            <text>{{item.index}}</text>
            <view class="banner-item"  @tap="handleClickTap(item)">
              <image class="banner-image" :src="item.data.url"></image>
            </view>
          </template>
        </ex-viewpager>
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped>
  .operate-area{
    display: flex;
  }
  .btn{
    background-color: blueviolet;
    padding: .1rem;
  }
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
  .image-item{
    width: 2rem;
    height: 2rem;
  }
  .banner{
    width: 100%;
    height: 3rem;
  }
  .banner-image{
    width: 100%;
    height: 100%;
  }
</style>

<script>
const ImageData = [
  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3207781657,3460758070&fm=27&gp=0.jpg",
  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg",
  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3464499095,1074840881&fm=27&gp=0.jpg",
];
export default {
  data(){
    return {
      index: 0,
      list: Array.apply(null, new Array(3)).map((item, index) => {
        return {
          url: ImageData[2 - index % 3],
          index: index
        };
      })
    }
  },
  watch:{
    index(){
      this.$refs.viewpager.setCurrentItem(this.index)
    }
  },
  methods: {
    handleIncrease(){
      if(this.index >= this.list.length){
        return
      }
      this.index ++;
    },
    handleDecrease(){
      if(this.index <= 0){
        return
      }
      this.index --;
    },
    handleClickTap(data){
      console.log('Data')
      // Toast.show(JSON.stringify(data))
    },
    handleItemClick(position){
      console.log('Item Click', position)
    },
    handlePageChange(current,total){
      console.log('Page Change', current, total)
    },
    handlePageScroll(position,percent){
      // console.log('Page Scroll', position, percent)
    },
    handlePageScrollStateChange(state){
      console.log('Page Scroll State', state)
    }
  }
}
</script>