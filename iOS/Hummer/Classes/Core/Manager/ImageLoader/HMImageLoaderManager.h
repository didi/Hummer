//
//  HMImageLoaderManager.h
//  Hummer
//
//  Created by didi on 2021/9/2.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMImageLoader.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMImageLoaderManager : NSObject

+ (HMImageLoaderManager *)sharedManager;
- (void)registerLoader:(id<HMImageLoader>)loader;
- (void)resignLoader:(id<HMImageLoader>)loader;

- (nullable id<HMImageLoaderOperation>)load:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource context:(nullable HMImageLoaderContext *)context completion:(nonnull HMImageCompletionBlock)completionBlock;

- (id<HMImageLoader>)webLoader;

- (id<HMImageLoader>)localLoader;

@end

NS_ASSUME_NONNULL_END
