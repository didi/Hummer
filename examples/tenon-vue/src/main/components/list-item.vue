<template>
  <view class="item" @tap="handleJump">
    <text class="item-title">{{name}}</text>
    <image class="item-icon" :src="iconRight"></image>
  </view>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      icon: 'https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg',
      iconRight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAASBJREFUWAntljsOwjAMhglcoHNmzsVQ0WwMSAyIAwADF2iKOvRczMy9QbClWkKoqurEEUjYQ+02D3/501hZLNRUAVVAFfiuAoabvq7rvTHmEELonHMniAN3jqn+y6nGsbYBxkLbsWmaO4CxFzU2L31jA6EyNBjiUhqKvTpUZIAoCQxUa6uq2kpsHxsIIXJCRQHlhIoGygWVBJQDKhlIGop97BHg0/B0DaespTYsCd77M73P9SJAmAyhiqJw4B+UHOINxXO9GBCWgr7vPfg1JYe4o3iu/7l/KBkIlZGs3ElA0jC4rdFAOWCigXLBRAHlhEGgFT44Zq29QP8djYFaI3b1wDnZdei92EnDRAHBlt0A5AmDr1KXMgRRUwVUgb9V4AWYNdeAJyzFDAAAAABJRU5ErkJggg==',
    }
  },
  methods: {
    handleJump(){
      let pageInfo = {
        url: `${this.url}`,
        animated: true
      };
      console.log('pageInfo:', JSON.stringify(pageInfo))
      Navigator.openPage(pageInfo, (result) => {
          console.log('Page result: ' + JSON.stringify(result));
      });
    }
  }
}
</script>

<style scoped>
  .item{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    height: 1rem;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
  .item-title{
    flex: 1;
    color: blue;
    text-align: center;
  }
  .item-icon{
    width: .36rem;
    height: .36rem;
    resize: cover;
    margin-right: .2rem;
  }
</style>