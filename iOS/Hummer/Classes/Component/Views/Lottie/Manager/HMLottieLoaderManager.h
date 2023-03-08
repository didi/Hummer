//
//  HMLottieLoaderManager.h
//  Hummer
//
//  Created by didi on 2022/12/27.
//

#import <Foundation/Foundation.h>
#import "HMImageLoaderDefine.h"
#import "HMURLConvertible.h"
#import "HMImageLoaderOperation.h"

NS_ASSUME_NONNULL_BEGIN

typedef void(^HMLottieCompletionBlock)(NSString *_Nullable filePath, HMImageCacheType cacheType, NSError * _Nullable error);

@interface HMLottieLoaderManager : NSObject
+ (nullable id<HMImageLoaderOperation>)load:(nonnull id<HMURLConvertible>)source
                           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                                 completion:(nonnull HMLottieCompletionBlock)completionBlock;

@end

NS_ASSUME_NONNULL_END
