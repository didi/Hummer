//
//  UIView+HMAnimation.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMAnimation.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import <QuartzCore/QuartzCore.h>
#import "CAAnimation+Exp.h"
#import <objc/runtime.h>
#import "HMAnimationManager.h"
#import "UIView+HMRenderObject.h"
#import "HMRenderObject.h"
#import "UIView+HMDom.h"

@implementation UIView (HMAnimation)

HM_EXPORT_METHOD(addAnimation, hm_addAnimation:forKey:)
HM_EXPORT_METHOD(removeAnimationForKey, hm_removeAnimationForKey:)
HM_EXPORT_METHOD(removeAllAnimation, hm_removeAllAnimation)

- (void)hm_addAnimation:(HMBaseValue *)animation forKey:(HMBaseValue *)keyPath {
    NSObject *anim = animation.hm_toObjCObject;
    NSString *key = keyPath.toString;
    if (!anim) {
        return;
    }
    if ([anim  conformsToProtocol:@protocol(HMAnimator)]) {
        
        [HMAnimationManager addAnimation:anim forView:self key:key];
    }else{
        // 临时补丁，关键帧动画需要每次重置到最初的位置
        HMRenderObject *shadowView = self.hm_renderObject;
        HMLayoutMetrics layoutMetrics = shadowView.layoutMetrics;
        CGRect frame = layoutMetrics.frame;
        [self hummerSetFrame:frame];
        
        CAAnimation *_anim = anim;
        __weak typeof(self) wself = self;
        _anim.onEnding = ^(CAAnimation *anim, BOOL flag) {
            if (!wself) {
                return;
            }
            
            if (flag) {
                wself.frame = wself.layer.presentationLayer.frame;
                [wself.layer removeAnimationForKey:key];
            }
        };
        if ([self.layer.animationKeys containsObject:key]) {
            [self.layer removeAnimationForKey:key];
        }
        [self.layer addAnimation:_anim forKey:key];
    }
}

- (void)hm_removeAnimationForKey:(HMBaseValue *)keyPath {
    NSString *key = keyPath.toString;
    [HMAnimationManager removeAnimationForView:self key:key];
    if (key) {
        [self.layer removeAnimationForKey:key];
    }
}

- (void)hm_removeAllAnimation {
    
    [self.layer removeAllAnimations];
}


#pragma mark <property>

- (void)setHm_transform:(HMTransform *)hm_transform {
    objc_setAssociatedObject(self, @selector(hm_transform), hm_transform, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
- (HMTransform *)hm_transform {
    
    if (!objc_getAssociatedObject(self, _cmd)) {
        self.hm_transform = [HMTransform new];
    }
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_animationPropertyBounds:(CGRect)hm_animationPropertyBounds {
    objc_setAssociatedObject(self, @selector(hm_animationPropertyBounds), [NSValue valueWithCGRect:hm_animationPropertyBounds], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}


- (CGRect)hm_animationPropertyBounds {
    return [objc_getAssociatedObject(self, _cmd) CGRectValue];
}

- (void)setHm_animationPropertyCenter:(CGPoint)hm_animationPropertyCenter {
    objc_setAssociatedObject(self, @selector(hm_animationPropertyCenter), [NSValue valueWithCGPoint:hm_animationPropertyCenter], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CGPoint)hm_animationPropertyCenter {
    return [objc_getAssociatedObject(self, _cmd) CGPointValue];
}

- (void)setHm_animationMap:(NSMutableDictionary *)hm_animationMap {
    objc_setAssociatedObject(self, @selector(hm_animationMap), hm_animationMap, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSMutableDictionary *)hm_animationMap {
    if (!objc_getAssociatedObject(self, _cmd)) {
        self.hm_animationMap = [NSMutableDictionary new];
    }
    return objc_getAssociatedObject(self, _cmd);
}
@end
