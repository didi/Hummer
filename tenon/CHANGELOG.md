# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.7](https://github.com/didi/Hummer/compare/tenon_1.2.2...tenon_1.2.7) (2021-05-20)


### Bug Fixes

* 剔除无法判断的场景v-bind='obj'和:[key]='xxx' ([a28d203](https://github.com/didi/Hummer/commit/a28d2035ee650fa0fbdd786805e2e45af455eb82))
* **Android:** 修复evaluateJavaScript中scriptId传null时出现空指针异常 ([749e68a](https://github.com/didi/Hummer/commit/749e68aa85930776ac86f87a7a9cc919a35fc66b))
* **Android:** 修复HotLoad时偶现的StackOverflow问题 ([08aa473](https://github.com/didi/Hummer/commit/08aa4730b9a3a31201fa3212e6ba6fae5386e73c))
* **Android:** 修复intent数据获取时可能引起的崩溃问题 ([d64a8d0](https://github.com/didi/Hummer/commit/d64a8d00345b8cca24dc1d346a464a0f03e85f80))
* **Android:** 修复JSCallback延迟销毁引起的野指针问题 ([1824b8d](https://github.com/didi/Hummer/commit/1824b8d9eee068453d2a7ba605209438c4b013af))
* **Android:** 修复Loading对话框没有去除默认背景的问题 ([9671e04](https://github.com/didi/Hummer/commit/9671e04cb3ecd28c40a41a7bd65c2652032f04d9))
* **Android:** 修复transform样式解析空格问题 ([ece7a7c](https://github.com/didi/Hummer/commit/ece7a7c30ddd2615a6ce27ee581b9262b0eabea2))
* **Android:** 修复ViewPager在触发touch事件时偶现index out of range问题 ([2268512](https://github.com/didi/Hummer/commit/226851289861152b33f71bf6abe2088a3012f5db))
* **Android:** 修复WebSocket组件子线程访问JS的问题 ([466b0c9](https://github.com/didi/Hummer/commit/466b0c951a138f97cc0c069dc78fee53077447d2))
* **Android:** 修复对话框内容是absolute样式的情况下显示异常的问题 ([2e16ce5](https://github.com/didi/Hummer/commit/2e16ce5006523eca720030538ec0c73a2edc779f))
* **Android:** 修复对话框在部分App环境下显示默认黑色背景的问题 ([7275c0c](https://github.com/didi/Hummer/commit/7275c0cae69dfeaede57d936ffb99644a8a850a8))
* **Android:** 修复对话框在部分App环境下显示默认黑色背景的问题 ([c14750d](https://github.com/didi/Hummer/commit/c14750dc96305d3a342c44ead08abb766b7bf064))
* **Android:** 修复对话框在部分App环境下显示默认黑色背景的问题 ([a2d64fa](https://github.com/didi/Hummer/commit/a2d64fa6fa7629bafc68a0558da604586cb0f956))
* **compiler:** 支持click自动转换tap事件 ([#152](https://github.com/didi/Hummer/issues/152)) ([19524cc](https://github.com/didi/Hummer/commit/19524ccf730b257f2e69425e990df86b3396cd56))
* **iOS:** - hm_sizeThatFits: Add position: 'absolute' case ([#165](https://github.com/didi/Hummer/issues/165)) ([57c7666](https://github.com/didi/Hummer/commit/57c7666a052e27c2fa4ad3d7c759462acfc047df))
* **iOS:** Add layerClass ([f11fdad](https://github.com/didi/Hummer/commit/f11fdad7cde26bef4b336bf03384847dec9fbed0))
* **iOS:** Add malloc(0) safe path ([be134aa](https://github.com/didi/Hummer/commit/be134aab939eda193196e5cf3f9dbec409adbdea))
* **iOS:** Animation error ([99279e1](https://github.com/didi/Hummer/commit/99279e1e6fd054841029a394b34d3df50e2ca0b1))
* **iOS:** block can use void argument ([08dc9da](https://github.com/didi/Hummer/commit/08dc9daf8dcc4fe2d3ecb6b91fbf1241f8a5d407))
* **iOS:** bounces only change native bounces ([63f5dcf](https://github.com/didi/Hummer/commit/63f5dcf875f214c66e8ec8c43c4c840ff36dbf2a))
* **iOS:** Build error ([#166](https://github.com/didi/Hummer/issues/166)) ([63fb134](https://github.com/didi/Hummer/commit/63fb134874523b78319f5aa55e1bcf46e982185b))
* **iOS:** Crash ([#159](https://github.com/didi/Hummer/issues/159)) ([8231117](https://github.com/didi/Hummer/commit/8231117a7424555dbca8f8e179a197d33f718c81))
* **iOS:** exceptionHandler add namespace ([#108](https://github.com/didi/Hummer/issues/108)) ([f27d1ef](https://github.com/didi/Hummer/commit/f27d1ef1be3ecf595e00dbea74821d3464bdb1af))
* **iOS:** flexbasis.wdith height  auto ([#171](https://github.com/didi/Hummer/issues/171)) ([c1bfefd](https://github.com/didi/Hummer/commit/c1bfefd7641b6f4df2773ea1bc77174cfaa57d27))
* **iOS:** Image location calculate add missing condidation ([#163](https://github.com/didi/Hummer/issues/163)) ([ed34d13](https://github.com/didi/Hummer/commit/ed34d132bb0261c6cebc2027158fc7fd4cf0a183))
* **iOS:** italic render error ([7a454b5](https://github.com/didi/Hummer/commit/7a454b53267962d50a4088123059194ae99989bd))
* **iOS:** List/ViewPager memory error ([9108b6c](https://github.com/didi/Hummer/commit/9108b6cb1ec44161a0438937c5ffe30200b96d58))
* **iOS:** Release build error ([#164](https://github.com/didi/Hummer/issues/164)) ([d35dc8f](https://github.com/didi/Hummer/commit/d35dc8ffd24b27a9051a03ca414088aa5f3c4899))
* **iOS:** Scroller/List scroll event error ([23457e3](https://github.com/didi/Hummer/commit/23457e3bb09e2fe911b35806df67cef79fbe99ef))
* **runtime:** 修复native组件布尔类型的属性传递问题 ([#155](https://github.com/didi/Hummer/issues/155)) ([ce1511e](https://github.com/didi/Hummer/commit/ce1511ec964260b763210ec1fb74f0db541f0467))
* **tenon:** 同时支持驼峰和横杠相连的属性传递 ([395c984](https://github.com/didi/Hummer/commit/395c984379cddd4b87134cf503f4e5c3ec02ab62))
* **tenon:** 添加条件判断属性转换驼峰 ([ddb4c33](https://github.com/didi/Hummer/commit/ddb4c3398d5dd04a9686be8156718ed246724403))
* update EventTracer ([b0ef6c3](https://github.com/didi/Hummer/commit/b0ef6c35f6ba1e3800c5081410f9236e56177d94))
* 修复 border 缩写与预期不符的问题 ([8f53cbf](https://github.com/didi/Hummer/commit/8f53cbf0d51b1e47f7c99921c39aa19c253fb9a1))
* 修复 flex 1部分场景不满足的问题 ([e147506](https://github.com/didi/Hummer/commit/e1475068c946bcb73b02ee9193abc1baee96dd64))
* 修复 Tenon 动态 hack 无法生效的问题 ([29b6fd3](https://github.com/didi/Hummer/commit/29b6fd3a0f2d08e6ca5388e29f1429eb45e9e829))
* 修复List组件在瀑布流模式下滑动过程中自动执行动画后，item间距错乱的问题 ([0d2c860](https://github.com/didi/Hummer/commit/0d2c8603ef1e2500695879c1f91a3a94cfdcb4f3))
* 修复List组件横向布局时的一些bug ([e267238](https://github.com/didi/Hummer/commit/e2672388727e4a1ac651d3c303d1e084177cf54c))
* 修复ViewPager动态改变canLoop属性时出现crash的问题 ([5786173](https://github.com/didi/Hummer/commit/5786173bb116f09a9f3eae1648abb601e4763f42))
* 修复加载本地.9图时无法自动拉伸的问题，改用原生加载方式 ([33e2a18](https://github.com/didi/Hummer/commit/33e2a188da1e49fb7a03a31600eb8789e3f4dc19))
* 修复退出页面时抛出JS异常时导致原生crash的问题 ([36e5960](https://github.com/didi/Hummer/commit/36e5960e00775ed1b16fb4db90133aeb6c6f73f3))
* 修复默认Storage适配器再初始化配置时的空指针问题 ([0024b22](https://github.com/didi/Hummer/commit/0024b22b8483bd49727c68f9ee1db26e14202a7f))
* 移除com.facebook.yoga:proguard-annotations依赖 ([ff45423](https://github.com/didi/Hummer/commit/ff45423917f2c2225ec890cf41f8fe809d7a76f9))
* **iOS:** NSArray NSNumber min max NSNotFound error ([570fb6f](https://github.com/didi/Hummer/commit/570fb6f66be7947f91ab76b299feaf55f2c71eb9))
* **iOS:** Remove unused View declare ([597a9c8](https://github.com/didi/Hummer/commit/597a9c8c4c7aa46f3e6782cd2361239faef5098c))
* **iOS:** UICollectionView nest twice and then GIF stop animation ([6b74a5e](https://github.com/didi/Hummer/commit/6b74a5e860795d3f138e8ed67493d0d918cbf012))
* **iOS:** Use contentView instead of LayoutObserver ([#106](https://github.com/didi/Hummer/issues/106)) ([931164f](https://github.com/didi/Hummer/commit/931164fc7308b2eee625594928aad66de7a5bc9b))
* **iOS:** weak value does not need compare self ([df21749](https://github.com/didi/Hummer/commit/df217491120d0499bdaa497c49650c7da5af1fc0))


### Features

* **Android:** android release version: 0.3.19 ([6945a06](https://github.com/didi/Hummer/commit/6945a068c5b0bc8c37390b7b11be386717f4edba))
* **Android:** android test version: 0.3.18.1 ([c225bd9](https://github.com/didi/Hummer/commit/c225bd948bd43b97fbf290a93c4cd39255ae46ba))
* **Android:** android test version: 0.3.18.2 ([40679a1](https://github.com/didi/Hummer/commit/40679a14557a2fd09e71d2904bab1d16008812d4))
* **Android:** android test version: 0.3.18.3 ([13cd946](https://github.com/didi/Hummer/commit/13cd946f4facc02e45b76d64ee96c5007b2fd355))
* **Android:** android test version: 0.3.18.4 ([b63c702](https://github.com/didi/Hummer/commit/b63c702d0925b91b716c2fd32aa65ffdd4856ec2))
* **Android:** android test version: 0.3.18.5 ([6014575](https://github.com/didi/Hummer/commit/601457529df7a21257227a3a6de6e0503044e90c))
* **Android:** android test version: 0.3.18.7 ([a0f7e8e](https://github.com/didi/Hummer/commit/a0f7e8e8a3666a9963a1958817e575c6cee1abdb))
* **Android:** android test version: 0.3.19.1 ([0eb37c7](https://github.com/didi/Hummer/commit/0eb37c7f813ae3dbb55399b1471aa84a834ff9b8))
* **Android:** android test version: 0.3.19.2 ([ba2beda](https://github.com/didi/Hummer/commit/ba2beda5dc455a33450720bc7c7bf10d9a2ea129))
* **Android:** android test version: 0.3.20 ([d7a20f3](https://github.com/didi/Hummer/commit/d7a20f3b7c2564445250b42c4c9bbcd566eef29d))
* **Android:** Hummer.loadScript 和 Hummer.loadScriptWithUrl 返回值重新定义 ([565d9ac](https://github.com/didi/Hummer/commit/565d9ac477c4d912654d8aa48fafb4c303bffafa))
* **Android:** 使用MavenCentral中发布的hermes-debugger新版本 ([9910eec](https://github.com/didi/Hummer/commit/9910eecd1a4528d567bb74b2105b3e4cf33288ad))
* **Android:** 支持Hummer.postException接口 ([455361f](https://github.com/didi/Hummer/commit/455361fd3f9bebe87b674fd52e37376925bd9a5e))
* **Android:** 支持RTL布局 ([b528e13](https://github.com/didi/Hummer/commit/b528e1321fb4dc09c3c2ab173df90f3e492811ec))
* **Android:** 支持RTL布局 ([76835ae](https://github.com/didi/Hummer/commit/76835aea192008180acbc4541af19116b8bc9f2a))
* **Android:** 新增局部视图使用Hummer渲染的示例 ([fb6b2ef](https://github.com/didi/Hummer/commit/fb6b2ef5ccf87ed7e9be0fc810607b1670e6b007))
* **Android:** 特殊处理下CML链接的WS端口号 ([9863ac2](https://github.com/didi/Hummer/commit/9863ac2bc0b5fbb6707382a258c6968db4c28af9))
* **Android:** 触摸事件支持返回屏幕相对坐标 ([731584b](https://github.com/didi/Hummer/commit/731584bd0d31b2ddf6bdab117afed16a893ab1f6))
* **iOS:** Add rawX/Y ([#158](https://github.com/didi/Hummer/issues/158)) ([9274ec8](https://github.com/didi/Hummer/commit/9274ec865dd043df586d563f4a6cf89dd32a4ac1))
* **iOS:** Image control auto resize ([#160](https://github.com/didi/Hummer/issues/160)) ([00d6397](https://github.com/didi/Hummer/commit/00d6397eacf58f01e2c993d86e8e31e2bd25a6e1))
* add iOS postException ([e53af00](https://github.com/didi/Hummer/commit/e53af00f2708b5d7d49069ec5ede972d0a689a72))
* **iOS:** Send console to CLI by WebSocket ([#143](https://github.com/didi/Hummer/issues/143)) ([06fae60](https://github.com/didi/Hummer/commit/06fae607c45a4e2a9cec3e6165662f02c1441565))
* Use hm_markDirty instead of setNeedsLayout ([a11daa4](https://github.com/didi/Hummer/commit/a11daa4f510be92e56005c6b6c9cf7ab491c5b41))
* 支持命令行窗口直接显示日志；修改代码自动热更新支持断开重连 ([a7a7d4b](https://github.com/didi/Hummer/commit/a7a7d4b51047ad09cd5351aee2f7d22b416efc68))
* **Android:** 整理示例页面 ([c514ba4](https://github.com/didi/Hummer/commit/c514ba491355d6d88ecb5dcce1bbbac9f002856f))


### Reverts

* Revert "fix(iOS): Use contentView instead of LayoutObserver" (#114) ([2c0f5f7](https://github.com/didi/Hummer/commit/2c0f5f7a19d776885b42af88abb6f6b10ac62c29)), closes [#114](https://github.com/didi/Hummer/issues/114) [#106](https://github.com/didi/Hummer/issues/106)





## [1.2.6](https://github.com/didi/Hummer/compare/tenon_1.2.2...tenon_1.2.6) (2021-05-07)


### Bug Fixes

* 修复 Tenon 动态 hack 无法生效的问题 ([29b6fd3](https://github.com/didi/Hummer/commit/29b6fd3a0f2d08e6ca5388e29f1429eb45e9e829))
* **Android:** 修复evaluateJavaScript中scriptId传null时出现空指针异常 ([749e68a](https://github.com/didi/Hummer/commit/749e68aa85930776ac86f87a7a9cc919a35fc66b))
* **Android:** 修复intent数据获取时可能引起的崩溃问题 ([d64a8d0](https://github.com/didi/Hummer/commit/d64a8d00345b8cca24dc1d346a464a0f03e85f80))
* **Android:** 修复JSCallback延迟销毁引起的野指针问题 ([1824b8d](https://github.com/didi/Hummer/commit/1824b8d9eee068453d2a7ba605209438c4b013af))
* **Android:** 修复Loading对话框没有去除默认背景的问题 ([9671e04](https://github.com/didi/Hummer/commit/9671e04cb3ecd28c40a41a7bd65c2652032f04d9))
* **Android:** 修复transform样式解析空格问题 ([ece7a7c](https://github.com/didi/Hummer/commit/ece7a7c30ddd2615a6ce27ee581b9262b0eabea2))
* **Android:** 修复对话框在部分App环境下显示默认黑色背景的问题 ([c14750d](https://github.com/didi/Hummer/commit/c14750dc96305d3a342c44ead08abb766b7bf064))
* **Android:** 修复对话框在部分App环境下显示默认黑色背景的问题 ([a2d64fa](https://github.com/didi/Hummer/commit/a2d64fa6fa7629bafc68a0558da604586cb0f956))
* **compiler:** 支持click自动转换tap事件 ([#152](https://github.com/didi/Hummer/issues/152)) ([19524cc](https://github.com/didi/Hummer/commit/19524ccf730b257f2e69425e990df86b3396cd56))
* **iOS:** Add malloc(0) safe path ([be134aa](https://github.com/didi/Hummer/commit/be134aab939eda193196e5cf3f9dbec409adbdea))
* **iOS:** Animation error ([99279e1](https://github.com/didi/Hummer/commit/99279e1e6fd054841029a394b34d3df50e2ca0b1))
* **iOS:** block can use void argument ([08dc9da](https://github.com/didi/Hummer/commit/08dc9daf8dcc4fe2d3ecb6b91fbf1241f8a5d407))
* **iOS:** Scroller/List scroll event error ([23457e3](https://github.com/didi/Hummer/commit/23457e3bb09e2fe911b35806df67cef79fbe99ef))
* 修复List组件在瀑布流模式下滑动过程中自动执行动画后，item间距错乱的问题 ([0d2c860](https://github.com/didi/Hummer/commit/0d2c8603ef1e2500695879c1f91a3a94cfdcb4f3))
* 修复List组件横向布局时的一些bug ([e267238](https://github.com/didi/Hummer/commit/e2672388727e4a1ac651d3c303d1e084177cf54c))
* 修复ViewPager动态改变canLoop属性时出现crash的问题 ([5786173](https://github.com/didi/Hummer/commit/5786173bb116f09a9f3eae1648abb601e4763f42))
* 修复加载本地.9图时无法自动拉伸的问题，改用原生加载方式 ([33e2a18](https://github.com/didi/Hummer/commit/33e2a188da1e49fb7a03a31600eb8789e3f4dc19))
* **iOS:** bounces only change native bounces ([63f5dcf](https://github.com/didi/Hummer/commit/63f5dcf875f214c66e8ec8c43c4c840ff36dbf2a))
* **iOS:** exceptionHandler add namespace ([#108](https://github.com/didi/Hummer/issues/108)) ([f27d1ef](https://github.com/didi/Hummer/commit/f27d1ef1be3ecf595e00dbea74821d3464bdb1af))
* **iOS:** italic render error ([7a454b5](https://github.com/didi/Hummer/commit/7a454b53267962d50a4088123059194ae99989bd))
* update EventTracer ([b0ef6c3](https://github.com/didi/Hummer/commit/b0ef6c35f6ba1e3800c5081410f9236e56177d94))
* 修复退出页面时抛出JS异常时导致原生crash的问题 ([36e5960](https://github.com/didi/Hummer/commit/36e5960e00775ed1b16fb4db90133aeb6c6f73f3))
* 修复默认Storage适配器再初始化配置时的空指针问题 ([0024b22](https://github.com/didi/Hummer/commit/0024b22b8483bd49727c68f9ee1db26e14202a7f))
* 移除com.facebook.yoga:proguard-annotations依赖 ([ff45423](https://github.com/didi/Hummer/commit/ff45423917f2c2225ec890cf41f8fe809d7a76f9))
* **Android:** 修复HotLoad时偶现的StackOverflow问题 ([08aa473](https://github.com/didi/Hummer/commit/08aa4730b9a3a31201fa3212e6ba6fae5386e73c))
* **Android:** 修复ViewPager在触发touch事件时偶现index out of range问题 ([2268512](https://github.com/didi/Hummer/commit/226851289861152b33f71bf6abe2088a3012f5db))
* **Android:** 修复对话框内容是absolute样式的情况下显示异常的问题 ([2e16ce5](https://github.com/didi/Hummer/commit/2e16ce5006523eca720030538ec0c73a2edc779f))
* **Android:** 修复对话框在部分App环境下显示默认黑色背景的问题 ([7275c0c](https://github.com/didi/Hummer/commit/7275c0cae69dfeaede57d936ffb99644a8a850a8))
* **iOS:** Add layerClass ([f11fdad](https://github.com/didi/Hummer/commit/f11fdad7cde26bef4b336bf03384847dec9fbed0))
* **iOS:** List/ViewPager memory error ([9108b6c](https://github.com/didi/Hummer/commit/9108b6cb1ec44161a0438937c5ffe30200b96d58))
* **iOS:** NSArray NSNumber min max NSNotFound error ([570fb6f](https://github.com/didi/Hummer/commit/570fb6f66be7947f91ab76b299feaf55f2c71eb9))
* **iOS:** Remove unused View declare ([597a9c8](https://github.com/didi/Hummer/commit/597a9c8c4c7aa46f3e6782cd2361239faef5098c))
* **iOS:** UICollectionView nest twice and then GIF stop animation ([6b74a5e](https://github.com/didi/Hummer/commit/6b74a5e860795d3f138e8ed67493d0d918cbf012))
* **iOS:** Use contentView instead of LayoutObserver ([#106](https://github.com/didi/Hummer/issues/106)) ([931164f](https://github.com/didi/Hummer/commit/931164fc7308b2eee625594928aad66de7a5bc9b))
* **iOS:** weak value does not need compare self ([df21749](https://github.com/didi/Hummer/commit/df217491120d0499bdaa497c49650c7da5af1fc0))


### Features

* add iOS postException ([e53af00](https://github.com/didi/Hummer/commit/e53af00f2708b5d7d49069ec5ede972d0a689a72))
* **Android:** android release version: 0.3.19 ([6945a06](https://github.com/didi/Hummer/commit/6945a068c5b0bc8c37390b7b11be386717f4edba))
* **Android:** android test version: 0.3.18.1 ([c225bd9](https://github.com/didi/Hummer/commit/c225bd948bd43b97fbf290a93c4cd39255ae46ba))
* **Android:** android test version: 0.3.18.2 ([40679a1](https://github.com/didi/Hummer/commit/40679a14557a2fd09e71d2904bab1d16008812d4))
* **Android:** android test version: 0.3.18.3 ([13cd946](https://github.com/didi/Hummer/commit/13cd946f4facc02e45b76d64ee96c5007b2fd355))
* **Android:** android test version: 0.3.18.4 ([b63c702](https://github.com/didi/Hummer/commit/b63c702d0925b91b716c2fd32aa65ffdd4856ec2))
* **Android:** android test version: 0.3.18.5 ([6014575](https://github.com/didi/Hummer/commit/601457529df7a21257227a3a6de6e0503044e90c))
* **Android:** android test version: 0.3.18.7 ([a0f7e8e](https://github.com/didi/Hummer/commit/a0f7e8e8a3666a9963a1958817e575c6cee1abdb))
* **Android:** Hummer.loadScript 和 Hummer.loadScriptWithUrl 返回值重新定义 ([565d9ac](https://github.com/didi/Hummer/commit/565d9ac477c4d912654d8aa48fafb4c303bffafa))
* **Android:** 使用MavenCentral中发布的hermes-debugger新版本 ([9910eec](https://github.com/didi/Hummer/commit/9910eecd1a4528d567bb74b2105b3e4cf33288ad))
* **Android:** 新增局部视图使用Hummer渲染的示例 ([fb6b2ef](https://github.com/didi/Hummer/commit/fb6b2ef5ccf87ed7e9be0fc810607b1670e6b007))
* **iOS:** Send console to CLI by WebSocket ([#143](https://github.com/didi/Hummer/issues/143)) ([06fae60](https://github.com/didi/Hummer/commit/06fae607c45a4e2a9cec3e6165662f02c1441565))
* Use hm_markDirty instead of setNeedsLayout ([a11daa4](https://github.com/didi/Hummer/commit/a11daa4f510be92e56005c6b6c9cf7ab491c5b41))
* 支持命令行窗口直接显示日志；修改代码自动热更新支持断开重连 ([a7a7d4b](https://github.com/didi/Hummer/commit/a7a7d4b51047ad09cd5351aee2f7d22b416efc68))
* **Android:** 整理示例页面 ([c514ba4](https://github.com/didi/Hummer/commit/c514ba491355d6d88ecb5dcce1bbbac9f002856f))


### Reverts

* Revert "fix(iOS): Use contentView instead of LayoutObserver" (#114) ([2c0f5f7](https://github.com/didi/Hummer/commit/2c0f5f7a19d776885b42af88abb6f6b10ac62c29)), closes [#114](https://github.com/didi/Hummer/issues/114) [#106](https://github.com/didi/Hummer/issues/106)





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
