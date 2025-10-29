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
#import "NSObject+Hummer.h"
#import "HMUtility.h"

@interface HMAnimationValueHandle : NSObject

@property (nonatomic, strong, nullable) HMBaseValue *jsValue;
@property (nonatomic, strong) id<HMAnimator> animator;
@property (nonatomic, copy) NSString *key;

@end

@implementation HMAnimationValueHandle

- (instancetype)initWithAnimator:(id<HMAnimator>)animator jsValue:(HMBaseValue *)value key:(NSString *)key {
    
    self = [super init];
    if(self){
        _jsValue = value;
        _animator = animator;
        _key = key;
    }
    return self;
}
@end

@implementation UIView (HMAnimation)

HM_EXPORT_METHOD(addAnimation, hm_addAnimationValue:forKeyValue:)
HM_EXPORT_METHOD(removeAnimationForKey, hm_removeAnimationForKeyJSValue:)
HM_EXPORT_METHOD(removeAllAnimation, hm_removeAllAnimation)
//HM_EXPORT_METHOD(pauseAnimation, hm_pauseAnimation)//无法对齐接口，暂不暴露
//HM_EXPORT_METHOD(resumeAnimation, hm_resumeAnimation)//无法对齐接口，暂不暴露

- (void)hm_pauseAnimation {
    CFTimeInterval curTime = CACurrentMediaTime();
    CFTimeInterval pausedTime = [self.layer convertTime:curTime fromLayer:nil];
    self.layer.speed = 0.0;
    self.layer.timeOffset = pausedTime;
    NSArray <HMAnimationValueHandle *> *allValues = self.hm_animationMap.allValues;
    [allValues enumerateObjectsUsingBlock:^(HMAnimationValueHandle *handle, NSUInteger idx, BOOL * _Nonnull stop) {
        [handle.animator pauseAnimation:curTime];
    }];
}

-(void)hm_resumeAnimation{

    CFTimeInterval pausedTime = [self.layer timeOffset];
    CFTimeInterval curTime = CACurrentMediaTime();
    self.layer.speed = 1.0;
    self.layer.timeOffset = 0.0;
    self.layer.beginTime = 0.0;
    CFTimeInterval timeSincePause = [self.layer convertTime:curTime fromLayer:nil] - pausedTime;
    self.layer.beginTime = timeSincePause;
    NSArray <HMAnimationValueHandle *> *allValues = self.hm_animationMap.allValues;
    [allValues enumerateObjectsUsingBlock:^(HMAnimationValueHandle *handle, NSUInteger idx, BOOL * _Nonnull stop) {
        [handle.animator resumeAnimation:curTime];
    }];
}

- (void)hm_addAnimationValue:(HMBaseValue *)animation forKeyValue:(HMBaseValue *)keyPath {
    NSObject *anim = animation.toNativeObject;
    NSString *key = keyPath.toString;
    if (!anim || !key) {
        return;
    }
    if ([anim conformsToProtocol:@protocol(HMAnimator)]) {
        [self hm_addAnimation:(id<HMAnimator>)anim forKey:key];
    }else{
        HMAssert(NO, @"Animation must conforms to HMAnimator protocol");
    }
}

- (void)hm_removeAnimationForKeyJSValue:(HMBaseValue *)keyPath {
    NSString *key = keyPath.toString;
    [self hm_removeAnimationForKey:key];
    
}

- (void)hm_addAnimation:(id<HMAnimator>)animation forKey:(NSString *)key{
    
    HMAnimationValueHandle *newHandle = [[HMAnimationValueHandle alloc] initWithAnimator:animation jsValue:((NSObject *)animation).hmValue key:key];
    // remove previous animation
    [self hm_removeAnimationForKey:key];
    // handle js value
    [self.hm_animationMap setObject:newHandle forKey:key];
    // link animation and view
    [animation setAnimationView:self forKey:key];
    [HMAnimationManager addAnimation:animation];
}
/// 1. remove from mananger(to be played)
/// 2. remove handle
/// 3. stop animation
- (void)hm_removeAnimationForKey:(NSString *)key{
    if(key == nil || ![key isKindOfClass:NSString.class]){
        return;
    }
    HMAnimationValueHandle *handle = [self.hm_animationMap objectForKey:key];
    if(handle){
        /// 1. remove from mananger(to be played)
        [HMAnimationManager removeAnimation:handle.animator];
        /// 2. remove handle
        [self.hm_animationMap removeObjectForKey:key];
    }
    /// 3. stop animation
    [handle.animator stopAnimation];
}

- (void)hm_removeAllAnimation {
    NSArray <NSString *> *allKeys = self.hm_animationMap.allKeys;
    [allKeys enumerateObjectsUsingBlock:^(NSString * _Nonnull key, NSUInteger idx, BOOL * _Nonnull stop) {
        [self hm_removeAnimationForKey:key];
    }];
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

static NSMutableDictionary <NSString *, HMAnimationValueHandle *> *_HMAnimationManager_animationMap = nil;

- (void)setHm_animationMap:(NSMutableDictionary <NSString *, HMAnimationValueHandle *> *)hm_animationMap {
    objc_setAssociatedObject(self, @selector(hm_animationMap), hm_animationMap, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSMutableDictionary <NSString *, HMAnimationValueHandle *> *)hm_animationMap {
    if (!objc_getAssociatedObject(self, _cmd)) {
        self.hm_animationMap = [NSMutableDictionary new];
    }
    return objc_getAssociatedObject(self, _cmd);
}
@end
