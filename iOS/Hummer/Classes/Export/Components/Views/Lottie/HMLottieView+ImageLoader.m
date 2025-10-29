//
//  HMLottieView+ImageLoader.m
//  Hummer
//
//  Created by didi on 2022/12/22.
//

#import "HMLottieView+ImageLoader.h"
#import "HMLottieLoaderManager.h"

/**
 * 为保持原有解码器入参清晰 data<-->image。lottie 复用 设计：
 * 1. 完全服用 webloader，callback，并不做自动解码
 * 2. 复用 imageCache 缓存下载原始文件：json/zip, zip 调用 lottie 解码器 解压缩，存入sandbox/tmp
 * 3. localLoader 改造 返回
 *
 * 缓存模式：lottie 内存缓存 + 磁盘，解码之后文件和lottie lru缓存，重启后失效。
*/
typedef void(^HMInternalUnzipBlock)(NSString *filePath);
@implementation HMLottieView (ImageLoader)

- (id<HMImageLoaderOperation>)hm_setLottieWithSrc:(id<HMURLConvertible>)source
                                 inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                          context:(nullable HMImageLoaderContext *)context
                                       completion:(nullable HMLottieCompletionBlock)completionBlock {
    
    return [HMLottieLoaderManager load:source inJSBundleSource:bundleSource context:context completion:completionBlock];
}
@end
