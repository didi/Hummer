<template>
  <div class="page">
    <my-button>
      Button Content
    </my-button>
  </div>
</template>
<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text{
  font-size: .36rem;
}
</style>
<script>
import MyButton from './components/button.vue'
export default {
  components: {
    MyButton
  }
}
</script>