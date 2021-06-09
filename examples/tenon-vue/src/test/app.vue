<template>
  <view v-rtl>
    <text class="group-date-text" v-rtl="'text'" @tap="clickOne('1')">Hello Tenon</text>
  </view>
</template>
<style lang="less" scoped>
.text{
  border: 5px solid  black;
}
</style>

<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    clickOne(text){
      console.log('click', text)
    }
  }
}
</script>