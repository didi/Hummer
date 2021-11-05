//
//  HMCAAnimation.m
//  Hummer
//
//  Created by didi on 2021/3/1.
//

#import "HMCAAnimation.h"
#import "HMBaseExecutorProtocol.h"
#import <Hummer/HMCAAnimation+Internal.h>
#import <Hummer/HMBaseValue.h>
#import <Hummer/HMUtility.h>
#import "HMAnimationManager.h"
#import "UIView+HMAnimation.h"
#import "NSObject+Hummer.h"
#import "UIView+HMRenderObject.h"


@implementation HMCAAnimation

- (instancetype)initWithHMValues:(NSArray *)values {
    self = [self init];
    if (self) {
        NSString *value = values.count > 0 ? [values[0] toString] : @"";
        NSString *animationKeyPath = value;
        NSAssert(animationKeyPath != nil, @"HMBasicAnimation init must set keypath!!!");
        self.keyPath = value;
    }
    return self;
}

#pragma mark <HMAnimator>
- (BOOL)canStartAnimation {
    return !self.animatedView.hm_renderObject.isDirty;
//    return YES;

}

- (void)setAnimationView:(nonnull UIView *)view forKey:(nullable NSString *)animationKey {
    self.animatedView = view;
    self.animationKey = animationKey ? animationKey : self.keyPath;
}

- (void)startAnimation {
    
}

- (void)stopAnimation {
    for (id<HMCAAnimationInfo> info in self.infos) {
        [info.animatedView.layer removeAnimationForKey:[self uniqueAnimationKeyWithInfo:info]];
    }
}

#pragma mark <CAAnimationDelegate>

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
    
    self.isFinish = self.isFinish | flag;
    [self.animations removeObject:anim];
    if (self.animations.count <= 0) {
        if (self.stopBlock) {
            NSMutableArray *args = NSMutableArray.new;
            if (self.hmValue) {
                [args addObject:self.hmValue];
                [args addObject:[HMBaseValue valueWithBool:self.isFinish inContext:self.hmValue.context]];
            } else {
                HMLogDebug(@"class [%@] JSValue is nil", [self class]);
            }
            if (self.stopBlock) {self.stopBlock(args);}
        }
        [HMAnimationManager removeAnimationForView:self.animatedView key:self.animationKey];
    }
}
- (void)animationDidStart:(CAAnimation *)anim {
    
    
    [self.animations addObject:anim];
    if (self.animations.count == self.infos.count) {
        //同步transform。bounds 不需要
        if ([self isTransformAnimation]) {

            CATransform3D trans = CATransform3DMakeScale(self.animatedView.hm_transform.scaleX, self.animatedView.hm_transform.scaleY, 1);
            trans = CATransform3DTranslate(trans, self.animatedView.hm_transform.translateX, self.animatedView.hm_transform.translateY, 0);
            trans = CATransform3DRotate(trans, self.animatedView.hm_transform.rotationX, 1, 0, 0);
            trans = CATransform3DRotate(trans, self.animatedView.hm_transform.rotationY, 0, 1, 0);
            trans = CATransform3DRotate(trans, self.animatedView.hm_transform.rotationZ, 0, 0, 1);
            self.animatedView.layer.transform = trans;

        } else if ([self.keyPath isEqualToString:@"backgroundColor"]) {
            self.animatedView.layer.backgroundColor = (__bridge CGColorRef _Nullable)(self.property);
        } else if ([self.keyPath isEqualToString:@"opacity"]) {
            self.animatedView.alpha = [self.property floatValue];
        }
        if (self.startBlock) {
            NSMutableArray *args = NSMutableArray.new;
            if (self.hmValue) {
                [args addObject:self.hmValue];
            } else {
                HMLogDebug(@"class [%@] JSValue is nil", [self class]);
            }
            if (self.startBlock) {self.startBlock(args);}
        }
    }
}

#pragma mark <private>

- (BOOL)isTransformAnimation {
    return [self.keyPath hasPrefix:@"position"] || [self.keyPath hasPrefix:@"scale"] || [self.keyPath hasPrefix:@"rotation"];
}

- (NSString *)uniqueAnimationKeyWithInfo:(id<HMCAAnimationInfo>)info{
    
    NSString *key = [NSString stringWithFormat:@"%@%@",self.animationKey, info.propertyName];
    return key;
}

@end
