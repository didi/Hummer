//
//  HMKeyFrameAnimation.m
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import "HMCAKeyframeAnimation.h"
#import "UIView+HMAnimation.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"
#import "HMAnimationConverter.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseValue.h>
#import "NSObject+Hummer.h"
#import <Hummer/HMUtility.h>
#import "HMAnimationManager.h"
#import <Hummer/HMCAAnimation+Internal.h>


@interface HMCAKeyframeEmpty : NSObject

@end

@implementation HMCAKeyframeEmpty

@end

@implementation HMCAKeyframeAnimationInfo


- (id)copyWithZone:(NSZone *)zone
{
    HMCAKeyframeAnimationInfo *info = [[HMCAKeyframeAnimationInfo allocWithZone:zone] init];
    info.propertyName = self.propertyName;
    info.animatedView = self.animatedView;
    info.values = self.values;
    info.keyTimes = self.keyTimes;
    info.timingFunction = self.timingFunction;
    return info;
}

@synthesize animatedView;

@synthesize propertyName;

@synthesize originAnchorPoint;

@synthesize timingFunction;

@end


@interface HMCAKeyframeAnimation ()<CAAnimationDelegate>


@property (nonatomic, strong) NSArray *keyframes;
@property (nonatomic, strong) NSArray *values;


@end


@implementation HMCAKeyframeAnimation

HM_EXPORT_CLASS(KeyframeAnimation, HMCAKeyframeAnimation)
HM_EXPORT_PROPERTY(keyframes, __keyframes, __setKeyframes:)
HM_EXPORT_PROPERTY(duration, __duration, __setDuration:)
HM_EXPORT_PROPERTY(repeatCount, __repeatCount, __setRepeatCount:)
HM_EXPORT_PROPERTY(delay, __delay, __setDelay:)
HM_EXPORT_METHOD(on, on:callback:)

