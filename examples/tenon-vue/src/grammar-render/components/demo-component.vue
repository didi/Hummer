<template>
  <text class="app">Demo Component</text>
</template>
<style lang="less" scoped>
  .app{
    color: red;
  }
</style>
<script>
  export default{
    data(){
      return {}
    },
    created(){
      console.log('Dom Created')
    }
  }
</script>