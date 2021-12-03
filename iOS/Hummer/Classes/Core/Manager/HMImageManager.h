//
//  HMImageManager.h
//  Hummer
//
//  Created by didi on 2020/11/16.
//

#import <Foundation/Foundation.h>
#import "HMImageLoader.h"

NS_ASSUME_NONNULL_BEGIN
/**
 * 多线程模型
 * 1. com.hummer.imagedownload.queue 并发下载队列。最大并发数5
 * 2. com.hummer.imageIO.queue       io串行队列。磁盘io查询
 * 3. 解码工作在 上述1，2，中。不需要单独开启独立线程(便于cancel)
 * 任务去重(取消)
 * combineOperation 代表一次由 UIKit组件 触发的记载任务：具体包括加载和缓存查询，
 * 当同一个 view 触发新的下载任务时，会 cancel 上一次任务(loadOperation + cacheOperation),以确保 callback 的正确性。
 * 目前base64和local 两种loader 均在主线程因此不存在并发问题(时序&线程安全)
 * webloader 中一个 url 代表一个下载任务，同时一个下载任务会对应多个回调任务(DownLoadToken)，当触发 cancel 时，通过 DownLoadToken 移除对应的回调
 *
 *                                                      loadOperation
 * UIKit component -> trigger load -> combineOperation <
 *                                                      cacheOperation
 *
 *                                               downLoadOperation : url <--1--> downloadTask(operation) <--n--> cancelToken
 *                  webLoader    downLoadToken <
 *                                               cancelToken(loaderCallBack)
 * loadOperation    base64Loader
 *                  localLoader
 *
 *                  
 *
 */
@interface HMImageManager : NSObject

+ (instancetype)sharedManager;


- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                                 completion:(HMImageCompletionBlock)completionBlock;


@end

NS_ASSUME_NONNULL_END