- (void)startAnimation {
    HMTransform *oldTransform = self.animatedView.hm_transform;
    //目前 前端没有直接对 transform 进行赋值的接口，因此不能直接覆盖 oldTransform。需要进行合并。
    HMTransform *newTransform = [[HMTransform alloc] initWithKey:self.keyPath propertyValues:self.values];
    newTransform = [oldTransform mergeTransform:newTransform withKey:self.keyPath];
    
    self.infos = [NSMutableArray new];
    self.animations = [NSMutableArray new];
    HMCAKeyframeAnimationInfo *info = [HMCAKeyframeAnimationInfo new];
    info.animatedView = self.animatedView;
    info.keyTimes = self.keyframes;
    info.timingFunction = [HMAnimationConverter convertMediaTimingFunction:self.easing];
    
    if ([self isTransformAnimation]) {
        
        //keyframe 无法通过
        if ([self.keyPath isEqualToString:@"position"]) {
            NSMutableArray *xPosition = [NSMutableArray new];
            NSMutableArray *yPosition = [NSMutableArray new];
            for (NSValue *val in self.values) {
                [xPosition addObject:@(val.CGPointValue.x)];
                [yPosition addObject:@(val.CGPointValue.y)];
            }
            HMCAKeyframeAnimationInfo *newInfoX = [info copy];
            newInfoX.propertyName = @"transform.translation.x";
            newInfoX.values = xPosition;
            [self.infos addObject:newInfoX];
            
            HMCAKeyframeAnimationInfo *newInfoY = [info copy];
            newInfoY.propertyName = @"transform.translation.y";
            newInfoY.values = yPosition;
            [self.infos addObject:newInfoY];
            
        }else if ([self.keyPath hasPrefix:@"scale"]){
            
            NSMutableArray *xScale = [NSMutableArray new];
            NSMutableArray *yScale = [NSMutableArray new];
            if ([self.keyPath isEqualToString:@"scale"]) {
                
                xScale = [self.values copy];
                yScale = [self.values copy];
            }else if ([self.keyPath isEqualToString:@"scaleX"]){
                xScale = [self.values copy];
            }else if ([self.keyPath isEqualToString:@"scaleY"]){
                yScale = [self.values copy];
            }
            
            if (xScale.count>0) {
                HMCAKeyframeAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.scale.x";
                newInfo.values = xScale;
                [self.infos addObject:newInfo];
            }
            if (xScale.count>0) {
                HMCAKeyframeAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.scale.y";
                newInfo.values = yScale;
                [self.infos addObject:newInfo];
            }
        }else if ([self.keyPath hasPrefix:@"rotation"]){
            
            if ([self.keyPath isEqualToString:@"rotationX"]) {
                
                HMCAKeyframeAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.rotation.x";
                newInfo.values = self.values;
                [self.infos addObject:newInfo];
                
            }else if ([self.keyPath isEqualToString:@"rotationY"]){
                HMCAKeyframeAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.rotation.y";
                newInfo.values = self.values;
                [self.infos addObject:newInfo];
                
            }else if ([self.keyPath isEqualToString:@"rotationZ"]){
                HMCAKeyframeAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.rotation.z";
                newInfo.values = self.values;
                [self.infos addObject:newInfo];
            }
            
        }
        self.animatedView.hm_transform = newTransform;
    }else{
        if ([self.keyPath isEqualToString:@"backgroundColor"]) {
            HMCAKeyframeAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"backgroundColor";
            newInfo.values = self.values;
            [self.infos addObject:newInfo];
        } else if ([self.keyPath isEqualToString:@"opacity"]) {
            HMCAKeyframeAnimationInfo *newInfo = [info copy];
            newInfo.propertyName = @"opacity";
            newInfo.values = self.values;
            [self.infos addObject:newInfo];
        } else if ([self.keyPath isEqualToString:@"width"] || [self.keyPath isEqualToString:@"height"]) {
            
            __weak typeof(self) __weakSelf = self;
            NSInteger frames = self.values.count;
            NSInteger i = 0;
            UIView *root = hm_yoga_get_root_view(self.animatedView);
            NSMutableDictionary *viewMap = [NSMutableDictionary new];
        
            /**
             * keyframe 中存在 某一帧 与上一次布局信息一致，因此可能会导致 本次 affectedShadowViews 丢失。因此需要补帧
             * 假设 view 原 frame 为 {0,0,200,200}。
             * 1. 前面补帧 ：[0,0.4,1] -> [{200,200}, {300,300}, {200,200}]; 则第一帧会被丢失。
             * 2. 中间补帧 ：[0,0.4,1] -> [{300,300}, {300,300}, {200,200}]; 则第二帧会被丢失。
             * 3. 后面补帧 ：[0,0.4,1] -> [{200,200}, {300,300}, {300,300}]; 则第三帧会被丢失。
             * 即：当缺失某一帧，应当从前一帧 复制 一帧，到当前帧。如前一帧不存在，则取当前视图的frame
             */
            
            // 初始化 代补帧 数组
            HMCAKeyframeEmpty *emptyFrames[frames];
            for(int j = 0;j<frames;j++){emptyFrames[j] = [HMCAKeyframeEmpty new];}
            
            // 生成对应帧 信息
            /**
             * {"view":{bounds:[],  //对应 每一帧
             *        position:[]}, //对应 每一帧
             *        firstframe:[]} //
             */
            while (i < frames) {
                NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
                [self.animatedView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
                    __strong typeof(__weakSelf) __strongSelf = __weakSelf;
                    if ([__strongSelf.keyPath isEqualToString:@"width"])  layout.width = HMPointValueMake([__strongSelf.values[i] floatValue]);
                    if ([__strongSelf.keyPath isEqualToString:@"height"])  layout.height = HMPointValueMake([__strongSelf.values[i] floatValue]);
                }];
                [root hm_applyLayoutPreservingOrigin:NO affectedShadowViews:affectedShadowViews];
                NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;

                id<HMLayoutStyleProtocol> value = nil;
                while ((value = enumerator.nextObject)) {
                    UIView *affectedView = value.view;
                    NSNumber *viewKey = [NSNumber numberWithUnsignedLongLong:(uint64_t)affectedView];
                    NSDictionary *affectedViewKeyframeData = [viewMap objectForKey:viewKey];
                    if (!affectedViewKeyframeData) {
                        NSMutableArray *bounds = [NSMutableArray arrayWithObjects:emptyFrames count:frames];
                        NSMutableArray *centers = [NSMutableArray arrayWithObjects:emptyFrames count:frames];
                        affectedViewKeyframeData = @{@"bounds":bounds,
                                                     @"positions":centers,
                                                     @"initialBounds":[NSValue valueWithCGRect:affectedView.hm_animationPropertyBounds],
                                                     @"initialPosition":[NSValue valueWithCGPoint:affectedView.hm_animationPropertyCenter]};
                    }
                    
                    affectedViewKeyframeData[@"bounds"][i] = [NSValue valueWithCGRect:affectedView.bounds];
                    affectedViewKeyframeData[@"positions"][i] = [NSValue valueWithCGPoint:affectedView.center];
                    [viewMap setObject:affectedViewKeyframeData forKey:viewKey];
                }
                i++;
            }
            // 补帧 + 构造动画
            for (NSNumber *viewKey in viewMap) {
                uint64_t ptr = viewKey.longLongValue;
                UIView *view = (__bridge UIView *)((void *)ptr);
                NSDictionary *affectedViewKeyframeData = [viewMap objectForKey:viewKey];
                
                //补帧
                NSMutableArray *bounds = affectedViewKeyframeData[@"bounds"];
                NSMutableArray *centers = affectedViewKeyframeData[@"positions"];
                
                NSValue *initialBounds = affectedViewKeyframeData[@"initialBounds"];
                NSValue *initialPosition = affectedViewKeyframeData[@"initialPosition"];
                int j = 0;
                while (j < frames) {
                    if ([bounds[j] isKindOfClass:HMCAKeyframeEmpty.class]) {
                        if (j == 0) {
                            bounds[j] = initialBounds;
                        }else{
                            bounds[j] = bounds[j-1];
                        }
                    }
                    
                    if ([centers[j] isKindOfClass:HMCAKeyframeEmpty.class]) {
                        if (j == 0) {
                            centers[j] = initialPosition;
                        }else{
                            centers[j] = centers[j-1];
                        }
                    }
                    j++;
                }
                
                //构造动画
                HMCAKeyframeAnimationInfo *newInfo1 = [info copy];
                newInfo1.propertyName = @"bounds";
                newInfo1.values = affectedViewKeyframeData[@"bounds"];
                newInfo1.animatedView = view;
                [self.infos addObject:newInfo1];
                
                HMCAKeyframeAnimationInfo *newInfo2 = [info copy];
                newInfo2.propertyName = @"position";
                newInfo2.values = affectedViewKeyframeData[@"positions"];
                newInfo2.animatedView = view;
                [self.infos addObject:newInfo2];
                [view hm_layoutBackgroundColorImageBorderShadowCornerRadius];
            }
        }
    }
    
    for (HMCAKeyframeAnimationInfo *info in self.infos) {
        [self _createCAAnimation:info];
    }
}


