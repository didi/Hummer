//
//  HMCABasicAnimation.m
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import "HMCABasicAnimation.h"
#import "UIView+HMAnimation.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"
#import "HMAnimationConverter.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseValue.h>
#import "NSObject+Hummer.h"
#import <Hummer/HMUtility.h>
#import <Hummer/HMAnimationManager.h>
#import <Hummer/HMCAAnimation+Internal.h>

@implementation HMCABasicAnimationInfo


- (id)copyWithZone:(NSZone *)zone
{
    HMCABasicAnimationInfo *info = [[HMCABasicAnimationInfo allocWithZone:zone] init];
    info.propertyName = self.propertyName;
    info.animatedView = self.animatedView;
    info.fromValue = self.fromValue;
    info.toValue = self.toValue;
    info.timingFunction = self.timingFunction;
    return info;
}

@synthesize animatedView;

@synthesize originAnchorPoint;

@synthesize propertyName;

@synthesize timingFunction;

@end

@interface HMCABasicAnimation()<CAAnimationDelegate>

@end

@implementation HMCABasicAnimation

HM_EXPORT_CLASS(BasicAnimation, HMCABasicAnimation)
HM_EXPORT_PROPERTY(value, animValue, setAnimValue:)

HM_EXPORT_PROPERTY(duration, __duration, __setDuration:)
HM_EXPORT_PROPERTY(repeatCount, __repeatCount, __setRepeatCount:)
HM_EXPORT_PROPERTY(delay, __delay, __setDelay:)
HM_EXPORT_PROPERTY(easing, __getTimingFunction, __setTimingFunction:)
HM_EXPORT_METHOD(on, on:callback:)

#pragma mark <HMAnimator>

- (void)startAnimation {
    
    HMTransform *oldTransform = self.animatedView.hm_transform;
    //目前 前端没有直接对 transform 进行赋值的接口，因此不能直接覆盖 oldTransform。需要进行合并。
    HMTransform *newTransform = [[HMTransform alloc] initWithKey:self.keyPath propertyValue:self.property];
    newTransform = [oldTransform mergeTransform:newTransform withKey:self.keyPath];
    
    self.infos = [NSMutableArray new];
    self.animations = [NSMutableArray new];
    HMCABasicAnimationInfo *info = [HMCABasicAnimationInfo new];
    info.animatedView = self.animatedView;
    info.timingFunction = [HMAnimationConverter convertMediaTimingFunction:self.easing];
    
    if ([self isTransformAnimation]) {
        
        if (oldTransform.translateX != newTransform.translateX) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform.translation.x";
            newInfo.fromValue = @(oldTransform.translateX);
            newInfo.toValue = @(newTransform.translateX);
            [self.infos addObject:newInfo];
        }
        if (oldTransform.translateY != newTransform.translateY) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform.translation.y";
            newInfo.fromValue = @(oldTransform.translateY);
            newInfo.toValue = @(newTransform.translateY);
            [self.infos addObject:newInfo];
        }
        
        if (oldTransform.scaleX != newTransform.scaleX) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform.scale.x";
            newInfo.fromValue = @(oldTransform.scaleX);
            newInfo.toValue = @(newTransform.scaleX);
            [self.infos addObject:newInfo];
        }
        if (oldTransform.scaleY != newTransform.scaleY) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform.scale.y";
            newInfo.fromValue = @(oldTransform.scaleY);
            newInfo.toValue = @(newTransform.scaleY);
            [self.infos addObject:newInfo];
        }
        
        if (oldTransform.rotationZ != newTransform.rotationZ) {
            
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform.rotation.z";
            newInfo.fromValue = @(oldTransform.rotationZ);
            newInfo.toValue = @(newTransform.rotationZ);
            [self.infos addObject:newInfo];
        }
        if (oldTransform.rotationY != newTransform.rotationY) {
            
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform.rotation.y";
            newInfo.fromValue = @(oldTransform.rotationY);
            newInfo.toValue = @(newTransform.rotationY);
            [self.infos addObject:newInfo];
        }
        if (oldTransform.rotationX != newTransform.rotationX) {
            
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform.rotation.x";
            newInfo.fromValue = @(oldTransform.rotationX);
            newInfo.toValue = @(newTransform.rotationX);
            [self.infos addObject:newInfo];
        }
        if (!CATransform3DEqualToTransform(oldTransform.skew, newTransform.skew)) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"transform";
            newInfo.fromValue = [NSValue valueWithCATransform3D:oldTransform.skew];
            newInfo.toValue = [NSValue valueWithCATransform3D:newTransform.skew];
            [self.infos addObject:newInfo];
        }
        self.animatedView.hm_transform = newTransform;
    }else{
        if ([self.keyPath isEqualToString:@"backgroundColor"]) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"backgroundColor";
            newInfo.fromValue = (__bridge id _Nonnull)((self.animatedView.backgroundColor.CGColor));
            newInfo.toValue = self.property;
            [self.infos addObject:newInfo];
        } else if ([self.keyPath isEqualToString:@"opacity"]) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"opacity";
            newInfo.fromValue = @(self.animatedView.alpha);
            newInfo.toValue = self.property;
            [self.infos addObject:newInfo];
        } else if ([self.keyPath isEqualToString:@"width"] || [self.keyPath isEqualToString:@"height"]) {
            
            __weak typeof(self) __weakSelf = self;
            [self.animatedView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
                __strong typeof(__weakSelf) __strongSelf = __weakSelf;
                NSNumber *numVal = __strongSelf.property;
                if ([__strongSelf.keyPath isEqualToString:@"width"])  layout.width = HMPointValueMake(numVal.floatValue);
                if ([__strongSelf.keyPath isEqualToString:@"height"])  layout.height = HMPointValueMake(numVal.floatValue);
            }];
            UIView *root = hm_yoga_get_root_view(self.animatedView);
            NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
            
            [root hm_applyLayoutPreservingOrigin:NO affectedShadowViews:affectedShadowViews];
            NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;
            
            id<HMLayoutStyleProtocol> value = nil;
            while ((value = enumerator.nextObject)) {
                UIView *affectedView = value.view;
                HMCABasicAnimationInfo *newInfo1 = [info copy];
                newInfo1.propertyName = @"bounds";
                newInfo1.fromValue = [NSValue valueWithCGRect:affectedView.hm_animationPropertyBounds];
                newInfo1.toValue = [NSValue valueWithCGRect:affectedView.bounds];
                newInfo1.animatedView = affectedView;
                [self.infos addObject:newInfo1];
                
                HMCABasicAnimationInfo *newInfo2 = [info copy];
                newInfo2.propertyName = @"position";
                newInfo2.animatedView = affectedView;
                newInfo2.fromValue = [NSValue valueWithCGPoint:affectedView.hm_animationPropertyCenter];
                newInfo2.toValue = [NSValue valueWithCGPoint:affectedView.center];
                [self.infos addObject:newInfo2];
                
                [affectedView hm_layoutBackgroundColorImageBorderShadowCornerRadius];
            }
        }
    }
    
    for (HMCABasicAnimationInfo *info in self.infos) {
        [self _createCAAnimation:info];
    }
}

