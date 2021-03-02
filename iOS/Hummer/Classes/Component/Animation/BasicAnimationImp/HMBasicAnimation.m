//
//  HMBasicAnimation.m
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import "HMBasicAnimation.h"
#import "NSObject+Hummer.h"
#import <objc/runtime.h>
#import "HMUtility.h"
#import "HMAnimationConverter.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"
#import "HMBaseExecutorProtocol.h"

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
@property (nonatomic, strong) id origValue;

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

@property (nonatomic, assign) HMAnimationType animationType;
@end

@implementation HMBasicAnimation



#pragma mark <HMViewAnimation>

- (void)setAnimationView:(UIView *)view forKey:(NSString *)animationKey {
    self.animatedView = view;
    self.animationKey = animationKey;
}

- (BOOL)canStartAnimation {
    return !self.animatedView.hm_renderObject.isDirty;
}

- (void)startAnimation {
    
    [self.property mergeTransform:self.animatedView.layer.transform];
    [self.property calculateBoundsIfNeedWithAnimatedView:self.animatedView];
    void (^animations)(void) = ^(void) {
        [UIView setAnimationRepeatCount:self.repeatCount];
        [self.animatedView setValue:self.property.value forKey:self.property.viewPropertyKey];
        [self.property updateYogaLayoutIfNeedWithAniamtedView:self.animatedView];
    };
    if (self.startBlock) {
        self.startBlock();
    }
    
    if (self.animationType == HMAnimationTypeSpring) {
        [UIView animateWithDuration:self.duration
                              delay:self.delay
             usingSpringWithDamping:self.springDamping
              initialSpringVelocity:self.initialVelocity
                            options:UIViewAnimationOptionBeginFromCurrentState
                         animations:animations
                         completion:self.endBlock];
    } else {
        UIViewAnimationOptions options =
        UIViewAnimationOptionBeginFromCurrentState | UIViewAnimationOptionsFromHMAnimationType(self.animationType);
        
        [UIView animateWithDuration:self.duration
                              delay:self.delay
                            options:options
                         animations:animations
                         completion:self.endBlock];
    }
}

- (void)stopAnimation {
    
    [self.animatedView.layer removeAnimationForKey:self.animationKey];
}


@synthesize springDamping;
@synthesize repeatCount;
@synthesize initialVelocity;
@synthesize duration;
@synthesize delay;
@synthesize animatedView;
@synthesize endBlock;
@synthesize startBlock;
@synthesize animationKeyPath;
@synthesize animationKey;
@synthesize easing;

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
