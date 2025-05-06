# ImageKnife

**专门为OpenHarmony打造的一款图像加载缓存库，致力于更高效、更轻便、更简单。**

## 简介

本项目基于开源库 [Glide](https://github.com/bumptech/glide) 进行OpenHarmony的自研版本：

- 支持内存缓存，使用LRUCache算法，对图片数据进行内存缓存。
- 支持磁盘缓存，对于下载图片会保存一份至磁盘当中。
- 支持进行图片变换: 支持图像像素源图片变换效果。
- 支持用户配置参数使用:(
  例如：配置是否开启一级内存缓存，配置磁盘缓存策略，配置仅使用缓存加载数据，配置图片变换效果，配置占位图，配置加载失败占位图等)。
- 推荐使用ImageKnifeComponent组件配合ImageKnifeOption参数来实现功能。
- 支持用户自定义配置实现能力参考ImageKnifeComponent组件中对于入参ImageKnifeOption的处理。

<img src="screenshot/gif1.gif" width="50%"/>

## 下载安装

```
ohpm install @ohos/imageknife
```

## 使用说明  

### 1.依赖配置
在entry\src\main\ets\entryability\EntryAbility.ts中做如下配置初始化全局ImageKnife实例：

```typescript
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import { ImageKnife } from '@ohos/imageknife'

export default class EntryAbility extends UIAbility {
  onWindowStageCreate(windowStage: window.WindowStage) {
    windowStage.loadContent('pages/Index', (err, data) => {
    });
    // 初始化全局ImageKnife 
    ImageKnife.with(this.context);
  	// 后续访问ImageKnife请通过:ImageKnifeGlobal.getInstance().getImageKnife()方式
  }
}
```

### 2.加载普通图片

接下来我们来写个简单实例看看:

```extendtypescript
import { ImageKnifeComponent, ImageKnifeOption } from '@ohos/imageknife'

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State option: ImageKnifeOption = {
    loadSrc: $r('app.media.icon')
  }

  build() {
      Row() {
        Column() {
          Text(this.message)
            .fontSize(50)
            .fontWeight(FontWeight.Bold)
          ImageKnifeComponent({ imageKnifeOption: this.option })
            .width(300)
            .height(300)
        }.width('100%')
      }.height('100%')
  }
}
```

非常简单，仅需定义一个ImageKnifeOption数据对象，然后在你需要的UI位置，加入ImageKnifeComponent自定义组件就可以加载出一张图像了。

### 3.加载SVG图片

加载svg其实和普通流程没有区别,只要将 `loadSrc: $r('app.media.jpgSample'),` `改成一张 loadSrc: $r('app.media.svgSample'),`
svg类型图片即可。

目前加载SVG图片解析依赖了 [SVG三方库](https://gitee.com/openharmony-sig/ohos-svg)，由于目前该库还无法解析mask标签，所以这里大家需要留意一下。

### 4.加载GIF图片

加载GIF其实和普通流程也没有区别只要将 `loadSrc: $r('app.media.jpgSample'),` `改成一张 loadSrc: $r('app.media.gifSample'),`
GIF图片即可。

### 5.自定义Key
因为通常改变标识符比较困难或者根本不可能，所以ImageKnife也提供了 签名 API 来混合（你可以控制的）额外数据到你的缓存键中。
签名(signature)适用于媒体内容，也适用于你可以自行维护的一些版本元数据。

将签名传入加载请求
```extendtypescript
imageKnifeOption = {
                loadSrc: 'https://aahyhy.oss-cn-beijing.aliyuncs.com/blue.jpg',
                signature: new ObjectKey(new Date().getTime().toString())
              }
```
详细样例请参考SignatureTestPage文件

代码示例

## 进阶使用

如果简单的加载一张图像无法满足需求，我们可以看看ImageKnifeOption这个类提供了哪些扩展能力。

### ImageKnifeOption参数列表

| 参数名称                         | 入参内容                                                                                                                                                                             | 功能简介                |
|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| loadSrc                      | string \                                                                                                                                                                         | PixelMap \          | Resource                               | 设置主图资源（必选）                |
| mainScaleType                | ScaleType                                                                                                                                                                        | 设置主图展示样式（可选）        |
| strategy                     | DiskStrategy                                                                                                                                                                     | 设置磁盘缓存策略（可选）        |
| dontAnimateFlag              | boolean                                                                                                                                                                          | gif加载展示一帧（可选）       |
| placeholderSrc               | PixelMap \                                                                                                                                                                       | Resource            | 设置占位图（可选）                  |
| placeholderScaleType         | ScaleType                                                                                                                                                                        | 设置占位图展示样式（可选）       |
| errorholderSrc               | PixelMap \                                                                                                                                                                       | Resource            | 设置加载失败占位图（可选）          |
| errorholderSrcScaleType      | ScaleType                                                                                                                                                                        | 设置失败占位图展示样式（可选）     |
| retryholderSrc               | PixelMap \                                                                                                                                                                       | Resource            | 设置加载失败重试占位图（可选）      |
| retryholderScaleType         | ScaleType                                                                                                                                                                        | 设置重试占位图展示样式（可选）     |
| thumbSizeMultiplier          | number  范围(0,1]                                                                                                                                                                  | 设置缩略图占比（可选）         |
| thumbSizeDelay               | number                                                                                                                                                                           | 设置缩略图展示时间（可选）       |
| thumbSizeMultiplierScaleType | ScaleType                                                                                                                                                                        | 设置缩略图展示样式（可选）       |
| displayProgress              | boolean                                                                                                                                                                          | 设置是否展示下载进度条（可选）     |
| canRetryClick                | boolean                                                                                                                                                                          | 设置重试图层是否点击重试（可选）    |
| onlyRetrieveFromCache        | boolean                                                                                                                                                                          | 仅使用缓存加载数据（可选）       |
| isCacheable                  | boolean                                                                                                                                                                          | 是否开启一级内存缓存（可选）      |
| gif                          | {<br/>    // 返回一周期动画gif消耗的时间<br/>    loopFinish?: (loopTime?) => void<br/>    // gif播放速率相关<br/>    speedFactory?: number<br/>    // 直接展示gif第几帧数据<br/>    seekTo?: number<br/>  } | GIF播放控制能力（可选）       |
| transformation               | BaseTransform<PixelMap>                                                                                                                                                          | 单个变换（可选）            |
| transformations              | Array<BaseTransform<PixelMap>>                                                                                                                                                   | 多个变换,目前仅支持单个变换（可选）  |
| allCacheInfoCallback         | IAllCacheInfoCallback                                                                                                                                                            | 输出缓存相关内容和信息（可选）     |
| signature                    | ObjectKey                                                                                                                                                                        | 自定key（可选）           |
| **drawLifeCycle**            | **IDrawLifeCycle**                                                                                                                                                               | **用户自定义实现绘制方案（可选）** |

其他参数只需要在ImageKnifeOption对象上按需添加即可。

这里我们着重讲一下**自定义实现绘制方案**。为了增强绘制扩展能力，目前ImageKnifeComponent使用了Canvas的渲染能力作为基础。在此之上为了抽象组件绘制表达。我将图像的状态使用了
**IDrawLifeCycle绘制生命周期进行表达**，

大致流程 展示占位图->展示网络加载进度->展示缩略图->展示主图->展示重试图层->展示失败占位图

<img src="screenshot/png1.png" width="100%"/>

ImageKnifeComponent内部，责任链实现。 用户参数设置->全局参数设置->自定义组件内部设置

采用责任链的好处是，用户可以通过自定义绘制，重新绘制图层。如果不想绘制也可以通过预制回调获取绘制流程信息。

<img src="screenshot/png2.png" width="70%"/>

### 场景1:默认的展示不满足需求，需要加个圆角效果。

代码如下:

```typescript
import { ImageKnifeComponent } from '@ohos/imageknife'
import { ImageKnifeOption } from '@ohos/imageknife'
import { ImageKnifeDrawFactory } from '@ohos/imageknife'

@Entry
@Component
struct Index {
  @State imageKnifeOption1: ImageKnifeOption = { 
      // 加载一张本地的jpg资源（必选）
      loadSrc: $r('app.media.jpgSample'),
      // 占位图使用本地资源icon_loading（可选）
      placeholderSrc: $r('app.media.icon_loading'),
      // 失败占位图使用本地资源icon_failed（可选）
      errorholderSrc: $r('app.media.icon_failed'),
      // 绘制圆角30，边框5，边框"#ff00ff".用户自定义绘制（可选）
      drawLifeCycle:ImageKnifeDrawFactory.createRoundLifeCycle(5,"#ff00ff",30)
    };
        
    build(){
        Scroll() {
          Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
            ImageKnifeComponent({ imageKnifeOption: this.imageKnifeOption1 })
            .width(300) 
            .height(300)
          }
        }
        .width('100%')
        .height('100%')
    }
}
```

`ImageKnifeDrawFactory.createRoundLifeCycle(5,"#ff00ff",30)`
我们深入查看源码可以发现，实际上是对IDrawLifeCycle接口的部分实现，这里我介绍一下IDrawLifeCycle。

*
*IDrawLifeCycle的返回值代表事件是否被消费，如果被消费接下来组件内部就不会处理，如果没被消费就会传递到下一个使用者。目前消费流程（用户自定义->
全局配置定义->组件内部默认定义）**

所以我们在当数据是一张PixelMap的时候（目前jpg png bmp webp
svg返回的都是PixelMap，gif返回GIFFrame数组），我们返回了true。消费了事件，代表这个绘制流程用户自定义完成。

<img src="screenshot/gif2.gif" width="50%"/>

由于IDrawLifeCycle实现较为冗长，我们封装了ImageKnifeDrawFactory工厂，提供了网络下载百分比效果、圆角、椭圆添加边框等能力。下面我们就再看看使用工厂封装之后的场景代码。

### 场景2: 网络下载百分比效果展示

当进行加载网络图片时，可能需要展示网络下载百分比动画。但是默认的动画又不能满足需求，这个时候我们就需要自定义网络下载百分比效果。代码如下:

```typescript
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import { ImageKnifeGlobal,ImageKnife,ImageKnifeDrawFactory,LogUtil } from '@ohos/imageknife'
import abilityAccessCtrl,{Permissions} from '@ohos.abilityAccessCtrl';
export default class EntryAbility extends UIAbility {
    onWindowStageCreate(windowStage: window.WindowStage) {
        //.. 删除不必要代码
        windowStage.loadContent('pages/index', (err, data) => {
        });
       	// 初始化ImageKnifeGlobal和ImageKnife
        ImageKnife.with(this.context);
        // 全局配置网络加载进度条 使用ImageKnifeGlobal.getInstance().getImageKnife()访问ImageKnife
ImageKnifeGlobal.getInstance().getImageKnife().setDefaultLifeCycle(ImageKnifeDrawFactory.createProgressLifeCycle("#10a5ff", 0.5))
    }
}
```

这里大家可能会问，为什么会将这个IDrawLifeCycle放在AbilityStage里面实现？

这是因为网络下载百分比进度很多时候都是全局通用，如果有需要全局配置的自定义展示方案。推荐在AbilityStage里面，往ImageKnife的setDefaultLifeCycle函数中注入，即可将ImageKnifeComponent中的默认绘制方案替换。

在这里我们实现的效果如下图所示。

<img src="screenshot/gif3.gif" width="50%"/>

## 高级用法

以上简单使用和进阶使用都是经过一层自定义组件封装之后形成的，RequestOption封装成了ImageKnifeOption,绘制部分封装成了自定义组件ImageKnifeComponent。

如果用户其实并不关心绘制部分，或者说想用自己的通用方案对自定义组件ImageKnifeComponent重构都是可以的。

下面我们会着重指导用户如何复用图片加载逻辑，重构自定义组件ImageKnifeComponent。

首先我们先看看RequestOption构建的内容,如下所示:

### 数据加载

#### RequestOption构建:

请查阅下文接口内容：[RequestOption接口方法](#requestoption用户配置参数)

了解了RequestOption的参数内容后，我们可以参考ImageKnifeComponent组件代码进行分析。

**从`imageKnifeExecute()`函数入口，首先我们需要构建一个RequestOption对象，`let request = new RequestOption()`,
接下来就是按需配置request对象的内容，最后使用 `ImageKnifeGlobal.getInstance().getImageKnife()?.call(request)`发送request执行任务即可。**

是不是很简单，而其实最重要的内容是就是:  **按需配置request对象的内容** 为了更好理解，我举例说明一下:

#### 场景一: 简单加载一张图片

```
let request = new RequestOption();
// (必传)
request.load("图片url")
  // (可选 整个request监听回调)
	.addListener({callback:(err:BusinessError|string, data:ImageKnifeData) => {
	// data 是ImageKnifeData对象
	if(data.isPixelMap()){
	// 这样就获取到了目标PixelMap
	let pixelmap = data.drawPixleMap.imagePixelMap;
	}
    return false;
  })
 
  let compSize:Size = {
    width: this.currentWidth,
    height:this.currentHeight
  }
  // (必传)这里setImageViewSize函数必传组件大小，因为涉及到图片变换效果都需要适配图像源和组件大小
 request.setImageViewSize(compSize)
 // 最后使用ImageKnife的call函数调用request即可
 let imageKnife:ImageKnife|undefined = ImageKnifeGlobal.getInstance().getImageKnife();
 if(imageKnife != undefined){
 	imageKnife.call(request)
 }

```

**其他场景，可以按需加载**

比如我需要配置 **占位图** 只需要 在request对象创建好之后,调用 **placeholder** 函数即可

```
request.placeholder(this.imageKnifeOption.placeholderSrc, (data) => {
  console.log('request.placeholder callback')
  this.displayPlaceholder(data)
})
```

再比如 我对缓存配置有要求，我要禁用内存缓存，调用 **skipMemoryCache** 函数即可

```
request.skipMemoryCache(true)
```

这里只是简单介绍部分使用，更多的内容请参考 **按需加载** 原则，并且可以参考ImageKnifeComponent源码或者根据文档自行探索实现。

## 接口说明

### RequestOption用户配置参数

| 方法名                                                                   | 入参                                                         | 接口描述                                         |
|-----------------------------------------------------------------------|------------------------------------------------------------|----------------------------------------------|
| load(src: string \                                                    | PixelMap \                                                 | Resource)                                    | string \| PixelMap \| Resource                             | 待加载图片的资源                                         |
| setImageViewSize(imageSize: {   width: number,   height: number })    | {   width: number,   height: number }                      | 传入显示图片组件的大小，变换的时候需要作为参考                      |
| diskCacheStrategy(strategy: DiskStrategy)                             | DiskStrategy                                               | 配置磁盘缓存策略  NONE SOURCE RESULT  ALL  AUTOMATIC |
| placeholder(src: PixelMap \                                           | Resource, func?: AsyncSuccess<PixelMap>)                   | src: PixelMap \                              | Resource, func?: AsyncSuccess<PixelMap>   | 配置占位图，其中func为数据回调函数                       |
| errorholder(src: PixelMap \                                           | Resource, func?: AsyncSuccess<PixelMap>)                   | src: PixelMap \                              | Resource, func?: AsyncSuccess<PixelMap>   | 配置加载失败占位图，其中func为数据回调函数               |
| retryholder(src: PixelMap \                                           | Resource, func?: AsyncSuccess<PixelMap>)                   | src: PixelMap \                              | Resource, func?: AsyncSuccess<PixelMap>   | 配置重试占位图，如果配置则加载失败后优先展示重试占位图   |
| addListener(func: AsyncCallback<PixelMap>)                            | func: AsyncCallback<PixelMap>                              | 配置整个监听回调，数据正常加载返回，加载失败返回错误信息                 |
| thumbnail(sizeMultiplier:number, func?: AsyncSuccess<ImageKnifeData>) | sizeMultiplier:number, func?: AsyncSuccess<ImageKnifeData> | 设置缩略图比例，缩略图返回后，加载并展示缩略图                      |
| addProgressListener(func?: AsyncSuccess<string>)                      | func?: AsyncSuccess<string>                                | 设置网络下载百分比监听，返回数据加载百分比数值                      |
| addRetryListener(func?: AsyncSuccess<any>)                            | func?: AsyncSuccess<any>                                   | 设置重试监听                                       |
| addAllCacheInfoCallback(func: IAllCacheInfoCallback)                  | func: IAllCacheInfoCallback                                | 设置获取所有缓存信息监听                                 |
| skipMemoryCache(skip: boolean)                                        | skip: boolean                                              | 配置是否跳过内存缓存                                   |
| retrieveDataFromCache(flag: boolean)                                  | flag: boolean                                              | 配置仅从缓存中加载数据                                  |
| signature                                                             | ObjectKey                                                  | 自定义key                                       |

同时支持[图片变换相关](#图片变换相关)接口。

### ImageKnife 启动器/门面类

| 方法名                          | 入参                   | 接口描述                           |
| ------------------------------- | ---------------------- | ---------------------------------- |
| call(request: RequestOption)    | request: RequestOption | 根据用户配置参数具体执行加载流程   |
| preload(request: RequestOption) | request: RequestOption | 根据用户配置参数具体执行预加载流程 |
| pauseRequests()                 |                        | 全局暂停请求                       |
| resumeRequests()                |                        | 全局恢复暂停                       |

### 缓存策略相关

| 使用方法                                       | 类型        | 策略描述                 |
|--------------------------------------------|-----------|----------------------|
| request.diskCacheStrategy(new ALL())       | ALL       | 表示既缓存原始图片，也缓存转换过后的图片 |
| request.diskCacheStrategy(new AUTOMATIC()) | AUTOMATIC | 表示尝试对本地和远程图片使用适合的策略  |
| request.diskCacheStrategy(new DATA())      | DATA      | 表示只缓存原始图片            |
| request.diskCacheStrategy(new NONE())      | NONE      | 表示不缓存任何内容            |
| request.diskCacheStrategy(new RESOURCE())  | RESOURCE  | 表示只缓存转换过后的图片         |

### ScaleType类型展示效果

| 使用方法                    | 类型  | 策略描述                              |
|-------------------------|-----|-----------------------------------|
| ScaleType.FIT_START     | int | 图像位于用户设置组件左上角显示,图像会缩放至全部展示        |
| ScaleType.FIT_END       | int | 图像位于用户设置组件右下角显示,图像会缩放至全部展示        |
| ScaleType.FIT_CENTER    | int | 图像位于用户设置组件居中,图像会缩放至全部展示           |
| ScaleType.CENTER        | int | 图像居中展示,不缩放                        |
| ScaleType.CENTER_CROP   | int | 图像的宽高长度,短的部分缩放至组件大小,超出的全部裁剪       |
| ScaleType.FIT_XY        | int | 图像拉伸至组件大小                         |
| ScaleType.CENTER_INSIDE | int | 如果图像大于组件则执行FIT_CENTER,小于组件则CENTER |
| ScaleType.NONE          | int | 如果不想适配，直接展示原图大小                   |

### 图片变换相关

| 使用方法                           | 类型                                 | 相关描述                             |
|--------------------------------|------------------------------------|----------------------------------|
| request.centerCrop()           | CenterCrop                         | 可以根据图片文件，目标显示大小，进行对应centerCrop   |
| request.centerInside()         | CenterInside                       | 可以根据图片文件，目标显示大小，进行对应centerInside |
| request.fitCenter()            | FitCenter                          | 可以根据图片文件，目标显示大小，进行对应fitCenter    |
| request.blur()                 | BlurTransformation                 | 模糊处理                             |
| request.brightnessFilter()     | BrightnessFilterTransformation     | 亮度滤波器                            |
| request.contrastFilter()       | ContrastFilterTransformation       | 对比度滤波器                           |
| request.cropCircle()           | CropCircleTransformation           | 圆形剪裁显示                           |
| request.cropCircleWithBorder() | CropCircleWithBorderTransformation | 圆环展示                             |
| request.cropSquare()           | CropSquareTransformation           | 正方形剪裁                            |
| request.crop()                 | CropTransformation                 | 自定义矩形剪裁                          |
| request.grayscale()            | GrayscaleTransformation            | 灰度级转换                            |
| request.invertFilter()         | InvertFilterTransformation         | 反转滤波器                            |
| request.pixelationFilter()     | PixelationFilterTransformation     | 像素化滤波器                           |
| request.rotateImage()          | RotateImageTransformation          | 图片旋转                             |
| request.roundedCorners()       | RoundedCornersTransformation       | 圆角剪裁                             |
| request.sepiaFilter()          | SepiaFilterTransformation          | 乌墨色滤波器                           |
| request.sketchFilter()         | SketchFilterTransformation         | 素描滤波器                            |
| request.mask()                 | MaskTransformation                 | 遮罩                               |
| request.swirlFilter()          | SwirlFilterTransformation          | 扭曲滤波器                            |
| request.kuwaharaFilter()       | KuwaharaFilterTransform            | 桑原滤波器                            |
| request.toonFilter()           | ToonFilterTransform                | 动画滤波器                            |
| request.vignetteFilter()       | VignetteFilterTransform            | 装饰滤波器                            |

<img src="screenshot/gif4.gif" width="50%"/>

### setLruCacheSize

setLruCacheSize(size: number,memory:number): void

设置图片文件缓存的大小上限，size单位为张数，memory单位为字节，提升再次加载同源图片的加载速度，特别是对网络图源会有较明显提升。
如果不设置则默认为100张，100MB。缓存采用内置的LRU策略。
size为0则代表不限制缓存张数，memory为0则代表不限制缓存大小。
建议根据应用实际需求，设置合理缓存上限，数字过大可能导致内存占用过高，可能导致OOM异常。

**参数：**

| 参数名 | 类型 | 必填 | 说明                      |
| -------- | -------- | -------- |-------------------------|
| size | number | 是 | 图片文件的缓存张数，单位为张。只支持正整数，0 |
| memory | number | 是 | 图片文件的缓存大小，单位为字节。只支持正数，0 |

**示例：**
```ts
//EntryAbility.ets
import { InitImageKnife } from '...imageknife'
export default class EntryAbility extends UIAbility {
  onWindowStageCreate(windowStage: window.WindowStage) { 
    InitImageKnife.init(this.context);
    let imageKnife: ImageKnife | undefined = ImageKnifeGlobal.getInstance().getImageKnife()
    if (imageKnife != undefined) {
      //设置全局内存缓存大小张数
      imageKnife.setLruCacheSize(100, 100 * 1204 * 1024)
    }
  }
}
```


## 约束与限制

在下述版本验证通过：

DevEco Studio 4.0（4.0.3.700）--SDK:API10（ 4.0.10.15）

HSP场景适配:

在使用ImageKnifeComponent进行加载图片时, 提供的ImageKnifeOption配置类新增了可选参数context, 在HSP场景下需要传入正确的context, 才能保证三方库后续正确获取Resource资源。

在使用RquestOption进行加载图片时, 提供的RquestOption配置类新增了接口`setModuleContext(moduleCtx:common.UIAbilityContext)`, 在HSP场景下需要传入正确的context, 才能保证三方库后续正确获取Resource资源。

非HSP场景不影响原功能, ImageKnifeOption配置类新增的可选参数context可以不传, RquestOption配置类新增的接口可以不调用。

## 目录结构

```
/library/src/
- main/ets/components
    - cache                  # 缓存相关内容
       - diskstrategy        # 缓存策略
       - key                 # 缓存key生成策略
       - Base64.ets          # Base64算法
       - CustomMap.ets       # 自定义Map封装
       - DiskCacheEntry.ets  # 磁盘缓存entry
       - DiskLruCache.ets    # 磁盘LRU缓存策略
       - FileReader.ets      # 文件读取相关
       - FileUtils.ets       # 文件工具类
       - LruCache.ets        # 内存LRU缓存策略
       - Md5.ets             # MD5算法
       
    - imageknife             # imageknife主要内容
       - compress            # 压缩相关
       - constants           # 常量相关
       - entry               # 部分数据结构
       - holder              # 占位图相关解析
       - interface           # 接口相关
       - networkmanage       # 网络相关
       - pngj                # pngj相关
       - requestmanage       # imageknife请求相关
       - resourcemanage      # 本地资源解析相关
       - transform           # 图片变换相关
       - utils               # 工具类相关
       - ImageKnife.ets            # imageknife门面，app持久化类
       - ImageKnifeData.ets        # 数据封装
       - ImageKnifeComponent.ets   # 自定义控件封装
       - ImageKnifeDrawFactory.ets # IDrawLifeCycle用户自定义实现
       - ImageKnifeOption.ets      # 用户传参数封装
       - RequestOption.ets         # 用户设置参数封装
       
/entry/src/
- main/ets     
    - entryability
      - CustomEngineKeyImpl.ets
      - EntryAbility.ts
    - pages                                    # 测试page页面列表
       - basicTestFeatureAbilityPage.ets       # 测试列表加载
       - basicTestFileIOPage.ets               # 测试fileio
       - basicTestMediaImage.ets               # 测试媒体image
       - basicTestResourceManagerPage.ets      # 测试本地资源解析
       - compressPage.ets                      # 压缩页面
       - cropImagePage2.ets                    # 手势裁剪页面
       - frescoImageTestCasePage.ets           # 测试属性动画组件切换
       - frescoRetryTestCasePage.ets           # 测试ImageKnifeComponent加载失败重试
       - svgTestCasePage.ets				   # 测试svg解析页面
       - imageknifeTestCaseIndex.ets           # 测试用例页面入口
       - index.ets                             # 程序入口页面
       - loadNetworkTestCasePage.ets           # 网络加载测试
       - loadResourceTestCasePage.ets          # 本地加载测试
       - showErrorholderTestCasePage.ets       # 加载失败占位图测试
       - SignatureTestPage.ets                 # 自定义key测试
       - storageTestDiskLruCache.ets           # 磁盘缓存测试
       - storageTestLruCache.ets               # 内存缓存测试
       - testAllCacheInfoPage.ets              # 所有缓存信息获取测试
       - testImageKnifeOptionChangedPage.ets   # 数据切换测试
       - testImageKnifeOptionChangedPage2.ets  # 数据切换测试,部分变换
       - testImageKnifeOptionChangedPage3.ets  # 数据切换测试,组件动画
       - testImageKnifeOptionChangedPage4.ets  # 数据切换测试,内容动画
       - testImageKnifeOptionChangedPage5.ets  # 数据切换测试,ImageKnifeDrawFactory封装圆角圆环边框等
       - testPreloadPage.ets                   # 预加载测试
       - transformPixelMapPage.ets             # 所有类型变换测试  
       - testSingleFrameGifPage.ets            # 单帧gif加载测试
  
       - OptionTestPage.ets                    # 图片缓存测试
       - testManyGifLoadWithPage               # 测试gif加载页面
    -workers
      - upngWorkerTestCase.ets    # png子线程解析
      - upngWorkerDepend.ts       # png子线程解析具体执行
```

## 贡献代码

使用过程中发现任何问题都可以提 [issue](https://gitee.com/openharmony-tpc/ImageKnife/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/ImageKnife/issues) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/ImageKnife/blob/master/LICENSE) ，请自由的享受和参与开源。

## 遗留问题

1.目前只支持一种图片变换效果。

2.目前svg和gif动图不支持变换效果。

3.svg解析目前不支持mask标签。