//
//  HMImageDownloadOperation.h
//  Hummer
//
//  Created by didi on 2020/11/24.
//

#import <Foundation/Foundation.h>
#import "HMImageLoaderDefine.h"

NS_ASSUME_NONNULL_BEGIN
typedef HMImageLoaderCompletionBlock HMImageDownloaderCompletedBlock;
typedef NSMutableDictionary HMImageDownloadCallBackPair;

/**
 * 主线程添加的 completedBlock ，能够正确被触发：
 * 1. 任务未完成，等待任务完成触发
 * 2. 任务已完成，直接触发。
 * 
 * 线程交互
 * mainQueue    ｜   downloadOperation   ｜   globalQueue(decode)
 *
 */

@interface HMImageDownloadOperation : NSOperation<NSURLSessionDataDelegate, NSURLSessionDelegate>

@property (strong, nonatomic, readonly, nullable) NSURLSessionTask *dataTask;

- (instancetype)initWithRequest:(nullable NSURLRequest *)request
                              inSession:(nullable NSURLSession *)session
                                context:(nullable HMImageLoaderContext *)context;

// 主线程调用
- (nonnull id)addHandlersForCompleted:(nullable HMImageDownloaderCompletedBlock)completedBlock;

- (BOOL)cancel:(nonnull id)token;
@end
NS_ASSUME_NONNULL_END
