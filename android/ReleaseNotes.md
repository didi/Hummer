# Release Nodes

### 0.3.23
- 修复TextArea组件在达到最大行数时输入回车，重复触发input事件的问题；
- 修复quickjs引擎在debug模式下出现stackoverflow的问题；
- 修复List组件加载更多滑到没有数据之后，无法再重置为可加载更多的状态的问题；
- 修复View.insertBefore和View.replaceChild处理子元素超出父视图的问题；
- 修复Request组件返回值两端不一致的问题；
- Image组件支持图片加载回调；
- Storage组件支持namespace隔离，并增加removeAll方法；
- Location组件定位坐标系转换（WGS-84 -> GCJ-02）；
- 支持MavenCentral发布；
- 整理核心链路埋点事件；

### 0.3.22
- 补齐transform对rotateZ的支持；
- Memory组件支持clearAll接口；
- 支持边框盒的盒模型；
- 修复cli日志无法打印生命周期销毁的日志的问题；

### 0.3.21.5
- 升级QuickJS至最新版2021-03-27，并且优化JS和Native异常堆栈输出信息；
- 修复首次进入页面时，轮播组件的回调会回调两次的问题；
- 修复Scroller直接不支持justifyContent、alignItems、padding等flex属性的问题；
- 修复富文本不支持自定义字体的问题；
- 支持字体文件配置自定义Assets目录；
- Image组件支持占位图和失败图，新增Image.load接口；
- 修复Image组件不设置resize，或者resize设置为'origin'时，图片大小不是原图大小的问题；
- 修复Button组件不设置press属性，只设置disable属性时，按压状态会变成disable样式的问题；
- 修复Android 9.0以下系统阴影外边缘可能被裁剪的问题；
- 修复获取Input的focused状态不准的问题；
- Switch组件的state改成0和1，和iOS对齐；
- 优化DevTools的显示，修复按钮拖动时位置跳变的问题；
- 修复Timer的setInterval在一次callback回调中多次调用clearInterval时出现的crash问题；

### 0.3.20
- 修复evaluateJavaScript中scriptId传null时出现空指针异常；
- 修复WebSocket组件子线程访问JS的问题；
- 触摸事件支持返回屏幕相对坐标；
- 支持RTL布局；
- 在调式模式下，对CML链接的WS端口号做特殊处理；

### 0.3.19
- 修复Loading对话框和自定义对话框在某些机型上没有去除默认背景的问题；
- 修复HotLoad时偶现的StackOverflow问题；
- 修复ViewPager在触发touch事件时偶现index out of range问题；
- 修复ViewPager动态改变canLoop属性时出现crash的问题；
- 修复退出页面时抛出JS异常时导致原生crash的问题；
- 修复横向List组件item宽度撑满全屏的问题；
- 修复List组件在瀑布流模式下滑动过程中自动执行动画后，item间距错乱的问题；
- 修复默认Storage适配器再初始化配置时的空指针问题；
- 修复加载本地.9图时无法自动拉伸的问题，改用原生加载方式；
- 支持命令行窗口直接显示日志，代码热更新支持断开重连；
- 升级Hermes调试引擎；

### 0.3.18
- 去除对 blankj.utilcode 库的依赖，减小包体积，减少sdk接入时的冲突；
- 重构手势事件逻辑，并把单击和长按改成了标准系统事件；
- 在 DevTools 的页面参数中增加 Hummer SDK Version 的显示；
- 在 Hummer.env 中增加 namespace 字段；
- 修复NotifyCenter遍历过程中删除导致的异常问题；
- 修复Image组件在没有设置宽高的情况下设置远程图片无法自撑开的问题；
- 修复Scroller组件的子控件无法设置百分比和flexGrow等属性的问题；
- 修复List组件加载更多时触发重复调用onCreateViewHolder的问题；
- 修复removeChild控件做内存自动回收时，没有回收控件的子控件的内存的问题；
- 调整List初始化方式，适应多次设置List样式的问题；
- 支持 Hummer.loadScript 和 Hummer.loadScriptWithUrl；
- 修改动画组件的repeatCount属性定义，和iOS对齐；
- 增加对arm64架构的支持；

