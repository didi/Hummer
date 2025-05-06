## v2.1.1-rc.5
- 修复带Polygon的svg图片不显示的问题

## v2.1.1-rc.4
- 修复屏幕的大小发生变化时svg图片显示尺寸不对的问题

## v2.1.1-rc.3
- 为了适配HSP场景,SVGImageViewModel类部分接口新增当前场景上下文context可选参数传入,在HSP场景下需要传正确的context,非HSP场景不影响,context可以不传
  1.setCSS(css: string,context?:common.UIAbilityContext)
  2.setImageResource(resource: Resource,context?:common.UIAbilityContext)  
  3.setImageRawfile(filename: string,context?:common.UIAbilityContext)
  4.setFromString(url: string,context?:common.UIAbilityContext)

## v2.1.1-rc.2
- 修复屏幕的大小发生变化时svg图片消失问题

## v2.1.1-rc.1

- 修复获取资源文件失败的问题

## v2.1.1-rc.0

- 修复不兼容API9问题

## v2.1.0

- ArkTS语法整改
- 接口使用方式变更：GlobalContext替代globalThis

## v2.0.3

- 修复svg图片大小显示不对的问题

## v2.0.2

- 修改getSVGPixelMap方法

## v2.0.1

- 修改entry的逻辑结构
- 删除废弃的接口

## v2.0.0

- 包管理工具由npm切换为ohpm
- 适配DevEco Studio: 3.1Beta2(3.1.0.400)
- 适配SDK: API9 Release(3.2.11.9)

## 1.1.1

- 适配DevEco Studio 版本：3.1 Beta1（3.1.0.200），OpenHarmony SDK:API9（3.2.10.6）

## v1.1.0

- 重构canvas解析绘制逻辑，并增加renderDocument接口
- 目前除mask以外，其他的svg组件基本支持
- 注：当svg里有image标签使用时必须将此svg和image标签引用的image放入rawfile下才能正常绘制

## v1.0.2

1. 调整getfromstring方法名
2. 解决watch监听abouttoappear不会重新走
3. svg类型拆分
4. 补充了canvas绘制逻辑
5. 补充了text、switch以及use标签解析绘制

## v1.0.1

api8升级到api9，并转换为stage模型

## v1.0.0

- ohos-svg是一个解析渲染SVGLibrary，支持了以下功能：
1. 解析SVG
2. 渲染SVG
3. 改变SVG样式

- 不支持以下功能：
1. svg字体解析绘制