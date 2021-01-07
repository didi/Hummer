//
//  HMBasicAnimation.m
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import "HMBasicAnimation.h"
#import "NSObject+Hummer.h"
#import <objc/runtime.h>
#import "JSValue+Hummer.h"
#import "HMUtility.h"
#import "HMAnimationConverter.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"

static NSString *const kHMAnimationEventStart = @"start";   // 动画开始事件
static NSString *const kHMAnimationEventEnd = @"end";       // 动画结束事件
// FIXME: https://stackoverflow.com/questions/27931421/cgaffinetransform-scale-and-translation-jump-before-animation/33465048#33465048
static CGFloat const kHMTransformMagicNumber = 1.00001;    // 追加位移缩放问题在ios13之前存在bug

/**
 *兼容anroid的覆盖原则：
 *同类型覆盖，不同类型叠加：
 */
//目前js 设置样式Transform 是每次设置一种样式，因此合并操作直接覆盖“对应的”原有值
static CATransform3D HMCATransform3DMerge(CATransform3D t1, CATransform3D t2, NSString *key){
    
        if ([key isEqualToString:@"position"]) {
    
            t1.m41 = t2.m41;
            t1.m42 = t2.m42;
        }else if ([key hasPrefix:@"scale"]){
    
            t1.m11 = t2.m11;
            t1.m22 = t2.m22;
        }else{
            //rotation 的情况暂时不考虑
            t1 = t2;
        }
    t1.m33 = kHMTransformMagicNumber;
    return t1;
}


static UIViewAnimationOptions UIViewAnimationOptionsFromHMAnimationType(HMAnimationType type)
{
    switch (type) {
        case HMAnimationTypeLinear:
            return UIViewAnimationOptionCurveLinear;
        case HMAnimationTypeEaseIn:
            return UIViewAnimationOptionCurveEaseIn;
        case HMAnimationTypeEaseOut:
            return UIViewAnimationOptionCurveEaseOut;
        case HMAnimationTypeEaseInEaseOut:
            return UIViewAnimationOptionCurveEaseInOut;
        default:
            return UIViewAnimationOptionCurveEaseInOut;
    }
}

@interface HMBasicAnimationProperty()

@property (nonatomic, copy) NSString *origKey;
@property (nonatomic, copy) NSString *viewPropertyKey;
@property (nonatomic, strong) id value;
@end

@implementation HMBasicAnimationProperty

- (instancetype)initWithKey:(NSString *)key propertyValue:(id)value{
    self = [super init];
    if (self) {
        _origKey = key;
        if ([key isEqualToString:@"position"]) {
            CGPoint point = [((NSValue *)value) CGPointValue];
            CATransform3D t = CATransform3DMakeTranslation(point.x, point.y,0);
            t.m33 = kHMTransformMagicNumber;
            _value = [NSValue valueWithCATransform3D:t];
        } else if([key hasPrefix:@"scale"]){
            CGFloat x = 1;
            CGFloat y = 1;
            CGFloat v = [((NSNumber *)value) floatValue];
            if ([key isEqualToString:@"scaleX"]) {
                x = v;
            }else if ([key isEqualToString:@"scaleY"]){
                y = v;
            }else{
                x = v;
                y = v;
            }
            CATransform3D t = CATransform3DMakeScale(x, y,kHMTransformMagicNumber);
            _value = [NSValue valueWithCATransform3D:t];
        } else if([key hasPrefix:@"rotation"]){
            CGFloat v = [((NSNumber *)value) floatValue];
            CATransform3D t = CATransform3DMakeRotation(v, 0, 0, 1);
            t.m33 = kHMTransformMagicNumber;
            _value = [NSValue valueWithCATransform3D:t];
        }else{
            if ([key isEqualToString:@"backgroundColor"]) {
                _value = [UIColor colorWithCGColor:(CGColorRef)value];
            } else{
                _value = value;
            }
        }
        _viewPropertyKey = [[HMBasicAnimationProperty viewPropertyMap] valueForKey:key];
    }
    return self;
}
+ (NSDictionary *)viewPropertyMap {
    
    return @{
        @"position":@"hm_transform3D",
        @"scale":@"hm_transform3D",
        @"scaleX":@"hm_transform3D",
        @"scaleY":@"hm_transform3D",
        @"rotationX":@"hm_transform3D",
        @"rotationY":@"hm_transform3D",
        @"rotationZ":@"hm_transform3D",
        @"skew":@"hm_transform3D",
        @"opacity":@"alpha",
        @"backgroundColor":@"backgroundColor",
        @"cornerRadius":@"cornerRadius",
        @"width":@"bounds",
        @"height":@"bounds",
    };
}

