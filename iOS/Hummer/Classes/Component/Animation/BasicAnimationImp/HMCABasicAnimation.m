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


@implementation HMCABasicAnimationInfo


- (id)copyWithZone:(NSZone *)zone
{
    HMCABasicAnimationInfo *info = [[HMCABasicAnimationInfo allocWithZone:zone] init];
    info.propertyName = self.propertyName;
    info.animatedView = self.animatedView;
    info.fromValue = self.fromValue;
    info.toValue = self.toValue;
    info.duration = self.duration;
    info.delay = self.delay;
    info.timingFunction = self.timingFunction;
    return info;
}

@end

@interface HMCABasicAnimation()<CAAnimationDelegate>

@property (nonatomic, strong)NSMutableArray<HMCABasicAnimationInfo *> *infos;
@property (nonatomic, strong)NSMutableArray<CAAnimation *> *animations;

@property (nonatomic, assign)BOOL isFinish;
@end

@implementation HMCABasicAnimation

#pragma mark <HMAnimator>

- (void)setAnimationView:(UIView *)view forKey:(NSString *)animationKey {
    self.animatedView = view;
    self.animationKey = animationKey ? animationKey : self.animationKeyPath;
}

- (BOOL)canStartAnimation {
    
    return !self.animatedView.hm_renderObject.isDirty;
}

- (void)startAnimation {
    
    HMTransform *oldTransform = self.animatedView.hm_transform;
    //目前 前端没有直接对 transform 进行赋值的接口，因此不能直接覆盖 oldTransform。需要进行合并。
    HMTransform *newTransform = [[HMTransform alloc] initWithKey:self.animationKeyPath propertyValue:self.property];
    newTransform = [oldTransform mergeTransform:newTransform withKey:self.animationKeyPath];

    self.infos = [NSMutableArray new];
    self.animations = [NSMutableArray new];
    HMCABasicAnimationInfo *info = [HMCABasicAnimationInfo new];
    info.animatedView = self.animatedView;
    info.duration = self.duration;
    info.delay = self.delay;

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
        self.animatedView.hm_transform = newTransform;
    }else{
        if ([self.animationKeyPath isEqualToString:@"backgroundColor"]) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"backgroundColor";
            newInfo.fromValue = (__bridge id _Nonnull)((self.animatedView.backgroundColor.CGColor));
            newInfo.toValue = self.property;
            [self.infos addObject:newInfo];
        } else if ([self.animationKeyPath isEqualToString:@"opacity"]) {
            HMCABasicAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"opacity";
            newInfo.fromValue = @(self.animatedView.alpha);
            newInfo.toValue = self.property;
            [self.infos addObject:newInfo];
        } else if ([self.animationKeyPath isEqualToString:@"width"] || [self.animationKeyPath isEqualToString:@"height"]) {
           
            __weak typeof(self) __weakSelf = self;
            [self.animatedView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
                __strong typeof(__weakSelf) __strongSelf = __weakSelf;
                NSNumber *numVal = __strongSelf.property;
                if ([__strongSelf.animationKeyPath isEqualToString:@"width"])  layout.width = HMPointValueMake(numVal.floatValue);
                if ([__strongSelf.animationKeyPath isEqualToString:@"height"])  layout.height = HMPointValueMake(numVal.floatValue);
            }];
            UIView *root = hm_yoga_get_root_view(animatedView);
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

- (void)stopAnimation {
    for (HMCABasicAnimationInfo *info in self.infos) {
        [info.animatedView.layer removeAnimationForKey:[self uniqueAnimationKeyWithInfo:info]];
    }
}

- (void)_createCAAnimation:(HMCABasicAnimationInfo *)info {
    
    CABasicAnimation* animation = [CABasicAnimation animationWithKeyPath:info.propertyName];
    animation.fromValue = info.fromValue;
    animation.toValue = info.toValue;
    animation.duration = info.duration;
    animation.beginTime = CACurrentMediaTime() + info.delay;
    animation.timingFunction = info.timingFunction;
    animation.repeatCount = self.repeatCount;
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;
    animation.delegate = self;
    [info.animatedView.layer addAnimation:animation forKey:[self uniqueAnimationKeyWithInfo:info]];
}

#pragma mark <CAAnimationDelegate>
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

        } else if ([self.animationKeyPath isEqualToString:@"backgroundColor"]) {
            self.animatedView.layer.backgroundColor = (__bridge CGColorRef _Nullable)(self.property);
        } else if ([self.animationKeyPath isEqualToString:@"opacity"]) {
            self.animatedView.alpha = [self.property floatValue];
        }
        if (self.startBlock) {
            self.startBlock();
        }
    }
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
    
    self.isFinish = self.isFinish | flag;
    [self.animations removeObject:anim];
    if (self.animations.count <= 0) {
        if (self.endBlock) {
            self.endBlock(self.isFinish);
        }
    }
}

#pragma mark <private>

- (BOOL)isTransformAnimation {
    return [self.animationKeyPath hasPrefix:@"position"] || [self.animationKeyPath hasPrefix:@"scale"] || [self.animationKeyPath hasPrefix:@"rotation"];
}

- (NSString *)uniqueAnimationKeyWithInfo:(HMCABasicAnimationInfo *)info{
    
    NSString *key = [NSString stringWithFormat:@"%@%@",self.animationKey, info.propertyName];
    return key;
}


@synthesize animatedView;

@synthesize animationType;

@synthesize delay;

@synthesize duration;

@synthesize endBlock;

@synthesize initialVelocity;

@synthesize repeatCount;

@synthesize springDamping;

@synthesize startBlock;

@synthesize animationKeyPath;

@synthesize animationKey;

@end

