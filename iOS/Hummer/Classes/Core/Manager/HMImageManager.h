//
//  HMImageManager.h
//  Hummer
//
//  Created by didi on 2020/11/16.
//

#import <Foundation/Foundation.h>
#import "HMImageLoader.h"
#import "HMImageDecoder.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMImageManager : NSObject

+ (instancetype)sharedManager;

- (void)registerLoader:(id<HMImageLoader>)loader;
- (void)resignLoader:(id<HMImageLoader>)loader;

- (void)registerDecoder:(id<HMImageDecoder>)decoder;
- (void)resignDecoder:(id<HMImageDecoder>)decoder;


- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                                 completion:(HMImageCompletionBlock)completionBlock;
@end

NS_ASSUME_NONNULL_END
