## gpu_transform

该module通过获取图片的buffer数据，使用openGL、着色器（Shader），操作GPU，达到图片滤波器的效果。

本项目基于开源库 [android-gpuimage](https://github.com/cats-oss/android-gpuimage) 进行OpenHarmony的自研版本：

## 下载安装
```
    ohpm install @ohos/gpu_transform
```

## 例子说明
```
    //获取像素点数据
    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    
    // 使用GPUImageVignetterFilter过滤器
    let filter = new GPUImageVignetterFilter();
    filter.setImageData(bufferData, targetWidth, targetHeight);
    filter.setVignetteCenter(this.centerPoint);
    filter.setVignetteColor(this.vignetteColor);
    filter.setVignetteStart(this.vignetteSpace[0]);
    filter.setVignetteEnd(this.vignetteSpace[1]);
    
    //获取经过gpu处理的像素点数据
    let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight)
    
    //像素点数据写入
    bitmap.writeBufferToPixels(buf);
    
```

## 滤波器类型说明
| 滤波器类型                     | 描述                          |
| ---------------------------- | ---------------------------|
| GPUImageBlurFilter           |    模糊滤波器     |
| GPUImageBrightnessFilter     |    亮度滤波器             | 
| GPUImageColorInvertFilter    |    颜色反转滤波器           | 
| GPUImageContrastFilter       |    对比度滤波器             | 
| GPUImageGrayscaleFilter      |    灰色滤波器            |
| GPUImageKuwaharaFilter       |    桑原滤波器             |
| GPUImagePixelationFilter     |    马赛克滤波器          |
| GPUImageSepiaToneFilter      |    乌墨色滤波器               |
| GPUImageSketchFilter         |    素描滤波器          |
| GPUImageSwirlFilter          |    扭曲滤波器                 |
| GPUImageToonFilter           |    动画滤波器              |
| GPUImageVignetterFilter      |    装饰滤波器                |


## 目录结构
```
/gpu_transform/src/main
    --cpp
        --common         # napi公共方法封装
        --constant       # 顶点、片元着色器
        --napi           # native入口
        --render         # 绘制
        --util           # 工具层
    --ets
        --filter         # 各种滤波器
        --gl             # native的js层
        --interface      # 接口
```


## 约束与限制

在下述版本验证通过：

- DevEco Studio: (4.1.3.414), SDK: API11 (4.1.0.56)

## 贡献代码

使用过程中发现任何问题都可以提 [issue](https://gitee.com/openharmony-tpc/ImageKnife/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/ImageKnife/issues) 。

## 开源协议

本项目基于 [Apache License 2.0](https://gitee.com/openharmony-tpc/ImageKnife/blob/master/LICENSE) ，请自由的享受和参与开源。


