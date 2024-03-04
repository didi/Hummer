### npm run bootstrap
### npm run dev / npm run build



##鸿蒙对接须知




##Tenon 对接须知

1、Tenon 接口挂载点：__Hummer__.proxy(在这个对象上挂载一个名称为“globalProxy”,类型为“HummerGlobalProxy”) 的代理作为接口。
> 示例： __Hummer__.proxy.globalProxy = new HummerGlobalProxy();

接口详细内容见文件：HummerGlobalProxy.ts

2、已支持的组件：View 、Text、Image 可导入组件后直接使用构造方法创建
> 示例：var view = new View() 

3、需要处理的内容：样式设置，class变更时样式设置，事件，动画（鸿蒙上暂时还不支持动画）
