# 如何拓展一个视图标签

### 背景

在tenon中我们提供了一些基础和高级视图组件，但在一些开发场景中，有一些样式或者组件基于tenon/hummer实现非常复杂,hummer提出了一种原生模块导出机制，可以将hummer不易实现的复杂交互通过原生实现并导出为hummer视图类，而tenon作为hummer的上层，想要对接端基于原生导出的hummer视图组件，这时候就需要我们手动去拓展一个tenon视图标签。

### 原理
tenon设计之初，就在框架内部开放了一种组件适配机制，开发者通过tenon-core对外暴露的base类通过类继承的方式就可以快速的对接一个端原生导出的hummer组件。

####
我们先看下base类的结构
```javascript
...
/**
 * 通用节点Base类
 */
let __view_id = 0;
export class Base {
  // 属性定义
  
  public element: any = null; // 用于指向端原生导出的hummer组件视图类的实例

  ...

  constructor() {
    this.__view_id = __view_id++
  }

  // disable style等属性存取
  ...

  // Mounted 生命周期
  protected onMounted(){
    
  }

  // Destoryed 生命周期
  protected onDestoryed(){

  }

  _appendChild(child: Base) {
    ...
    child._onMounted()
    child.onMounted()
  }

  private unlinkSiblings() {
    ...
  }

  _removeChild(child: Base) {
    ...
  }

  _insertBefore(child: Base, anchor: Base) {
    ...
    // 插入元素
    if(this.element && child.element && anchor.element){
      this.element.insertBefore(child.element, anchor.element)
      child._onMounted()
      child.onMounted();
    }
  }



  /**
   * 设定属性
   * @param key 属性名
   * @param value 属性值
   */
  setAttribute(key:string, value: any){
    key.search(/^data-/) === 0 && key.split('data-')[1] && (this.dataset[key.split('data-')[1]] = value);
    this.props.set(key, value)

    switch(key){
      case 'disabled':
        this.disabled = value
        break;
      case 'class': 
        this.updateStyle()
        break;
      default:
        this._setAttribute(key, value)
        break;
    }
  }

  /**
   * 允许自定义组件覆盖
   * @param key 
   * @param value 
   */
  protected _setAttribute(key:string, value: any){

  }


  /**
   * 动画处理
   */
  handleAnimation(animation: Animation){
    if((animation as KeyframeAnimation).keyframes){
      handleKeyframeAnimation(this, animation as KeyframeAnimation)
    }
    if((animation as BasicAnimation).styles){
      handleBasicAnimation(this, animation as BasicAnimation)
    }
    if((animation as StepAnimation).steps){
      handleStepAnimation(this, animation as StepAnimation)
    }
  }
  
  /**
   * 事件绑定
   */
  addEventListener(event: string, func:Function){
    this.element.addEventListener(event, (e:any) => {
      e = {
        ...e,
        target: {
          dataset: this.dataset
        }
      }
      func.call(this, e)
    })
  }
  
  removeEventListener(event: string, func?:Function){
    this.element.removeEventListener(event, func)
  }
  
  ...
}
```

可以看到base类实现了视图组件的属性、事件监听、节点操作、生命周期、动画等通用节点特性，
Base类是tenon中视图节点的基类，tenon内部提供的基础和高级视图节点类都是Base的派生类，同时我们将Base类对外暴露，开发者通过类继承的方式得到自己的自定义视图子类，然后通过tenon提供的一套组件注册机制即可拓展一个自定义的tenon视图标签

#### 
下面我们通过`Tenon Vue`内部组件`button`为例 看看我们是如何将端原生导出的`button`类对接成`Tenon Vue`的`button`类