- (void)mergeTransform:(CATransform3D)t {
    
    if ([self.viewPropertyKey isEqualToString:@"hm_transform3D"]) {
        if (!CATransform3DIsIdentity(t)) {
            CATransform3D newTrans = [self.value CATransform3DValue];
            CATransform3D mergeTrans = HMCATransform3DMerge(t, newTrans, self.origKey);
            _value = [NSValue valueWithCATransform3D:mergeTrans];
        }
    }
}

- (void)calculateBoundsIfNeedWithAnimatedView:(UIView *)animatedView {
    if ([self.origKey isEqualToString:@"width"]) {
        CGRect bounds = animatedView.bounds;
        bounds.size.width = ((NSNumber *)self.value).doubleValue;
        self.value = [NSValue valueWithCGRect:bounds];
    } else if ([self.origKey isEqualToString:@"height"]) {
        CGRect bounds = animatedView.bounds;
        bounds.size.height = ((NSNumber *)self.value).doubleValue;
        self.value = [NSValue valueWithCGRect:bounds];
    }
}

- (void)updateYogaLayoutIfNeedWithAniamtedView:(UIView *)animatedView {
    if ([self.origKey isEqualToString:@"width"] || [self.origKey isEqualToString:@"height"]) {
        __weak typeof(self) __weakSelf = self;
        [animatedView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            __strong typeof(__weakSelf) __strongSelf = __weakSelf;
            if ([__strongSelf.origKey isEqualToString:@"width"])  layout.width = HMPointValueMake(CGRectGetWidth(animatedView.bounds));
            if ([__strongSelf.origKey isEqualToString:@"height"])  layout.height = HMPointValueMake(CGRectGetHeight(animatedView.bounds));
        }];
        UIView *root = hm_yoga_get_root_view(animatedView);
        NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
        [root hm_applyLayoutPreservingOrigin:NO affectedShadowViews:affectedShadowViews];
        NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;
        id<HMLayoutStyleProtocol> value = nil;
        while ((value = enumerator.nextObject)) {
            [value.view hm_layoutBackgroundColorImageBorderShadowCornerRadius];
        }
    }
}

@end

@interface HMBasicAnimation()
@property (nonatomic, copy, getter=getStartBlock, setter=setStartBlock:) HMFuncCallback startBlock;
@property (nonatomic, copy, getter=getStopBlock, setter=setStopBlock:) HMFuncCallback stopBlock;
@property (nonatomic, copy, getter=getTimingFunctionName, setter=setTimingFunctionName:) NSString *timingFunctionName;
@end

@implementation HMBasicAnimation

HM_EXPORT_CLASS(BasicAnimation, HMBasicAnimation)
HM_EXPORT_PROPERTY(value, animValue, setAnimValue:)

HM_EXPORT_PROPERTY(duration, __duration, __setDuration:)
HM_EXPORT_PROPERTY(repeatCount, __repeatCount, __setRepeatCount:)
HM_EXPORT_PROPERTY(delay, __delay, __setDelay:)
HM_EXPORT_PROPERTY(timingFunction, __getTimingFunction, __setTimingFunction:)
HM_EXPORT_METHOD(on, on:callback:)

@synthesize animationType;
@synthesize springDamping;
@synthesize repeatCount;
@synthesize initialVelocity;
@synthesize duration;
@synthesize delay;

- (instancetype)initWithHMValues:(NSArray *)values {
    self = [self init];
    if (self) {
        NSString *value = values.count > 0 ? [values[0] toString] : @"";
        NSString *animationKeyPath = value;
        NSAssert(animationKeyPath != nil, @"HMBasicAnimation init must set keypath!!!");
        if (animationKeyPath) {
            self.animationKeyPath = animationKeyPath;
        }
    }
    return self;
}


#pragma mark <js export>

