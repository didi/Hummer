# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.2](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/compare/v0.0.1-apch.4...v0.0.2) (2023-10-24)

**Note:** Version bump only for package root





## 0.0.1-apch.4 (2023-10-24)


### Bug Fixes

* 修复Camera组件子线程调用JSCallback stack overflow 问题 ([26d69e0](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/26d69e0dd37608fc6f19cf3c6143252019b7c221))
* 修复interface default写法（java8新特性）在mas打的包中crash问题，临时把interface修改成了abstract class ([dbd58cf](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/dbd58cffb04aa05933331f6470dfa2759a8c0161))
* **iOS:** 优化app杀端服务，增加api，停止服务，清除缓存数据 ([fa4713c](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/fa4713cddd92c95e690b1dc923653d988c6f959c))
* **iOS:** 震动参数错误 ([e0b36d2](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/e0b36d2e17758866bae41ba2984bc832d0df30f5))
* **iOS:** locationManager: didChangeAuthorizationStatus: not call ([31b1e3d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/31b1e3dbf66b0b92afa335446a6a83903b5546a9))
* resize with 'whitespace' ([07872c7](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/07872c7f3b8e03201e3ff73f5cc188eded01619b))


### Features

* **Android:** 调整组件实现. ([78537e9](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/78537e986ebb327d350600067228557ad1cacc03))
* **android:** 新增单元测试 ([25b1269](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/25b1269ad4140856f5c251fd22fa2cddd551549e))
* **android:** 新增单元测试HMXCamera ([6deec7c](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/6deec7c9446e6c5b874e4eda48801574f52e40fe))
* **android:** HMXCamera 增加Dokit 移除照片写入系统相册能力 ([fd907d3](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/fd907d306507f16f6c6b72d1a7703ace4b246f06))
* **iOS:** 去除apollo依赖，迁移至HummerXS-Internal ([4158ff2](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/4158ff2137a7ce5dda512ca226999f892f517964))
* **iOS:** 添加app杀端时间服务，记录上次杀端时间 ([70398d8](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/70398d85f288d20c0206d5cfa91d2fba259eed92))
* **iOS:** 优化app杀端服务 自启动逻辑 ([259ba91](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/259ba91625632a387ea1575171bd245449786485))
* **iOS:** 优化app杀端时间，apollo默认开关值改为false ([9ee5eb2](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/9ee5eb2fd7327acf137839f8e159afe245c91dd0))
* **iOS:** 震动 ([db9af22](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/db9af22edc4091e4659fcb50684ce6582e32e131))
* **iOS:** 震动 ([d2df74f](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d2df74feba7f26199b44c7f4a17f2f48eb1ce579))
* **iOS:** add application state ([09fa03f](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/09fa03f40a0ac01ee68bd70621209a90a9c2123b))
* **iOS:** add entire spec ([278bb6d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/278bb6df925cbc569abc3806ffed0bbbb146c42c))
* **iOS:** add error ([deea03d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/deea03d3d7fa58a0c5e73223b62678cd7c962612))
* **iOS:** add file error ([60fa6ce](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/60fa6ce8c7ed2734e7b5311f889d059c321e25f8))
* **iOS:** app启动服务支持 禁止自动启动 ([61c808d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/61c808d05df6bc638ee3cf6b953014fa3b828f19))
* **iOS:** App杀端服务增加日志 ([d8b1640](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d8b1640c00175cc8fdd9279ced32e4a25bb7cdfe))
* **iOS:** app杀端检测服务，移除log ([0243ecf](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/0243ecf644de2eb9370c3ea91113edd5f4d953fc))
* **iOS:** App杀端时间模块移除测试代码 ([238f2e4](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/238f2e4dd7973bfb383b0a27b204683d822ea0fd))
* **iOS:** appExitTime 增加test case ([04c2ecc](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/04c2ecc3b43ac66963ad20eb6c30b572952942cb))
* **iOS:** audio ([74a6824](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/74a68247d4e31a649c2f955f893a07d55d0f6811))
* **iOS:** audio rename api ([3366d18](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/3366d1817b765208c09d454c764d41455c9c33e7))
* **iOS:** change document -> cache ([e1ba4e3](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/e1ba4e35518b0f69f34cd2a6f8bfebf4de36eae6))
* **iOS:** export api ([aa614c6](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/aa614c6fe678a01d108d842d3c8274e4b83d53bd))
* **iOS:** init cmt ([0ba0114](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/0ba0114006b1bbe0d1e50fae960b18e09662fdd9))
* **iOS:** permission ([7492914](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/7492914bdc67cd1c97a7aa4e0022a4c6b6bfa6d1))
* **iOS:** permission tags params check ([1384d0d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/1384d0d71b561ca1a63d3a468c7621f0ce87e60c))
* **iOS:** push & takePhoto ([d7766b3](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d7766b3e7746a0fcb754822d5ac7bd89cce887b1))
* **iOS:** remove size compact ([d4d075d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d4d075d895f6d1bdc4df8e664039856ca51520c5))
* **iOS:** remove submodule ([4fa2c84](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/4fa2c843349c8e3177269b7071765fb19bab09ce))
* **iOS:** rename error ([0dca354](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/0dca354feab2d291d810e949b20e10a357cd50c7))
* jssdk 骨架搭建 ([6d63c92](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/6d63c928b68450dcdc93de8d5e830aa876807b87))





