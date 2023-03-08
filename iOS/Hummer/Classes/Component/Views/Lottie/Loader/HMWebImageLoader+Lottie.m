//
//  HMWebImageLoader+Lottie.m
//  Hummer
//
//  Created by didi on 2022/12/28.
//

#import "HMWebImageLoader+Lottie.h"


@implementation HMWebImageLoader (Lottie)

- (id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource context:(HMImageLoaderContext *)context dataCompletion:(HMDataLoaderCompletionBlock)completionBlock {
    
    return [self load:source inJSBundleSource:bundleSource context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error) {
        completionBlock(data, nil, error);
    }];
}
@end