### 0.3.16
- glide 版本升级到 4.9.0
- 支持CSS样式动画；
- 支持无障碍相关属性；
- 处理Gson解析时部分字段类型不匹配的问题；
- Scroller和List组件支持bounces属性（默认有回弹效果），和iOS保持一致；

### 0.3.15
- 支持块级内存自动回收；
- 增加默认HummerFragment容器；
- Scroller组件支持了下拉刷新和加载更多功能；
- 新增Hermes引擎版调试工具；
- 增强【开发工具】按钮和内部功能；
- debug模式下支持代码热更新（需配合最新版CLI工具）；
- 其他众多问题修复；

### 0.2.42
- 支持CSS样式动画；
- 支持无障碍相关属性；
- 处理Gson解析时部分字段类型不匹配的问题；
- Scroller和List组件支持bounces属性（默认有回弹效果），和iOS保持一致；

### 0.2.41
- 重新修复键盘type和returnType重复设置无效的问题，并修复了设置type为'default'时Input不可聚焦的问题；
- 修复Scroller组件和Image组件无障碍模式下焦点获取相关的问题；

### 0.2.40
- 修复输入框键盘type和returnType重复设置无效的问题；
- 修复Scroller组件和List组件子视图阴影被裁切的问题；
- 去除Scroller组件和List组件滚动到边缘时的默认半月阴影；

### 0.2.39
- 修复容器组件设置overflow:'hidden'之后还是无法裁剪子视图的问题；
- 解决Scroller组件内存泄露问题；
- 解决Scroller组件state错误问题；
- 修复List组件第一次加载时scroll事件被异常触发的问题；
- 【开发工具】优化调整性能统计方式的输出展示；

### 0.2.38
- 适配Android10，targetSdkVersion和compileSdkVersion升级到29，Input组件光标适配Android10的用法；
- 基础控件新增getViewRect接口；
- 支持width和height动画；
- 去除入容器设置圆角裁剪子元素的逻辑，和iOS保持对齐；
- Image组件支持单边圆角（只是简单处理了下圆角的情况）；
- 修复Scroller组件的scroll事件的state不准确的问题；
- 【统一单位】所有事件相关的回调中，单位都统一成dp；所有scrollTo和scrollBy单位都支持3种单位；

### 0.2.37
- 优化错误异常的堆栈信息，增加bridge的类名和方法名；
- 修复NotifyCenter从JS发送消息给Native时无法解析的问题；
- 修复Navigator.popToPage无法退回到指定页面的问题；
- 修复Timer组件在闭包中调用clearInterval失效的问题；
- 修复部分动画初始值写死的问题；
- 修复Request组件不支持form格式请求的问题；

### 0.2.36
- 使用Handler重写Timer，修复华为系统线程池过多导致的OOM问题；
- 修复9.0以下系统绘制阴影时可能引起的OOM问题；
- 修复NotifyCenter不能发送数组类型参数的问题；
- 升级soloader到0.9.0版本，修复yoga库在某些机型上加载失败的问题；

### 0.2.35
- 增加单击事件和长按事件的埋点；
- 修复平移动画不支持hm单位的问题；
- JS异常加上JS文件来源；
- 重新修复List组件快速滑动加载更多时导致的crash问题；
- 增加资源混淆白名单文件，配合乘客端打包；

### 0.2.34
- Hummer.isSupport接口增加Context参数；
- 去除RecyclerView默认动画，修复List组件快速滑动加载更多时导致的crash问题；

### 0.2.33
- 修复List组件加载更多时最后一个item会先消失一下再出现的问题；
- 修复Request网络库组件header不生效的问题；
- 修复Input组件进入页面前提前设置focused时不生效的问题；
- Memory组件增加namespace；
- load so 改用 relinker，修复部分机型加载库失败的问题；

### 0.2.31
- 修复List组件中的Input组件移出List可见范围后，组件会自动失焦但是键盘没有自动收起的问题；
- 修复部分空指针问题；