```
export class Button extends Base{
  __NAME = NODE_BUTTON
  private _text: string = ''
  constructor(){
    super()
    this.element = new ButtonComponent()
  }
  setElementText(text: string){
    this.text = text
  }

  // 按钮文案
  get text(){
    return this._text
  }
  set text(text:string){
    this._text = text
    this.element.text = text
  }

  set pressedStyle(style: Record<string, string>){
    this.element.pressed = styleTransformer.transformStyle(style, this) || {}
  }

  set disabledStyle(style: Record<string, string>){
    this.element.disabled = styleTransformer.transformStyle(style, this) || {}
  }


  /**
   * 重写父类属性
   */
  _setAttribute(key:string, value: any){
    switch(key){
      case 'disabled':
        this.disabled = value
        break;
      case 'disabled-style':
        this.disabledStyle = value
        break;
      case 'pressed-style':
        this.pressedStyle = value
        break;
      default:
        break;
    }
  }
}
```
这里我们可以看到Button将自身的element指向hummer的Button类实例，并且重写了父类的属性设置方法，额外拓展了disabled、pressed-style等属性的处理，并且通过添加属性存取器，最终将按钮的pressed-style属性值传递到hummer组件实例上，而button一般支持的click/tap方法的事件监听则由Base类中默认事件处理函数addEventListener统一处理了，当然如果button有其他事件需要处理，也可以通过重写父类的addEventListener方法来处理

###
我们给予开发者极大的自由以便他们能够构建出更具有创造性的组件
下面我们看一个tenon内部视图scoller的实现

```
export class Scroller extends Base{
  __NAME = NODE_VIEW

  constructor(){
    super();
    this.element = new ScrollerComponent();
  }
  ...

  _appendChild(child: any) {
    child.unlinkSiblings();
    child.parent = this;
    this.children.add(child);

    if (!this.firstChild) {
      this.firstChild = child;
    }
    child.prevSibling = this.lastChild;
    child.nextSibling = null;
    if (this.lastChild) {
      this.lastChild.nextSibling = child;
    }
    this.lastChild = child;
    // 新增元素
    if(this.element && child.element){
      // 拦截refresh 和 loadmore 留作他用 其他正常渲染
      if(child.__NAME === NODE_REFRESH){
        this.element.refreshView = child.element
      }else if(child.__NAME === NODE_LOADMORE){
        this.element.loadMoreView = child.element
      }else {
        this.element.appendChild(child.element);
        child._onMounted();
        child.onMounted();
      }
    }
  }

  _insertBefore(child:any, anchor:any) {
    child.unlinkSiblings();
    child.parent = this;
    if (anchor.prevSibling) {
      child.prevSibling = anchor.prevSibling;
      anchor.prevSibling.nextSibling = child;
    }
    anchor.prevSibling = child;
    child.nextSibling = anchor;

    if (this.firstChild === anchor) {
      this.firstChild = child;
    }
    //FIXME: 插入时，children顺序需要进行变更
    this.children.add(child);
    // 插入元素
    if(this.element && child.element && anchor.element){
      // 拦截refresh 和 loadmore 留作他用 其他正常渲染
      if(child.__NAME === NODE_REFRESH){
        this.element.refreshView = child.element
      }else if(child.__NAME === NODE_LOADMORE){
        this.element.loadMoreView = child.element
      }else {
        this.element.appendChild(child.element);
        child._onMounted();
        child.onMounted();
      }
    }
  }

  /**
   * 滚动到坐标（单位：Px）
   * @param x 横坐标
   * @param y 纵坐标
   */
  scrollTo(x:number, y:number){
    this.element.scrollTo(x,y);
  }

  /**
   * 滚动一定的距离（单位：Px）
   * @param dx x偏移量
   * @param dy y偏移量
   */
  scrollBy(dx:number, dy:number){
    this.element.scrolBy(dx, dy)
  }

  /**
   * 滚动到顶部，如果是水平就滚动到最左侧
   */
  scrollToTop(){
    this.element.scrollToTop()
  }

  /**
   * 滚动到底部，如果是水平就滚动到最右侧
   */
  scrollToBottom(){
    this.element.scrollToBottom()
  }

  /**
   * 结束下拉刷新
   */
  stopPullRefresh() {
    this.element.stopPullRefresh()
  }

  /**
   * 结束加载更多
   */
  stopLoadMore(enable: boolean) {
    this.element.stopLoadMore(enable)
  }

  /**
   * 重写事件绑定
   * @param event 
   * @param func 
   */
  addEventListener(event: string, func:Function){
    switch(event){
      case "scroll":
        // event单位 px
        this.element.addEventListener('scroll', (e:any) => {
          func.call(this, e)
        })
        break;
      case "scrolltotop":
        this.element.setOnScrollToTopListener(() => {
          func.call(this)
        })
        break;
      case "scrolltobottom":
        this.element.setOnScrollToBottomListener(() => {
          func.call(this)
        })
        break;
      case 'refresh':
        this.element.onRefresh = (state: any) => {
          func.call(this, state, this)
        }
        break;
      case 'loadmore':
        this.element.onLoadMore = (state: any) => {
          func.call(this, state, this)
        }
        break;
      default:
        this.element.addEventListener(event, (e:any) => {
          func.call(this, e)
        })
        break;
    }
  }
}

```
这里我们不再赘述对于新增属性的处理。从代码里我们可以看到Scroller将自身element属性指向了hummer的Scroller组件实例，然后重写了父类的事件监听方法，处理了Scroller上如scroll、refresh、loadmore等特殊事件的绑定。再然后我们支架在类上添加了一些方法如scrollToTop，在tenon中用户可以通过ref的方式拿到tenon的类实例，然后直接调用这类方法，对组件直接进行操作，同时我们可以看到Scroller重写了父类的_appendChild、_insertBefore两个方法，这两个方法是用于视图的节点操作方法，用于逐个处理tenon组件内部嵌套的视图节点的添加/插入，由于scroller组件有上拉刷新和下拉加载更多这两个操作，所以会有对应着两个操作时的特殊子视图展示，但是默认的子视图是直接集成在端导出的组件中的,在很多业务场景下我们需要对这些视图进行定制化操作，刚好在hummer的scroller中支持我们传递自定义的视图作为scroller的子视图，