- (void)_createCAAnimation:(HMCABasicAnimationInfo *)info {
    
    CABasicAnimation* animation = [CABasicAnimation animationWithKeyPath:info.propertyName];
    animation.fromValue = info.fromValue;
    animation.toValue = info.toValue;
    animation.duration = self.duration == 0 ? 0.0001 : self.duration;
//  https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/AdvancedAnimationTricks/AdvancedAnimationTricks.html#//apple_ref/doc/uid/TP40004514-CH8-SW1
    /**
     * Core Animation Programming Guide
     * When thinking about timing and animations, it is important to understand how layer objects work with time.
     * Each layer has its own local time that it uses to manage animation timing. Normally,
     * the local time of two different layers is close enough that you could specify the same time values for each
     * and the user might not notice anything.
     * However, the local time of a layer can be modified by its parent layers or by its own timing parameters.
     * For example, changing the layer’s speed property causes the duration of animations on that layer (and its sublayers) to change proportionally.
     */
    // t = (tp + begin) * speed + offset
    animation.beginTime = [info.animatedView.layer convertTime:CACurrentMediaTime() fromLayer:nil]  + self.delay;
    animation.timingFunction = info.timingFunction;
    animation.repeatCount = self.repeatCount < 0 ? MAXFLOAT : self.repeatCount;
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;
    animation.delegate = self;
    [info.animatedView.layer addAnimation:animation forKey:[self uniqueAnimationKeyWithInfo:info]];
}



#pragma mark <JSExport>
- (HMBaseValue *)animValue {
    return nil;
}

- (void)setAnimValue:(HMBaseValue *)value {
    id animationValue = [HMAnimationConverter convertAnimationValue:value.hm_toObjCObject
                                                            keyPath:self.keyPath];
    self.property = animationValue;
    
}

- (HMBaseValue *)__duration {
    return [HMBaseValue valueWithDouble:self.duration inContext:self.hmContext];
}

- (void)__setDuration:(HMBaseValue *)value {
    self.duration = [value.toNumber doubleValue];
}

- (HMBaseValue *)__repeatCount {
    return [HMBaseValue valueWithInt32:self.repeatCount inContext:self.hmContext];
}

/**
 * 小于0，相当于 infinate
 * 0，执行1次。
 * 大于等于 1 的数字，代表动画执行的次数。
 */
- (void)__setRepeatCount:(HMBaseValue *)value {
    float repeatCount = [value.toNumber floatValue];
    self.repeatCount = repeatCount;
}

- (HMBaseValue *)__delay {
    return [HMBaseValue valueWithDouble:self.delay inContext:self.hmContext];
}

- (void)__setDelay:(HMBaseValue *)value{
    
    self.delay = [value.toNumber floatValue];
}


- (HMBaseValue *)__getTimingFunction {
    return [HMBaseValue valueWithObject:self.easing inContext:self.hmContext];
}

- (void)__setTimingFunction:(HMBaseValue *)value {
    if ([value isString]) {
        self.easing = value.toString;
    }
}

- (void)on:(HMBaseValue *)value callback:(HMFuncCallback)callback{
    if ([value isString]) {
        NSString *event = value.toString;
        if ([event isEqualToString:@"start"]) {
            self.startBlock = callback;
        } else if ([event isEqualToString:@"end"]) {
            self.stopBlock = callback;
        }
    }
}

@end

