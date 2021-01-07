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

@interface HMImageDownloadOperation : NSOperation<NSURLSessionDataDelegate, NSURLSessionDelegate>

@property (strong, nonatomic, readonly, nullable) NSURLSessionTask *dataTask;

- (instancetype)initWithRequest:(nullable NSURLRequest *)request
                              inSession:(nullable NSURLSession *)session;

- (nonnull id)addHandlersForCompleted:(nullable HMImageDownloaderCompletedBlock)completedBlock;

- (BOOL)cancel:(nonnull id)token;
@end
NS_ASSUME_NONNULL_END
