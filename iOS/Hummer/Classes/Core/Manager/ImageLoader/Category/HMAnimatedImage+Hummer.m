//
//  HMAnimatedImage+Hummer.m
//  Hummer
//
//  Created by didi on 2020/12/3.
//

#import "HMAnimatedImage+Hummer.h"
#import <objc/runtime.h>
@implementation HMAnimatedImage (Hummer)

- (NSTimeInterval)hm_animatedDuration {
    
    NSNumber *_duration = objc_getAssociatedObject(self, _cmd);
    if (!_duration) {
        NSInteger count = [self animatedImageFrameCount];
        double duration = 0;
        for (int i = 0; i<count; i++) {
            double frameDuration = [self animatedImageDurationAtIndex:i];
            duration += frameDuration;
        }
        _duration = [NSNumber numberWithDouble:duration];
        objc_setAssociatedObject(self, _cmd, _duration, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return [_duration doubleValue];
}

- (NSArray<UIImage *> *)hm_animatedImages {
     
    NSArray *images = objc_getAssociatedObject(self, _cmd);
    if (!images) {
        
        NSInteger count = [self animatedImageFrameCount];
        NSMutableArray *_images = [[NSMutableArray alloc] init];
        for (int i = 0; i<count; i++) {
            UIImage *image = [self animatedImageFrameAtIndex:i];
            if (image) {
                [_images addObject:image];
            }
        }
        images = [_images copy];
        objc_setAssociatedObject(self, _cmd, images, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return images;
}
@end
