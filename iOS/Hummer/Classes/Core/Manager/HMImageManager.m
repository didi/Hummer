//
//  HMImageManager.m
//  Hummer
//
//  Created by didi on 2020/11/16.
//

#import "HMImageManager.h"
#import "HMImageLoader.h"
#import "HMImageLoaderManager.h"


@interface HMImageManager()

@end

@implementation HMImageManager

+ (instancetype)sharedManager {
    
    static HMImageManager *_manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _manager = [HMImageManager new];
    });
    return _manager;
}


/**
 * callback <--1--> loadOperation
 * loadUrl(cancel operation)
 *
 **/

- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                                 completion:(HMImageCompletionBlock)completionBlock{
    
    
    return [[HMImageLoaderManager sharedManager] load:source inJSBundleSource:bundleSource context:context completion:completionBlock];
}

@end
