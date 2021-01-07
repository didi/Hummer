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
#import "JSValue+Hummer.h"
#import "CAAnimation+Exp.h"
#import <objc/runtime.h>
#import "HMAnimationManager.h"
#import "HMBasicAnimation.h"
#import "UIView+HMRenderObject.h"
#import "HMRenderObject.h"
#import "UIView+HMDom.h"

@implementation UIView (HMAnimation)

HM_EXPORT_METHOD(addAnimation, hm_addAnimation:forKey:)
HM_EXPORT_METHOD(removeAnimationForKey, hm_removeAnimationForKey:)
HM_EXPORT_METHOD(removeAllAnimation, hm_removeAllAnimation)

- (void)hm_addAnimation:(JSValue *)animation forKey:(JSValue *)keyPath {
    id anim = animation.hm_toObjCObject;
    NSString *key = keyPath.toString;
    if (!anim) {
        return;
    }
    if ([anim isKindOfClass:HMBasicAnimation.class]) {
        ((HMBasicAnimation *)anim).animatedView = self;
        [HMAnimationManager addAnimation:anim];
        
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

- (void)hm_removeAnimationForKey:(JSValue *)keyPath {
    NSString *key = keyPath.toString;
    if (key) {
        [self.layer removeAnimationForKey:key];
    }
}

- (void)hm_removeAllAnimation {
    
    [self.layer removeAllAnimations];
}


- (void)setAnimatorMap:(NSMutableDictionary *)animatorMap{
    objc_setAssociatedObject(self, @selector(animatorMap), animatorMap, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSMutableDictionary *)animatorMap{
    
    if (!objc_getAssociatedObject(self, _cmd)) {
        
        self.animatorMap = [NSMutableDictionary new];
    }
    return objc_getAssociatedObject(self, _cmd);
}

@end
