# Tenon React

Tenon React 是 Hummer React 的核心运行时，在 Tenon React 项目中使用。

## 动画
Hummer 动画支持两种动画方式，分别为 `Basic Animation` `KeyFrame Animation`,为了满足写顺序动画的需求，Tenon 侧增加了 `Step Animation`。

支持的动画类型
- [Basic Animation](https://hummer.didi.cn/doc-tenon#/zh-CN/animation_basic)
- [KeyFrame Animation](https://hummer.didi.cn/doc-tenon#/zh-CN/animation_frame)
- [Step Animation](https://hummer.didi.cn/doc-tenon#/zh-CN/animation_step)

### 如何使用

Tenon React 支持两种动画方式，分别是属性传递和Hook的方式.
#### Plan1. 属性传递
Tenon React 中动画通过 animation属性来实现，将动画对象传递给 animation属性即可。
例如： <view animation={animationObject}></view>
> Tips: `animationObject` 动画对象可参考基础动画、关键帧动画、次序动画的实现。

> Tips: 该方式，组件创建后会立即执行动画。

#### Plan2. `useAnimation` Hook
通过`useAnimation`钩子，可以异步操作动画执行.

使用用例如下：
```javascript
import {useAnimation} from '@hummer/tenon-react';

function SyncAnimation(){
  let [animationRef, startAnimation] = useAnimation(animationObject)
  return (
    <>
      <view class="box" ref={animationRef}></view>
      <text class="btn" onTap={() => startAnimation()}>开始动画</text>
    </>
  )
}
```
`animationRef` 引用需要绑定到需要执行动画的视图上，`startAnimation` 方法控制何时开始执行动画。
> Tips: `animationObject` 动画对象可参考基础动画、关键帧动画、次序动画的实现。

## 页面配置
Tenon Render 时，支持修改页面的默认配置。

现在支持的配置
| 属性名      |    类型 |  默认值  |  备注  | 
| :-------- | --------:| :--: | :--: |
| canScroll  | Boolean |  true   | 是否允许页面滚动|
| pageStyle     |   Style Object |  {}  | 页面容器的样式 |


> Warning: `canScroll` 设定为页面滚动后，页面中如果再次添加 `Scroller` 容器，会产生冲突。如果有使用 `Scroller` 的需求，请将 `canScroll` 设定为 `false`。

> Warning: `pageStyle`需要是标准的 Hummer Style Object，属性值符合 Hummer 样式规范。[Hummer 文档传送门](https://hummer.didi.cn/doc#/zh-CN/normal_view_style)

示例
```javascript
  import React from "react"
  import * as  Tenon from "@hummer/tenon-react"

  import App from "./App"
  import "./App.less"

  Tenon.render(<App />, {
    canScroll: false, // 禁止滚动
    pageStyle: { // 全局页面样式
      backgroundColor: '#f3ffff'
    }
  })
```
具体效果可以参照：[Git Example](https://github.com/didi/Hummer/tree/master/examples/tenon-react/src/page-config)

## 生命周期
### 组件生命周期
组件生命周期同 React 标准生命周期，可以参考 [React 文档](https://reactjs.org/docs/state-and-lifecycle.html)。
### 页面生命周期
页面的生命周期与 Native 相关，可以通过调用 API 自行注册对应的 Listener，监听生命周期的变化。

页面生命周期包括：
- onLoad
- onShow
- onHide
- onUnload
- onBack

#### onLoad
触发时机
- 页面首次加载时触发


> Warning: 从其它页面返回当当前页面时，不会触发 onLoad 生命周期
#### onShow
触发时机
- 页面首次加载时触发
- App从后台切到前台
- 页面通过路由返回

#### onHide
触发时机
- 页面跳转或关闭
- App 切到后台


#### onUnload
触发时机
- 页面容器关闭
#### onBack
`onBack`生命周期，可以通过返回值控制是否返回拦截

触发时机
- 路由返回时触发
> 任意注册的 onBack 生命周期函数，返回 `true`， 将会拦截页面返回。


![Tenon 生命周期时序图](https://dpubstatic.udache.com/static/dpubimg/3abead1a-1bbb-4ca9-b1bf-c6c0960a68a7.png)
### API
#### usePageEvent(eventName, callback)
Page 生命周期 hook

```javascript
import {usePageEvent} from '@hummer/tenon-react'

usePageEvent('onShow', () => {
  console.log('on show)
})
```