```
// hummer
aScroll.refreshView = new View();
```

而tenon本身是一个类vue的框架，我们希望传递给scroller的视图也是响应式的，以便动态修改，所以我们可以直接将我们希望自定义的view写在tenon的template中

```
<template>
  <view>
    <scroller
      ref="iScroller"
      class="scroller" 
      @scroll="handleScroll" 
      @scrollToTop="handleScrollToTop"
      @scrollToBottom="handleScrollToBottom"
      @onRefresh="handleRefresh"
      @onloadMore="handleLoadMore"
      >
      <refresh-view>
        ...
      </refresh-view>
      <loadmore-view>
        ...
      </loadmore-view>
      <view class="scroller-item">
        <text>Scroller Item 1</text>
      </view>
    </scroller>
  </view>
</template>
```
然后在_appendChild 、 _insertBefore中将这两个子视图拦截下来，不直接渲染到视图中，而是利用hummer提供的方法将拦截下来的视图对应的element（hummer组件实例）交给hummer进行渲染，这个时候就就既能保证我们使用了自定义视图也做到了自定义视图的数据和样式的响应。


以上就是在tenon框架内部视图标签实现时用到的一些高阶用法。


###
下面我们再以实际场景为例，看看在偏业务的场景中我们如何基于tenon的能力拓展一个自定义视图标签。

地图是我们业务开发中经常用到的组件，一般来说在这种场景下，就需要使用hummer的原生模块导出机制将一个原生的地图导出为一个hummer 组件
我们假设这个组件类名为  MyMap  （下文myMap为MyMap实例）

hummer 导出的组件类包含以下属性和方法

属性名 | 说明 | 示例
---|---|---
customLocateView | 地图中用于回到当前位置的可点击视图 | myMap.customLocateView = new View()
zoom | 地图的缩放比例 | myMap.zoom = 14

事件名 | 说明 | 示例
---|---|---
addRegionChangedListener | 视图变化监听函数 | myMap.addRegionChangedListener(callback) {}

方法名 | 说明 | 示例
---|---|---
getCenterLocation | 获取当前视图中心位置 | myMap.getCenterLocation()
addCustomMarker | 添加自定义Marker | myMap.addCustomMarker(view)

根据hummer给出的属性和方法 我们来设计一下tenon标签
属性名 | 说明 | 示例
---|---|---
zoom | 地图的缩放比例 | <xx zoom="2"></xx>