## [0.0.1-apch.3](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/compare/v0.0.1-apch.2...v0.0.1-apch.3) (2023-10-20)

**Note:** Version bump only for package root





## 0.0.1-apch.2 (2023-10-20)


### Bug Fixes

* 修复Camera组件子线程调用JSCallback stack overflow 问题 ([26d69e0](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/26d69e0dd37608fc6f19cf3c6143252019b7c221))
* 修复interface default写法（java8新特性）在mas打的包中crash问题，临时把interface修改成了abstract class ([dbd58cf](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/dbd58cffb04aa05933331f6470dfa2759a8c0161))
* **iOS:** 优化app杀端服务，增加api，停止服务，清除缓存数据 ([fa4713c](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/fa4713cddd92c95e690b1dc923653d988c6f959c))
* **iOS:** 震动参数错误 ([e0b36d2](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/e0b36d2e17758866bae41ba2984bc832d0df30f5))
* **iOS:** locationManager: didChangeAuthorizationStatus: not call ([31b1e3d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/31b1e3dbf66b0b92afa335446a6a83903b5546a9))
* resize with 'whitespace' ([07872c7](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/07872c7f3b8e03201e3ff73f5cc188eded01619b))


### Features

* **Android:** 调整组件实现. ([78537e9](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/78537e986ebb327d350600067228557ad1cacc03))
* **android:** 新增单元测试 ([25b1269](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/25b1269ad4140856f5c251fd22fa2cddd551549e))
* **android:** 新增单元测试HMXCamera ([6deec7c](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/6deec7c9446e6c5b874e4eda48801574f52e40fe))
* **android:** HMXCamera 增加Dokit 移除照片写入系统相册能力 ([fd907d3](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/fd907d306507f16f6c6b72d1a7703ace4b246f06))
* **iOS:** 去除apollo依赖，迁移至HummerXS-Internal ([4158ff2](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/4158ff2137a7ce5dda512ca226999f892f517964))
* **iOS:** 添加app杀端时间服务，记录上次杀端时间 ([70398d8](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/70398d85f288d20c0206d5cfa91d2fba259eed92))
* **iOS:** 优化app杀端服务 自启动逻辑 ([259ba91](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/259ba91625632a387ea1575171bd245449786485))
* **iOS:** 优化app杀端时间，apollo默认开关值改为false ([9ee5eb2](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/9ee5eb2fd7327acf137839f8e159afe245c91dd0))
* **iOS:** 震动 ([db9af22](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/db9af22edc4091e4659fcb50684ce6582e32e131))
* **iOS:** 震动 ([d2df74f](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d2df74feba7f26199b44c7f4a17f2f48eb1ce579))
* **iOS:** add application state ([09fa03f](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/09fa03f40a0ac01ee68bd70621209a90a9c2123b))
* **iOS:** add entire spec ([278bb6d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/278bb6df925cbc569abc3806ffed0bbbb146c42c))
* **iOS:** add error ([deea03d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/deea03d3d7fa58a0c5e73223b62678cd7c962612))
* **iOS:** add file error ([60fa6ce](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/60fa6ce8c7ed2734e7b5311f889d059c321e25f8))
* **iOS:** app启动服务支持 禁止自动启动 ([61c808d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/61c808d05df6bc638ee3cf6b953014fa3b828f19))
* **iOS:** App杀端服务增加日志 ([d8b1640](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d8b1640c00175cc8fdd9279ced32e4a25bb7cdfe))
* **iOS:** app杀端检测服务，移除log ([0243ecf](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/0243ecf644de2eb9370c3ea91113edd5f4d953fc))
* **iOS:** App杀端时间模块移除测试代码 ([238f2e4](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/238f2e4dd7973bfb383b0a27b204683d822ea0fd))
* **iOS:** appExitTime 增加test case ([04c2ecc](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/04c2ecc3b43ac66963ad20eb6c30b572952942cb))
* **iOS:** audio ([74a6824](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/74a68247d4e31a649c2f955f893a07d55d0f6811))
* **iOS:** audio rename api ([3366d18](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/3366d1817b765208c09d454c764d41455c9c33e7))
* **iOS:** change document -> cache ([e1ba4e3](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/e1ba4e35518b0f69f34cd2a6f8bfebf4de36eae6))
* **iOS:** export api ([aa614c6](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/aa614c6fe678a01d108d842d3c8274e4b83d53bd))
* **iOS:** init cmt ([0ba0114](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/0ba0114006b1bbe0d1e50fae960b18e09662fdd9))
* **iOS:** permission ([7492914](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/7492914bdc67cd1c97a7aa4e0022a4c6b6bfa6d1))
* **iOS:** permission tags params check ([1384d0d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/1384d0d71b561ca1a63d3a468c7621f0ce87e60c))
* **iOS:** push & takePhoto ([d7766b3](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d7766b3e7746a0fcb754822d5ac7bd89cce887b1))
* **iOS:** remove size compact ([d4d075d](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/d4d075d895f6d1bdc4df8e664039856ca51520c5))
* **iOS:** remove submodule ([4fa2c84](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/4fa2c843349c8e3177269b7071765fb19bab09ce))
* **iOS:** rename error ([0dca354](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/0dca354feab2d291d810e949b20e10a357cd50c7))
* jssdk 骨架搭建 ([6d63c92](https://git.xiaojukeji.com/OrangeLabs/Hummer/hummerx/commits/6d63c928b68450dcdc93de8d5e830aa876807b87))
