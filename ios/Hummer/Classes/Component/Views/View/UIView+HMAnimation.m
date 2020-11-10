//
//  UIView+HMAnimation.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMAnimation.h"
#import "HMExportManager.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import <QuartzCore/QuartzCore.h>
#import "CAAnimation+Exp.h"
#import "HMBaseValue.h"

@implementation UIView (HMAnimation)

HM_EXPORT_METHOD(addAnimation, hm_addAnimation:forKey:)
HM_EXPORT_METHOD(removeAnimationForKey, hm_removeAnimationForKey:)
HM_EXPORT_METHOD(removeAllAnimation, hm_removeAllAnimation)

- (void)hm_addAnimation:(HMBaseValue *)animation forKey:(HMBaseValue *)keyPath {
    CAAnimation *anim = (CAAnimation *) [animation toNativeObject];
    NSString *key = keyPath.toString;
    if (!anim) {
        return;
    }
    __weak typeof(self) wself = self;
    anim.onEnding = ^(CAAnimation *anim, BOOL flag) {
        if (!wself) {
            return;
        }
        [wself.layer removeAnimationForKey:key];
        
        // @todo
        // If `flag` is false, the layer maybe not moved to target position,
        // then this line will case undefined behavior.
        //
        wself.frame = wself.layer.presentationLayer.frame;
    };
    if ([self.layer.animationKeys containsObject:key]) {
        [self.layer removeAnimationForKey:key];
    }
    [self.layer addAnimation:anim forKey:key];
}

- (void)hm_removeAnimationForKey:(HMBaseValue *)keyPath {
    NSString *key = keyPath.toString;
    if (key) {
        [self.layer removeAnimationForKey:key];
    }
}

- (void)hm_removeAllAnimation {
    [self.layer removeAllAnimations];
}

@end
