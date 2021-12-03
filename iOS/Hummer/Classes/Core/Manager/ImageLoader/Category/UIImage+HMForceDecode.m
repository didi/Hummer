//
//  UIImage+HMForceDecode.m
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import "UIImage+HMForceDecode.h"
#import "HMImageCoderHelper.h"
#import <objc/runtime.h>

@implementation UIImage (HMForceDecode)
- (BOOL)hm_isDecoded {
    NSNumber *value = objc_getAssociatedObject(self, @selector(hm_isDecoded));
    return value.boolValue;
}

- (void)setHm_isDecoded:(BOOL)hm_isDecoded {
    objc_setAssociatedObject(self, @selector(hm_isDecoded), @(hm_isDecoded), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

+ (nullable UIImage *)hm_decodedImageWithImage:(nullable UIImage *)image {
    if (!image) {
        return nil;
    }
    return [HMImageCoderHelper decodedImageWithImage:image];
}

+ (nullable UIImage *)hm_decodedAndScaledDownImageWithImage:(nullable UIImage *)image {
    return [self hm_decodedAndScaledDownImageWithImage:image limitBytes:0];
}

+ (nullable UIImage *)hm_decodedAndScaledDownImageWithImage:(nullable UIImage *)image limitBytes:(NSUInteger)bytes {
    if (!image) {
        return nil;
    }
    return [HMImageCoderHelper decodedAndScaledDownImageWithImage:image limitBytes:bytes];
}

@end
