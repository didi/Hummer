# Hamock

## 简介

Hamock 是 OpenHarmony 上的模拟框架，提供预览场景的模拟功能。

## 下载安装

```bash
ohpm install @ohos/hamock
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用示例

Hamock 提供了 @MockSetup 用于修饰 Mock 方法，仅支持声明式范式的组件。当开发者预览该组件时，预览运行时将在组件初始化时执行被 @MockSetup 修饰的方法。因此，开发者可以在这个被修饰的方法内重定义组件的方法或重赋值组件的属性，其将在预览时生效。

> 说明：
> @MockSetup 修饰的方法仅在预览场景会自动触发，并先于组件的 aboutToAppear 执行。

### UI组件的方法

在 ArkTS 页面代码中引入 Hamock。在目标组件中定义一个方法，并用 @MockSetup 修饰该方法。在这个方法中，使用 MockKit 模拟目标方法。

```typescript
import { MockKit, when, MockSetup } from '@ohos/hamock';

@Entry
@Component
struct Index {
  ...
  @MockSetup
  randomName() {
    let mocker: MockKit = new MockKit();
    let mockfunc: Object = mocker.mockFunc(this, this.method1);
    // mock 指定的方法在指定入参的返回值
    when(mockfunc)('test').afterReturn(1);
  }
  ...
  // 业务场景调用方法
  const result: number = this.method1('test'); // in previewer, result = 1
}
```

### UI组件的属性

在 ArkTS 页面代码中引入 Hamock。在目标组件中定义一个方法，并用 @MockSetup 修饰该方法。在这个方法中，对于需要 Mock 的属性，可以重新赋值。

```typescript
import { MockSetup } from '@ohos/hamock';

@Component
struct Person {
  @Prop species: string;
  ...
  // 在 @MockSetup 片段中，定义对象属性
  @MockSetup
  randomName() {
    this.species = 'primates';
  }
  ...
  // 业务场景调用属性（如果从初始化到调用期间，该属性无变化）
  const result: string = this.species; // in previewer, result = primates
}
```

## 约束与限制

在下述版本验证通过：

DevEco Studio: 4.1 (4.1.3.400), SDK: API11 (4.1.0.36)

MockSetup 仅在 API11 支持。

## 贡献代码

使用过程中发现任何问题都可以提[Issue](https://gitee.com/openharmony/testfwk_arkxtest/issues) 给我们，当然，我们也非常欢迎你给我们提[PR](https://gitee.com/openharmony/testfwk_arkxtest/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony/testfwk_arkxtest/blob/master/hamock/LICENSE) ，请自由地享受和参与开源。