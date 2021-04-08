# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.4](https://github.com/didi/Hummer/compare/tenon_1.2.2...tenon_1.2.4) (2021-04-08)


### Bug Fixes

* **Android:** 修复intent数据获取时可能引起的崩溃问题 ([d64a8d0](https://github.com/didi/Hummer/commit/d64a8d00345b8cca24dc1d346a464a0f03e85f80))
* **Android:** 修复JSCallback延迟销毁引起的野指针问题 ([1824b8d](https://github.com/didi/Hummer/commit/1824b8d9eee068453d2a7ba605209438c4b013af))
* **Android:** 修复Loading对话框没有去除默认背景的问题 ([9671e04](https://github.com/didi/Hummer/commit/9671e04cb3ecd28c40a41a7bd65c2652032f04d9))
* **iOS:** Add malloc(0) safe path ([be134aa](https://github.com/didi/Hummer/commit/be134aab939eda193196e5cf3f9dbec409adbdea))
* **iOS:** block can use void argument ([08dc9da](https://github.com/didi/Hummer/commit/08dc9daf8dcc4fe2d3ecb6b91fbf1241f8a5d407))
* **iOS:** exceptionHandler add namespace ([#108](https://github.com/didi/Hummer/issues/108)) ([f27d1ef](https://github.com/didi/Hummer/commit/f27d1ef1be3ecf595e00dbea74821d3464bdb1af))
* **iOS:** Remove unused View declare ([597a9c8](https://github.com/didi/Hummer/commit/597a9c8c4c7aa46f3e6782cd2361239faef5098c))
* **iOS:** Use contentView instead of LayoutObserver ([#106](https://github.com/didi/Hummer/issues/106)) ([931164f](https://github.com/didi/Hummer/commit/931164fc7308b2eee625594928aad66de7a5bc9b))
* **iOS:** weak value does not need compare self ([df21749](https://github.com/didi/Hummer/commit/df217491120d0499bdaa497c49650c7da5af1fc0))


### Features

* **Android:** android test version: 0.3.18.1 ([c225bd9](https://github.com/didi/Hummer/commit/c225bd948bd43b97fbf290a93c4cd39255ae46ba))
* **Android:** android test version: 0.3.18.2 ([40679a1](https://github.com/didi/Hummer/commit/40679a14557a2fd09e71d2904bab1d16008812d4))


### Reverts

* Revert "fix(iOS): Use contentView instead of LayoutObserver" (#114) ([2c0f5f7](https://github.com/didi/Hummer/commit/2c0f5f7a19d776885b42af88abb6f6b10ac62c29)), closes [#114](https://github.com/didi/Hummer/issues/114) [#106](https://github.com/didi/Hummer/issues/106)





## [1.2.3](https://github.com/didi/Hummer/compare/tenon_1.2.2...tenon_1.2.3) (2021-03-30)


### Bug Fixes

* **Android:** 修复intent数据获取时可能引起的崩溃问题 ([d64a8d0](https://github.com/didi/Hummer/commit/d64a8d00345b8cca24dc1d346a464a0f03e85f80))
* **Android:** 修复JSCallback延迟销毁引起的野指针问题 ([1824b8d](https://github.com/didi/Hummer/commit/1824b8d9eee068453d2a7ba605209438c4b013af))
* **Android:** 修复Loading对话框没有去除默认背景的问题 ([9671e04](https://github.com/didi/Hummer/commit/9671e04cb3ecd28c40a41a7bd65c2652032f04d9))
* **iOS:** Add malloc(0) safe path ([be134aa](https://github.com/didi/Hummer/commit/be134aab939eda193196e5cf3f9dbec409adbdea))
* **iOS:** block can use void argument ([08dc9da](https://github.com/didi/Hummer/commit/08dc9daf8dcc4fe2d3ecb6b91fbf1241f8a5d407))
* **iOS:** exceptionHandler add namespace ([#108](https://github.com/didi/Hummer/issues/108)) ([f27d1ef](https://github.com/didi/Hummer/commit/f27d1ef1be3ecf595e00dbea74821d3464bdb1af))
* **iOS:** Remove unused View declare ([597a9c8](https://github.com/didi/Hummer/commit/597a9c8c4c7aa46f3e6782cd2361239faef5098c))
* **iOS:** Use contentView instead of LayoutObserver ([#106](https://github.com/didi/Hummer/issues/106)) ([931164f](https://github.com/didi/Hummer/commit/931164fc7308b2eee625594928aad66de7a5bc9b))
* **iOS:** weak value does not need compare self ([df21749](https://github.com/didi/Hummer/commit/df217491120d0499bdaa497c49650c7da5af1fc0))


### Features

* **Android:** android test version: 0.3.18.1 ([c225bd9](https://github.com/didi/Hummer/commit/c225bd948bd43b97fbf290a93c4cd39255ae46ba))
* **Android:** android test version: 0.3.18.2 ([40679a1](https://github.com/didi/Hummer/commit/40679a14557a2fd09e71d2904bab1d16008812d4))





## [1.2.2](https://github.com/didi/Hummer/compare/tenon_1.2.1...tenon_1.2.2) (2021-03-11)


### Bug Fixes

* Transform ownership to variable that is captured by block ([6c37492](https://github.com/didi/Hummer/commit/6c37492cccb0093e850e655730d823ee9f75f563))
* 修复 tenon 事件绑定中触发 iOS断言问题 ([fec34f4](https://github.com/didi/Hummer/commit/fec34f400acb2557ef5703fe136fa2bbb36f951d))
* **Android:** 修复loadScriptWithUrl的回调异常问题 ([fd9cc91](https://github.com/didi/Hummer/commit/fd9cc91d2405bc5dac1f7afee92f4ef8ba6b1657))
* **Android:** 修复Scroller组件子容器的子容器改变内容时，高度无法撑开的问题 ([ba7a96a](https://github.com/didi/Hummer/commit/ba7a96a6fab2bce080bfa0b7d1792e12297660b5))
* **iOS:** -Werror=incomplete-implementation ([42205d7](https://github.com/didi/Hummer/commit/42205d7ca43bb2fa846a60e690ef0dd196078d46))


### Features

* **Android:** android release version: 0.3.18 ([d137b65](https://github.com/didi/Hummer/commit/d137b6521e00368e89a5588c16602a701337d022))
* **Android:** android release version: 0.3.18 ([9366517](https://github.com/didi/Hummer/commit/93665175d23c48778a93ee1676443a4a728c1a9e))
* **Android:** android test version: 0.3.17.3 ([3f06076](https://github.com/didi/Hummer/commit/3f06076954a2211d98ff7e3471c4460e00b81fe7))
* **Android:** Hummer.env 中增加 namespace 字段 ([b7af77f](https://github.com/didi/Hummer/commit/b7af77f8bdd18ad92e0d6dd7637499c06dc19cf2))
* **Android:** 修改动画组件的repeatCount属性定义，和iOS对齐；新增repeatMode属性 ([3def796](https://github.com/didi/Hummer/commit/3def796b0dc2c87fab8daec7d2c2104412f25b1f))
* **Android:** 增加arm64库的支持 ([9abb78e](https://github.com/didi/Hummer/commit/9abb78e699e02f39d06d05deb1575cee9c849f6e))
* **iOS:** Add empty isDate and toDate ([7f0ead4](https://github.com/didi/Hummer/commit/7f0ead4f859cba5cd6bfdce96fb5f6b3d1a4879a))
* **iOS:** Add WARNING_CFLAGS ([f8b12de](https://github.com/didi/Hummer/commit/f8b12de55faaa51a49668ae60d897716516ce32d))
* **iOS:** Use NSInvocation instead of block directly ([fd88934](https://github.com/didi/Hummer/commit/fd889343fb0815319b83e864a934cf46935e8167))





## [1.2.1](https://github.com/didi/Hummer/compare/tenon_1.2.0...tenon_1.2.1) (2021-02-25)


### Bug Fixes

* 修复颜色色值 #eee 不生效的情况 ([#88](https://github.com/didi/Hummer/issues/88)) ([c08849a](https://github.com/didi/Hummer/commit/c08849adb56fa29e639fd46c3909d25bc4c5af86))
* **iOS:** Change arguments to args ([8399889](https://github.com/didi/Hummer/commit/83998897f56d86f0eb56554a21145df91f6a319b))
* **iOS:** Request GC ([9dfb53a](https://github.com/didi/Hummer/commit/9dfb53a239c1cebb454574adbdf2632f852b09bc))





# [1.2.0](https://github.com/didi/Hummer/compare/tenon_1.1.0...tenon_1.2.0) (2021-02-23)


### Bug Fixes

* **iOS:** console polyfill not work ([00ddbe8](https://github.com/didi/Hummer/commit/00ddbe816d9adb8f3a376eb272060c07330eb553))


### Features

* Tenon Store 增加业务线隔离的逻辑 ([#84](https://github.com/didi/Hummer/issues/84)) ([536ecbe](https://github.com/didi/Hummer/commit/536ecbe2968b24caba07c5217a754444bc8dd49f))
* **iOS:** Add namespace to Hummer.env ([7b64ba5](https://github.com/didi/Hummer/commit/7b64ba549147217425eef7431de01d73e97aa542))





# 1.1.0 (2021-02-23)


### Bug Fixes

* **Android:** 日常bugfix ([#71](https://github.com/didi/Hummer/issues/71)) ([a6202e4](https://github.com/didi/Hummer/commit/a6202e416c10993dc2cc9c8d0148dc9e7ea8ae8e))
* **Android:** 日常bugfix ([#78](https://github.com/didi/Hummer/issues/78)) ([39a0861](https://github.com/didi/Hummer/commit/39a08619d443f62ed5e1e82131c6b1b541ab8b4b))
* **iOS:** Build error ([#73](https://github.com/didi/Hummer/issues/73)) ([56b95ff](https://github.com/didi/Hummer/commit/56b95ff404a6481080b8b3c29a942e8b8bb500db))
* **iOS:** console polyfill error ([5a77f6c](https://github.com/didi/Hummer/commit/5a77f6ce45da453b900b9d68c9fe33b99aeaf114))
* **iOS:** Error ([#72](https://github.com/didi/Hummer/issues/72)) ([7e8afb9](https://github.com/didi/Hummer/commit/7e8afb9616fdf28cb4bbdce6ea031a9257ef571b))
* **iOS:** HMCompatibleRenderObject affect UIScrollView and hm_sizeThatFits: ([#44](https://github.com/didi/Hummer/issues/44)) ([ae632ef](https://github.com/didi/Hummer/commit/ae632ef04ffb736d82fbba75cb4e54fcbb4a2644))
* **iOS:** hummerSetFrame modify bounds.origin bug ([#10](https://github.com/didi/Hummer/issues/10)) ([d6983eb](https://github.com/didi/Hummer/commit/d6983eb6a2a6f0baa57954b99bed91ffc2088fb3))
* **iOS:** Inner code sync ([#68](https://github.com/didi/Hummer/issues/68)) ([64a099b](https://github.com/didi/Hummer/commit/64a099bf0c313d931249698defca82c7469c657e))
* **iOS:** JavaScriptCore finalize callback assert crash ([#45](https://github.com/didi/Hummer/issues/45)) ([7a9be7c](https://github.com/didi/Hummer/commit/7a9be7c7468864642af9db4375f4930b9f8a9274))
* **iOS:** JavaScriptCore finalize callback crash ([#47](https://github.com/didi/Hummer/issues/47)) ([f07f0bb](https://github.com/didi/Hummer/commit/f07f0bb654a59e875a26c3fb8dbd988ddc88abff))
* **iOS:** Remove duplicate polyfill ([b015617](https://github.com/didi/Hummer/commit/b015617e44784718f4f351957f3d92c409a22870))
* **iOS:** Remove old logic ([81a0af8](https://github.com/didi/Hummer/commit/81a0af837f71d2a4e406c40da10e9ae35f56deae))
* Accessbility conflict with React Native ([#14](https://github.com/didi/Hummer/issues/14)) ([6abbdf1](https://github.com/didi/Hummer/commit/6abbdf16f43d3fbcbedb5e2780a9e32c97bea019))
* console.log print twice ([#52](https://github.com/didi/Hummer/issues/52)) ([30b9142](https://github.com/didi/Hummer/commit/30b9142d97f04dcd6eee8500f7e054a97027e629))
* HMUIManager origin.y plus oldOrigin.x error ([#22](https://github.com/didi/Hummer/issues/22)) ([eb4311e](https://github.com/didi/Hummer/commit/eb4311e8ecec194f8362cfab48340f94d9f0bfc5))
* ISSUE_TEMPLATE.md error ([#23](https://github.com/didi/Hummer/issues/23)) ([aed5cbf](https://github.com/didi/Hummer/commit/aed5cbf39069fe372773089230a6ee3179c70ea3))
* ISSUE_TEMPLATE.md YAML front matter error ad so on ([#21](https://github.com/didi/Hummer/issues/21)) ([6135c84](https://github.com/didi/Hummer/commit/6135c843573ced26fe4040b40b80fd78502063c9))


### Features

* **android:** android sdk update ([#39](https://github.com/didi/Hummer/issues/39)) ([f98f70a](https://github.com/didi/Hummer/commit/f98f70a9d264b4a95074567dfdbd4e9765fed5cd))
* **Android:** android release version: 0.3.16 ([#66](https://github.com/didi/Hummer/issues/66)) ([382c7b7](https://github.com/didi/Hummer/commit/382c7b7412e8c0d95f256d4c1e871bd7580cbf52))
* **iOS:** Add Abstract JSContext, JSValue and ExceptionModel ([#34](https://github.com/didi/Hummer/issues/34)) ([772adbb](https://github.com/didi/Hummer/commit/772adbbdd9cf6e6f4edea70e6fe8ab492d5d16e1))
* **iOS:** Add nativeLoggingHook ([54b457d](https://github.com/didi/Hummer/commit/54b457d13b748211a70b69061f001b6c09d323bb))
* **iOS:** Add number string force convert ([#56](https://github.com/didi/Hummer/issues/56)) ([a3d8c92](https://github.com/didi/Hummer/commit/a3d8c92ff781b47bb41bfff075aff84a539e22a5))
* **iOS:** Add ShadowView Unit Test ([#11](https://github.com/didi/Hummer/issues/11)) ([443d07e](https://github.com/didi/Hummer/commit/443d07e5bce70b40caa8b38d6f9fe80b5c2b35df))
* **iOS:** Implement HMJSCExecutor C code ([#40](https://github.com/didi/Hummer/issues/40)) ([17bfe9c](https://github.com/didi/Hummer/commit/17bfe9cdc0e3d61bcd89dffcecc640ce122b2a24))
* **iOS:** 移除 className ([1ef8ac7](https://github.com/didi/Hummer/commit/1ef8ac7b9c8baee848b4a67438607bb3b2666ec6))
* init tenon project ([6d3f979](https://github.com/didi/Hummer/commit/6d3f97983f4174dc1591e67cc1183862785d1ccc))
* **iOS:** HMJSCExecutor enhancement ([#43](https://github.com/didi/Hummer/issues/43)) ([d59d327](https://github.com/didi/Hummer/commit/d59d3273473c741c1fbd48890be30cded809426c))
* **iOS:** Implement JavaScriptCore JSValue ([#36](https://github.com/didi/Hummer/issues/36)) ([4abb998](https://github.com/didi/Hummer/commit/4abb9987770bf4f3592a278a8b03a7fba204c5fd))
* Add config.yml ([#25](https://github.com/didi/Hummer/issues/25)) ([b5e9931](https://github.com/didi/Hummer/commit/b5e99313fd84ba8cabb76d259ab87f88c9721c63))
* Add ISSUE_TEMPLATE and PULL_REQUEST_TEMPLATE ([#19](https://github.com/didi/Hummer/issues/19)) ([ca3c6e6](https://github.com/didi/Hummer/commit/ca3c6e6567277eb6bead73ebb6bc60897f302d17))
* android sdk update ([#7](https://github.com/didi/Hummer/issues/7)) ([4bd0962](https://github.com/didi/Hummer/commit/4bd09621083d488149c8da0813ea6556188eec4b))
* master migration ([#6](https://github.com/didi/Hummer/issues/6)) ([bdd9b67](https://github.com/didi/Hummer/commit/bdd9b676b2f32259e8c00762dc3ae1dd1525009e))
* master migration ([#9](https://github.com/didi/Hummer/issues/9)) ([d54b704](https://github.com/didi/Hummer/commit/d54b704447822a0109a02ae32428bb8218eeb61c))





# Change Log
### Bug Fixes

### Features
