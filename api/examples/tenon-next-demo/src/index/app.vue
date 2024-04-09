<template>
  <view class="page">
    <image
      @click="imageClick"
      :style=imageStyle
      src="https://pt-starimg.didistatic.com/static/starimg/img/9E6O0ZOwok1604372834424.png">
    </image>
   <text>12312312312312312321</text> 
   <button>11111</button>
  </view>
</template>

<style lang="less" scoped>
  .page{
    background-color: '#fa9153';
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script>

export default {
  pageConfig: {
    canScroll: false
  },
  data(){
    return {
      slogan: '~ Hello Tenon ~',
      imageStyle: 'width:200;'
    }
  },
  methods: {
    imageClick() {
      this.imageStyle = 'width: 400;'
    }
  }
}
</script>