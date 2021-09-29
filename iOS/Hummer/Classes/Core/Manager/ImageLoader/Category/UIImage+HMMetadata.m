//
//  UIImage+HMMetadata.m
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import "UIImage+HMMetadata.h"
#import <objc/runtime.h>
#import "NSData+Hummer.h"

@implementation UIImage (HMMetadata)
- (HMImageFormat)hm_imageFormat {
    HMImageFormat imageFormat = HMImageFormatUndefined;
    NSNumber *value = objc_getAssociatedObject(self, @selector(hm_imageFormat));
    if ([value isKindOfClass:[NSNumber class]]) {
        imageFormat = value.integerValue;
        return imageFormat;
    }
    // Check CGImage's UTType, may return nil for non-Image/IO based image
    if (@available(iOS 9.0, tvOS 9.0, macOS 10.11, watchOS 2.0, *)) {
        CFStringRef uttype = CGImageGetUTType(self.CGImage);
        imageFormat = [NSData hm_imageFormatFromUTType:uttype];
    }
    return imageFormat;
}

- (void)setHm_imageFormat:(HMImageFormat)hm_imageFormat {
    objc_setAssociatedObject(self, @selector(hm_imageFormat), @(hm_imageFormat), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}


- (BOOL)hm_isAnimated {
    return (self.images != nil);
}


- (NSUInteger)hm_imageLoopCount {
    NSUInteger imageLoopCount = 0;
    NSNumber *value = objc_getAssociatedObject(self, @selector(hm_imageLoopCount));
    if ([value isKindOfClass:[NSNumber class]]) {
        imageLoopCount = value.unsignedIntegerValue;
    }
    return imageLoopCount;
}

- (void)setHm_imageLoopCount:(NSUInteger)hm_imageLoopCount {
    NSNumber *value = @(hm_imageLoopCount);
    objc_setAssociatedObject(self, @selector(hm_imageLoopCount), value, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
@end
