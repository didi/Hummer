# Tenon Vue

Tenon Vue 是 Hummer Vue 的核心运行时，用于 Tenon Vue 项目中使用。

## Tenon Vue 使用用例
```js
// entry.js
import * as Tenon from '@hummer/tenon-vue';
import app from './app';

Tenon.render(app);
```

```vue
<template>
  <view class="page">
    <text class="slogan">{{slogan}}</text>
  </view>
</template>
<style lang="less" scoped>
  .page{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slogan{
    font-size: 0.42rem;
  }
</style>

<script>

export default {
  pageConfig: {
    canScroll: false
  },
  data(){
    return {
      slogan: '~ Hello Tenon ~'
    }
  },
  methods: {
  }
}
</script>
```
