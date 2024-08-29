## 简介
Hummer跨端SDK的鸿蒙实现  

![Hummer 鸿蒙化](https://img-hxy021.didistatic.com/static/starimg/img/nMD3k7Ojc61712126016790.jpg)
* tenon：DSL 层，面向业务开发
* Hummer API：面向前端规范+兼容手写ts接口。
* Dom 接口协议：跨平台 JS 接口
* 鸿蒙运行时 & Hummer Core：两种方案实现 Dom 接口协议，实现 Hummer API/tenon 到鸿蒙组件的bridge。
* 鸿蒙运行时：使用 ArkTS 引擎模拟 JS 运行环境，由于 ArkTS 引擎没有动态化能力，因此该方案也无动态化能力，因此称静态化方案
* Hummer Core：使用嵌入额外JS引擎+布局引擎的方式。因此具有动态化能力，也称动态化方案
