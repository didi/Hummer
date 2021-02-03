<template>
  <view>
    <view>
      <text class="demo-title">Component Text!</text>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">普通文本</text>
      <view class="demo-box">
        <text>我是普通的文本</text>
      </view>
    </view>
    <view class="demo-item">
      <text class="demo-item-title">富文本</text>
      <view class="demo-box">
        <text :rich-text="richText"></text>
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
  .image-item{
    width: 2rem;
    height: 2rem;
  }
</style>

<script>
export default {
  data(){
    return {
      text: '',
      richText: [   {
        text: "1111",
        color: '#00FF00',
        fontSize: '40',
        href: 'http://www.baidu.com',
        hrefColor: '#0000FF',
    },
    {
        text: "2222", //相当于图片显示前的占位文本
        color: '#00FF00',
        fontSize: '16',
        image: "http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg",
        imageWidth: 100,
        imageHeight: 100,
        imageAlign: 'center',
    },
    {
        text: "3333",
        image: 'ic_loading',
        imageWidth: 20,
        imageHeight: 20,
        imageAlign: 'center',
        color: '#0000FF',
        fontSize: '10',
    }]
    }
  },
  mounted(){
    setTimeout(() => {

    this.richText = [   {
        text: "www.baidu.com",
        color: '#00FF00',
        fontSize: '40',
        href: 'http://www.baidu.com',
        hrefColor: '#0000FF',
    },
    {
        text: "2222", //相当于图片显示前的占位文本
        color: '#00FF00',
        fontSize: '16',
        image: "http://b-ssl.duitang.com/uploads/item/201503/08/20150308143143_wCVJF.jpeg",
        imageWidth: 100,
        imageHeight: 100,
        imageAlign: 'center',
    },
    {
        text: "3333",
        image: 'ic_loading',
        imageWidth: 20,
        imageHeight: 20,
        imageAlign: 'center',
        color: '#0000FF',
        fontSize: '10',
    }]
    }, 2000)
  }
}
</script>