//
//  HMBase64ImageLoader.m
//  Hummer
//
//  Created by didi on 2020/11/17.
//

#import "HMBase64ImageLoader.h"
#import "HMUtility.h"

static NSString *const BASE64HEADERPREFIX = @"data:";

@implementation HMBase64ImageLoader

- (BOOL)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource{

    NSString *imageUrlString = [source hm_asString];
    if (imageUrlString) {
        NSRange prefixRange = [imageUrlString rangeOfString:BASE64HEADERPREFIX];
        BOOL isBase64 = prefixRange.location != NSNotFound;
        return isBase64;
    }
    return NO;
}


- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource
                                                   context:(nullable HMImageLoaderContext *)context
                                                completion:(nonnull HMImageLoaderCompletionBlock)completionBlock{
    HMImageLoaderOperation *operation = [HMImageLoaderOperation new];
    NSString *imageUrlString = [source hm_asString];
    if (!imageUrlString) {return nil;}
    NSRange commaRange = [imageUrlString rangeOfString:@","];
    if (commaRange.location != NSNotFound) {
        imageUrlString = [imageUrlString substringFromIndex:commaRange.location + 1];
    }
    NSData *imageData = [[NSData alloc] initWithBase64EncodedString:imageUrlString options:0];
    completionBlock(imageData, NO, HMImageCacheTypeDisk, nil);
    return operation;
}


@end