- (JSValue *)animValue {
    return nil;
}

- (void)setAnimValue:(JSValue *)value {
    id animationValue = [HMAnimationConverter convertAnimationValue:value.hm_toObjCObject
                                                            keyPath:self.animationKeyPath];
    
    self.property = [[HMBasicAnimationProperty alloc] initWithKey:self.animationKeyPath propertyValue:animationValue];
}

- (JSValue *)__duration {
    return [JSValue valueWithDouble:self.duration inContext:self.hmContext];
}

- (void)__setDuration:(JSValue *)value {
    self.duration = [value.toNumber doubleValue];
}

- (JSValue *)__repeatCount {
    return [JSValue valueWithInt32:self.repeatCount inContext:self.hmContext];
}

- (void)__setRepeatCount:(JSValue *)value {
    float repeatCount = [value.toNumber floatValue];
    if (repeatCount < 0) {
        repeatCount = MAXFLOAT;
    }
    [self setRepeatCount:repeatCount];
}

- (JSValue *)__delay {
    return [JSValue valueWithDouble:self.delay inContext:self.hmContext];
}

- (void)__setDelay:(JSValue *)value{
    
    self.delay = [value.toNumber floatValue];
}


- (JSValue *)__getTimingFunction {
    return [self getTimingFunctionName].hmValue;
}

- (void)__setTimingFunction:(JSValue *)value {
    if ([value isString]) {
        [self setTimingFunctionName:value.toString];
    }
}

- (void)on:(JSValue *)value callback:(HMFuncCallback)callback{
    if ([value isString]) {
        NSString *event = value.toString;
        if ([event isEqualToString:kHMAnimationEventStart]) {
            self.startBlock = callback;
        } else if ([event isEqualToString:kHMAnimationEventEnd]) {
            self.stopBlock = callback;
        }
    }
}


#pragma mark <HMViewAnimation>
- (void)startAnimation {
    
    [self.property mergeTransform:self.animatedView.layer.transform];
    [self.property calculateBoundsIfNeedWithAnimatedView:self.animatedView];
    void (^animations)(void) = ^(void) {
        
        [self.animatedView setValue:self.property.value forKey:self.property.viewPropertyKey];
        [self.property updateYogaLayoutIfNeedWithAniamtedView:self.animatedView];
    };
    
    void (^completion)(BOOL) = ^(BOOL finished) {

        if (self.stopBlock) {
            NSMutableArray *args = NSMutableArray.new;
            if (self.hmValue) {
                [args addObject:self.hmValue];
                [args addObject:[JSValue valueWithBool:finished inContext:self.hmValue.context]];
            } else {
                HMLogDebug(@"class [%@] JSValue is nil", [self class]);
            }
            self.stopBlock(args.copy);
        }
    };
    
    if (self.startBlock) {
        NSMutableArray *args = NSMutableArray.new;
        if (self.hmValue) {
            [args addObject:self.hmValue];
        } else {
            HMLogDebug(@"class [%@] JSValue is nil", [self class]);
        }
        self.startBlock(args);
    }
    
    if (self.animationType == HMAnimationTypeSpring) {
        [UIView animateWithDuration:self.duration
                              delay:self.delay
             usingSpringWithDamping:self.springDamping
              initialSpringVelocity:self.initialVelocity
                            options:UIViewAnimationOptionBeginFromCurrentState
                         animations:animations
                         completion:completion];
    } else {
        UIViewAnimationOptions options =
        UIViewAnimationOptionBeginFromCurrentState | UIViewAnimationOptionsFromHMAnimationType(self.animationType);
        
        [UIView animateWithDuration:self.duration
                              delay:self.delay
                            options:options
                         animations:animations
                         completion:completion];
    }
}

- (void)stopAnimation:(BOOL)withoutFinishing {
    
    [self.animatedView.layer removeAllAnimations];
}

- (BOOL)canStartAnimation {
    return !self.animatedView.hm_renderObject.isDirty;
}

@end


@interface UIView (HMTransformWapper)

@end

@implementation UIView(HMTransformWapper)

- (CATransform3D)hm_transform3D{
    return self.layer.transform;
}

- (void)setHm_transform3D:(CATransform3D)hm_transform3D{
    self.layer.transform = hm_transform3D;
}

@end
