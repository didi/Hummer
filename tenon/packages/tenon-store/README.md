# `Tenon Store`
> Fork From Vuex


作为 Tenon Vue 的 vuex 解决方案，增加上 Tenon Vue 的适配，增加多页面数据共享的逻辑处理。

### 使用说明
```
import * as Tenon from '@hummer/tenon-vue';
import {createStore} from '@hummer/tenon-store';
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

Tenon.use(store);

```
### 多页面数据共享使用说明
```
import * as Tenon from '@hummer/tenon-vue';
import {createStore,createHummerPlugin} from '@hummer/tenon-store';
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  plugins: [createHummerPlugin()]
});

Tenon.use(store);

```