事件名 | 说明 | 示例
---|---|---
addRegionChangedListener | 视图变化监听函数 | <xx @regionChange="regionChange"></xx>

方法名 | 说明 | 示例
---|---|---
getCenterLocation | 获取当前视图中心位置 | this.$refs.tMap.getCenterLocation()
addCustomMarker | 添加自定义Marker | myMap.addCustomMarker(view)

特殊子视图 | 说明 | 示例
---|---|---
custom-locate | 自定义地图中用于回到当前位置的可点击视图 | <xx><view type="custom-locate"></view></xx>
custom-marker | 添加自定义Marker | <xx><view type="custom-marker"></view></xx>


现在我们要按照上述设计将这个hummer组件对接到tenon

```
export class TMap extends Base{
  constructor(){
    super();
    this.element = new MyMap();
  }
  _setAttribute(key:string, value: any){
    switch(key){
      case 'zoom':
        this.element.zoom = value
        break;
      default:
        this.element.style = {
          [key]:value
        }
        break;
    }
  }

  _appendChild(child: any) {
    child.unlinkSiblings();
    child.parent = this;
    this.children.add(child);

    if (!this.firstChild) {
      this.firstChild = child;
    }
    child.prevSibling = this.lastChild;
    child.nextSibling = null;
    if (this.lastChild) {
      this.lastChild.nextSibling = child;
    }
    this.lastChild = child;
    // 新增元素
    if(this.element && child.element){
      // 拦截custom-locate 和 custom-marker 
      if(child.props.type === 'custom-locate'){
        this.element.customLocateView = child.element
      }else if(child.props.type === 'custom-marker'){
        this.element.addCustomMarker(child.element)
      }else {
        this.element.appendChild(child.element);
        child._onMounted();
        child.onMounted();
      }
    }
  }

  _insertBefore(child:any, anchor:any) {
    // 整体处理逻辑与_appendChild 一样
  }

  getCenterLocation() {
    return this.element.getCenterLocation()
  }


  /**
   * 重写事件绑定
   * @param event 
   * @param func 
   */
  addEventListener(event: string, func:Function){
    switch(event){
      case "regionChange":
        // event单位 px
        this.element.addRegionChangedListener((e:any) => {
          func.call(this, e)
        })
        break;
      default:
        this.element.addEventListener(event, (e:any) => {
          func.call(this, e)
        })
        break;
    }
  }
}
```
上面这段代码里我们可以看到我们拆分了hummer原来的属性和方法，在_setAttribute里处理了zoom属性；
addEventListener里则处理了regionChange事件；_appendChild里则通过判断子视图的type，将我们定义的两个特殊视图进行拦截，不让这两种视图节点参与正常的渲染流程，然后调用hummer组件实例的方法进行特殊视图添加，做到这两种视图的自定义及响应式。

最终我们通过tenon规定的拓展组件导出方式进行组件导出
```
// native-components/map.js
export default {
  name: 'map',
  factory(){
    let component = new TMap()
    return component
  }
}
```
然后我们看下怎么使用这个导出的组件

```
// 注册组件
// entry.js
import TMap from './native-components/map.js'
Tenon.register(TMap)

// app.vue
// ex 前缀是tenon拓展hummer原生组件的标识，为了在编译时 与用户自定义组件区分
<template>
  <view class="page">
    <ex-map ref="tMap" zoom='14' @regionChange="regionChange">
      <view type="custom-locate">
        <text>我是{{tenon}}自定义定位视图</text>
      </view>
      <view type="custom-ma
        <text>我是{{tenon}}自定义marker</text>
      </view>
    </ex-map>
  </view>
</template>
<style lang="less" scoped>
// 此处省略
</style>
<script>
export default {
  data(){
    return {
      tenon: 'Tenon',
    }
  },
  methods: {
    regionChange(e) {
      let positon = this.$refs.tMap.getCenterLocation()
      console.log('positon========>', JSON.stringify(positon))
    }
  }
}
</script>
```

以上就是tenon中拓展一个视图标签的原理和实践