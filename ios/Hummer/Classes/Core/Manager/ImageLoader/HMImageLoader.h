//
//  HMImageLoaderInterface.h
//  Hummer
//
//  Created by didi on 2020/11/17.
//

#import <Foundation/Foundation.h>
#import "HMURLConvertible.h"
#import "NSString+Hummer.h"
#import "NSURL+Hummer.h"
#import "HMImageLoaderDefine.h"
#import "HMImageLoaderOperation.h"

NS_ASSUME_NONNULL_BEGIN

@protocol HMImageLoader <NSObject>

- (BOOL)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource;
- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context                                    
                                 completion:(HMImageLoaderCompletionBlock)completionBlock;


@optional
/*麦田相对路径冲突*/
- (id<HMURLConvertible>)cacheKeyForSource:(id<HMURLConvertible>)source
                         inJSBundleSource:(id<HMURLConvertible>)bundleSource;
@end

NS_ASSUME_NONNULL_END
