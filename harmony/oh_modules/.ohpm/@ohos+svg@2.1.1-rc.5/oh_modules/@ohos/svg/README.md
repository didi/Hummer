# ohos-svg

## 简介

ohos-svg是一个SVG图片的解析器和渲染器，可以解析SVG图片并渲染到页面上，还可以动态改变SVG的样式。

## 效果展示
SVG图片解析并绘制:

![](screenshot/example1.png)


## 下载安装

```shell
ohpm install @ohos/svg
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 接口使用方式变更
1.需要在[EntryAbility.ts](entry%2Fsrc%2Fmain%2Fets%2Fentryability%2FEntryAbility.ts)引入this.context

```typescript
import { GlobalContext } from '@ohos/svg/src/main/ets/components/GlobalContext';
...        
GlobalContext.getContext().setObject("context", this.context);
```
2.在需要的时候通过getObject获取context对象
 ```typescript
 import { GlobalContext } from '@ohos/svg/src/main/ets/components/GlobalContext';
 import { Context } from '@ohos.abilityAccessCtrl';
 let context: Context = GlobalContext.getContext().getObject("context") as Context;
 context.resourceManager.getRawFileContent(rawfileName, (error, value) => {
      ...
  }
 ```

## 使用说明

 ```
import { SVGImageView } from '@ohos/svg'
 
 model: SVGImageView.SVGImageViewModel = new SVGImageView.SVGImageViewModel();
 
 build() {
   SVGImageView({ model: this.model })
 }
 ```

## 接口说明
`model: SVGImageView.SVGImageViewModel = new SVGImageView.SVGImageViewModel();`
1. 设置svg资源文件
   `this.model.setImageRawfile(filename: string, context?:common.UIAbilityContext)`
2. 设置svg对象
   `this.model.setSVG(svg: SVG, css?: string, context?:common.UIAbilityContext)`
3. 设置svg资源图片
   `this.model.setImageResource(resource: Resource, context?:common.UIAbilityContext)`
4. 设置svg图片的源文件字符串
   `this.model.setFromString(url: string, context?:common.UIAbilityContext)`

## 约束与限制
在下述版本验证通过：

- DevEco Studio: 4.1 Canary2-4.1.3.322, SDK: API11 (4.1.0.36)
- DevEco Studio: 4.0 (4.0.3.700), SDK: API10 (4.0.10.15)
- DevEco Studio: 4.0 (4.0.3.600), SDK: API10 (4.0.10.11)
- DevEco Studio: 4.0 (4.0.3.513), SDK: API10 (4.0.10.10)

HSP场景适配:

SVGImageViewModel配置类部分对外接口新增可选参数context, 在HSP场景下需要传入正确的context, 才能保证三方库后续正确获取Resource资源。

非HSP场景不影响原功能, context可以不传。

## 目录结构

````
|---- ohos-svg  
|     |---- entry  # 示例代码文件夹
|     |---- ohos_svg  # ohos_svg库文件夹
|           |---- index.ets  # 对外接口
            |---- components  # 组件代码目录
                  |---- CSS.ts
                  |---- GlobalContext.ts
                  |---- PreserveAspectRatio.ts
                  |---- RenderOptions.ts
                  |---- SimpleAssetResolver.ts
                  |---- SVG.ts
                  |---- SVGExternalFileResolver.ts
                  |---- SVGImageView.ets
                  |---- SVGParseException.ts   
                        |---- utils  
                              |---- Character  
                              |---- CSSBase  
                              |---- CSSFontFeatureSettings  
                              |---- CSSFontVariationSettings  
                              |---- CSSTextScanner  
                              |---- IntegerParser  
                              |---- Matrix  
                              |---- mini_canvas  
                              |---- NumberParser  
                              |---- Rect  
                              |---- RenderOptionsBase  
                              |---- Style  
                              |---- SVGBase  
                              |---- SVGParser  
                              |---- SVGParserImpl  
                              |---- SVGRenderer  
                              |---- SVGXMLChecker  
                              |---- SVGXMLConstants  
                              |---- TextScanner  

|     |---- README.md  # 安装使用方法                    
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-sig/ohos-svg/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-sig/ohos-svg/pulls) 。

## 开源协议
本项目基于 [Apache License 2.0](https://gitee.com/openharmony-sig/ohos-svg/blob/master/LICENSE) ，请自由地享受和参与开源。

## 遗留问题

1.目前mask标签绘制有问题

2.svg图片含有image标签时需要将svg图片和image标签引用的图片共同放在rawfile文件夹下