/**
 *对其android方案，当Duration为0时，
 *ios默认0.25s动画。
 *android为极短时间的动画（表现为无动画过度）。
 */
- (void)_createCAAnimation:(HMCAKeyframeAnimationInfo *)info {
    
    CAKeyframeAnimation* animation = [CAKeyframeAnimation animationWithKeyPath:info.propertyName];
    animation.values = info.values;
    animation.keyTimes = self.keyframes;
    animation.duration = self.duration == 0 ? 0.001 : self.duration;
    animation.repeatCount = self.repeatCount < 0 ? MAXFLOAT : self.repeatCount;
    animation.beginTime = [info.animatedView.layer convertTime:CACurrentMediaTime() fromLayer:nil]  + self.delay;
    animation.timingFunction = info.timingFunction;
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;
    animation.delegate = self;
    [info.animatedView.layer addAnimation:animation forKey:[self uniqueAnimationKeyWithInfo:info]];
}


#pragma mark <JSExport>

- (HMBaseValue *)__duration {
    return [HMBaseValue valueWithDouble:self.duration inContext:self.hmContext];
}

- (void)__setDuration:(HMBaseValue *)value {
    NSNumber *num = value.toNumber;
    self.duration = num.doubleValue;
}

- (HMBaseValue *)__repeatCount {
    return [HMBaseValue valueWithInt32:self.repeatCount inContext:self.hmContext];
}

- (void)__setRepeatCount:(HMBaseValue *)value {
    float repeatCount = [value.toNumber floatValue];
    [self setRepeatCount:repeatCount];
}

- (HMBaseValue *)__delay {
    return nil;
}

- (void)__setDelay:(HMBaseValue *)value {
    self.delay = [value.toNumber floatValue];
}

- (HMBaseValue *)__keyframes {
    return nil;
}

- (void)__setKeyframes:(HMBaseValue *)value {
    NSArray *keyframes = value.toArray;
    if (keyframes.count <= 0) return;
    
    NSMutableArray *values = [NSMutableArray new];
    NSMutableArray *keyTimes = [NSMutableArray new];
    for (NSDictionary *item in keyframes) {
        HMAssert([item isKindOfClass:[NSDictionary class]], @"key frame must be dictionary");
        id value = [HMAnimationConverter convertAnimationValue:[item valueForKey:@"value"]
                                                       keyPath:self.keyPath];
        if (value) {
            [values addObject:value];
        }
        id keyTime = [item valueForKey:@"percent"];
        if (keyTime) {
            [keyTimes addObject:keyTime];
        }
    }
    self.values = values;
    self.keyframes = keyTimes;
    self.property = self.values.lastObject;
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
