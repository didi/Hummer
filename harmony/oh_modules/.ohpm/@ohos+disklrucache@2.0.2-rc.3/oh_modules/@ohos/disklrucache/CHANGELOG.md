## 2.0.2-rc.3
- 把废弃的@ohos/fileio变更为@ohos.file.fs

## 2.0.2-rc.2
- 捕获判断文件夹接口异常导致应用闪退问题

## 2.0.2-rc.1
- exist,existFolder接口改用accessSync接口，减少耗时
- 同步文件数据修改成异步调用并且在异步中执行close，减少耗时
- 捕获创建文件失败异常
- 
## 2.0.2-rc.0
- 修复不兼容API9问题
- 
## 2.0.1
- 适配ArkTs语法
- 适配DevEco Studio: 4.0(4.0.3.512)
- 适配SDK: API10（4.0.10.9）
## 2.0.0
- 包管理工具由npm切换为ohpm
- 适配DevEco Studio: 3.1Beta2(3.1.0.400)
- 适配SDK: API9 Release(3.2.11.9)

## 1.0.1
- 适配DevEco Studio 3.1 Beta1版本。

## 1.0.0

**专门为OpenHarmony打造的一款磁盘缓存库，通过LRU算法进行磁盘数据存取。**

- 支持应用内存空间存储文件。
- 支持存储ArrayBuffer数据类型和File文件路径。
- 支持存储容量的动态设置。