### 0.2.30
- 修复Input组件失焦时事件来两次的问题；
- Input组件新增键盘"完成"按钮的点击事件；
- 修复Scroller组件中的子组件改变高度后，Scroller组件高度不会自适应的问题；
- 修复到渐变色切换到普通颜色不起作用的问题；
- 修复热重载异常逻辑（只在debug版本下才能使用）；
- 加回信任所有证书的逻辑，仅去除信任所有hostname的逻辑；
- 修复quickjs异常错误信息不全的问题；
- 更新混淆规则，修复因为 keep class * 导致所有类名都没有被混淆的问题；

### 0.2.29
- 修复路由跳转时，同时调用popPage和openPage时的bug，在openPage新增closeSelf字段；
- Text组件增加lineSpacingMulti属性；
- 修复页面退出时可能引起的List组件崩溃问题；
- 修复Text组件fontWeight:normal无效的问题；

### 0.2.26
- 修复自定义Dialog部分机型上背景显示黑色问题；
- 自定义Dialog支持View复用；
- 支持点击键盘以外的区域把键盘关闭掉；
- 修复List组件item没有全屏撑开的问题；
- 修复控件在display隐藏再显示之后，边框消失的问题；
- Navigator增加popBack接口，适配cml；
- Navigator的popPage改成关闭自身，而不是依赖页面堆栈；
- 增加基础控件的recycle方法，用于手动释放控件java内存；
- Text组件的fontFamily属性支持多个字体输入；
- Text组件支持字间距；
- 优化setStyle性能问题；
- 更新namespace逻辑，为了支持多业务线；
- yoga库load增加异常捕获；
- 给Hummer默认容器设置一个兜底的初始化，以防业务方没有及时做初始化；

### 0.2.23
- 加入Hummer"命名空间"概念，用于隔离所有适配器的作用范围，为多业务线接入做准备；
- 修改jsc版本的编译选项，对c++_shared库的依赖改成NDK动态库的形式，不再显式引入c++_shared库，避免两个引擎库冲突问题；
- 修复控件只设置backgroundColor不生效的问题；
- 修复Android9.0以下时控件大小改变时阴影绘制crash问题；
- 修复Input文字输入过程中控件长度无法撑开的问题；
- 修复Input组件键盘显示和隐藏问题；
- 去掉Input组件的默认下划线样式，改成和iOS样式一致；
- 修复页面路由时全局UIHandler清除导致页面打不开的问题；
- 图片组件borderRadius支持百分比；
- 新增物理返回键生命周期回调方法；
- 修复自定义Dialog不居中显示的问题；
- 修复系统Dialog按钮颜色问题；
- 修复退出页面后JSCallback无效时的空指针问题；
- 去除SSL信任任何证书的代码，规避安全风险；
- 修复style map排序导致的position和display变为null的bug；
- 修复NotifyCenter消息发送纯字符串或者不填参数时的crash问题；
- 修复NotifyCenter消息未注册时发送消息Crash问题；
- console.log 支持前端的Object类型参数和多参数情况；
- 新增hummer-dev-tools开发工具；
- 修复Storage组件传json对象的String时，保存不了的问题；
- 修复finish时抛出null的异常时quickjs崩溃问题；
- 修复部分QuickJS错误堆栈信息输出不全的问题；

### 0.2.21
- 修复JSC JNI中之前异常参数漏加的问题
- 把quickjs依赖的c++静态库改成了动态库，修复集成到乘客端平台打包不过的问题

### 0.2.19
- 修复RootView设置为position: 'absolute' 布局大小为0的问题
- 修复Android9.0以下重复刷新阴影时阴影叠加的问题
- 修复pan事件的移动方向问题，和ios统一
- 修复没有定位时没有返回任何信息的问题
- 修复debug打印导致的crash问题
- Exception支持JSContext级别的回调监听

### 0.2.18
- 支持diaplay的block、inline、inline-block属性
- 支持position的fixed属性
- Text组件支持富文本属性
- 修复控件阴影显示问题
- 增加自定义对话框和Toast能力
- Scroll组件增加属性和修复bug
- Image组件支持相对路径图片源
- Image组件支持Gif图展示
- Navigator组件增加相对路径跳转
- 增加Touch事件
- 修复RootView的onDestroy生命周期没有被触发的问题
- 升级soloader到0.8.2版本
- 修复Hummer中的Yoga版本过高无法和RN兼容的问题