# DiskLruCache

**专门为OpenHarmony打造的一款磁盘缓存库，通过LRU算法进行磁盘数据存取。**

## 简介

本项目基于开源库 [DiskLruCache](https://github.com/JakeWharton/DiskLruCache) 进行OpenHarmony的自研版本：

- 支持应用内存空间存储文件。
- 支持存储ArrayBuffer数据类型和File文件路径。
- 支持存储容量的动态设置。

## 下载安装

```typescript
ohpm install @ohos/disklrucache
```
## 使用说明

#### 步骤1:

在index.ets页面中导入

```typescript
import { DiskLruCache } from '@ohos/disklrucache'
```

#### 步骤2:

在build中声明对象。

```typescript
testDiskLruCache: DiskLruCache = undefined
```

在使用之前初始化对象，首先在Ability或者Application使用GlobalContext.getContext.setObject("context", this.context)注册context。

```
import Ability from '@ohos.application.Ability'
export default class MainAbility extends Ability {
    onCreate(want, launchParam) {
        GlobalContext.getContext.setObject("context", this.context)
    }
 }
```

然后在页面中创建对象。

```typescript
// 使用应用缓存路径创建文件夹名称为diskLruCache,设置磁盘缓存大小为3M(可选参数，默认设置缓存大小为300M，最大设置不能超过300M)
this.testDiskLruCache = DiskLruCache.create(GlobalContext.getContext.getObject("context"), 3 * 1024 * 1024)
```

#### 步骤3:

在build中添加按钮，将图片文件存入磁盘缓存。

同步设置字符串缓存数据。

```typescript
let data: string = "Hello World Simple Example.";
this.testDiskLruCache.set('test', data);
```

同步读取字符串磁盘缓存数据。

```typescript
let data:ArrayBuffer = this.testDiskLruCache.get('test');
console.log(String.fromCharCode.aplly(null, new Uint8Array(data)));
```

同步设置文件磁盘缓存数据。

```typescript
import fs from '@ohos.file.fs';

let path = '/data/storage/el2/base/com.example.disklrucache/entry/files/testFile.txt';
let fd = fs.openSync(path, 0o2);
let length = fs.statSync(path).size;
let data = new ArrayBuffer(length);
fs.readSync(fd, data);
this.testDiskLruCache.set('testFile', data);
```

同步读取文件磁盘缓存数据。

```typescript
let data:ArrayBuffer = this.testDiskLruCache.get('testFile');
```

异步设置字符串磁盘缓存数据和一部获取字符串磁盘缓存数据。

```typescript
let value: string = "Hello World Simple Example.";
this.testDiskLruCache.setAsync('test', value).then(() => {
    this.testDiskLruCache.getAsync('test').then((data) => {
        console.log(String.fromCharCode.aplly(null, new Uint8Array(data)));
    })
}).catch((err) => {
    console.log('err =' + err);
})
```

异步设置文件磁盘缓存数据和异步获取文件磁盘缓存数据。

```typescript
import fs from '@ohos.file.fs';

let path = '/data/storage/el2/base/com.example.disklrucache/entry/files/testFile.txt';
let file = fs.openSync(path, 0o2);
let length = fs.statSync(path).size;
let value = new ArrayBuffer(length);
fs.readSync(file.fd, data);
this.testDiskLruCache.setAsync('test', value).then(() => {
    this.testDiskLruCache.getAsync('test').then((data) => {
        console.log(String.fromCharCode.aplly(null, new Uint8Array(data)));
    })
}).catch((err) => {
    console.log('err =' + err);
})
```

#### 步骤4:

更多细节设置请参考index.ets示例文件。

## 接口说明

### DiskLruCache接口

| 方法名                                                       | 入参                                        | 接口描述                                       |
| ------------------------------------------------------------ | ------------------------------------------- | ---------------------------------------------- |
| create(context, maxSize?: number): DiskLruCache              | context, maxSize?: number                   | 构造器创建对象，设置磁盘缓存路径，磁盘缓存大小 |
| setMaxSize(max: number) :void                                | max: number                                 | 重置磁盘缓存大小                               |
| set(key: string, content: ArrayBuffer \| string):void        | key: string, content: ArrayBuffer \| string | 磁盘缓存存入数据                               |
| setAsync(key: string, content: ArrayBuffer \| string):Promise<void> | key: string, content: ArrayBuffer \| string | 异步磁盘缓存存入数据                           |
| get(key: string): ArrayBuffer                                | key: string                                 | 磁盘缓存获取ArrayBuffer                        |
| getAsync(key: string): Promise<ArrayBuffer>                  | key: string                                 | 异步磁盘缓存获取ArrayBuffer                    |
| getFileToPath(key: string): string                           | key: string                                 | 磁盘缓存获取文件路径                           |
| getFileToPathAsync(key: string): Promise<string>             | key: string                                 | 异步磁盘缓存获取文件路径                       |
| getPath(): string                                            |                                             | 获取缓存路径                                   |
| deleteCacheDataByKey(key: string): DiskCacheEntry            | key: string                                 | 删除当前缓存key对应的DiskCacheEntry            |
| cleanCacheData()                                             |                                             | 清除所有磁盘缓存数据                           |

## 约束与限制

在下述版本验证通过：
- DevEco Studio: 4.0(4.0.3.512),SDK: API10（4.0.10.9）
- DevEco Studio: 3.1 Beta2(3.1.0.400), SDK: API9 Release(3.2.11.9)

## 目录结构

```
/disklrucache/src/
- main/ets/components
    - cache               # 缓存相关内容
       - CustomMap.ets       # 自定义Map封装
       - DiskCacheEntry.ets  # 磁盘缓存entry
       - DiskLruCache.ets    # 磁盘LRU缓存策略
       - FileReader.ets      # 文件读取相关
       - FileUtils.ets       # 文件工具类       
/entry/src/
- main/ets     
    - pages               # 测试page页面列表
       - index.ets           # 测试磁盘缓存页面
```

## 贡献代码

使用过程中发现任何问题都可以提 [issue](https://gitee.com/openharmony-sig/ohos_disklrucache/issues)
给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-sig/ohos_disklrucache/pulls) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-sig/ohos_disklrucache/blob/master/LICENSE) ，请自由的享受和参与开源。
