//
//  UIView+HMDom.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMDom.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import "HMConverter.h"
#import "UIView+Hummer.h"
#import <objc/runtime.h>
#import "HMUtility.h"
#import "NSObject+Hummer.h"
#import "HMCornerRadiusModel.h"
#import "HMBorderModelCollection.h"
#import "HMSourceParser.h"
#import <Hummer/HMBorderModel.h>
#import "HMJSGlobal.h"
#import "HMImageManager.h"
#import "WeakPointerWrapper.h"
#import "HMAttrManager.h"
#import "HMYogaConfig.h"
#import "HMGradientColor.h"
#import "UIView+HMRenderObject.h"
#import "HMAnimationManager.h"
#import "HMLayoutUtils.h"
#import "HMTransitionAnimation.h"
#import "UIView+HMImageLoader.h"
#import "NSObject+Hummer.h"
#import "UIView+HMAttribute.h"


NS_ASSUME_NONNULL_BEGIN

static NSString *const BASE64HEADERPREFIX = @"data:";
@interface UIView ()

@property (nonatomic, nullable, strong) HMBaseValue *hmAccessible;

@property (nonatomic, nullable, strong) HMBaseValue *hmAccessibilityLabel;

@property (nonatomic, nullable, strong) HMBaseValue *hmAccessibilityHint;

@property (nonatomic, nullable, strong) HMBaseValue *hmAccessibilityRole;

@property (nonatomic, nullable, strong) HMBaseValue *hmAccessibilityState;

@end
NS_ASSUME_NONNULL_END

@implementation UIView (HMDom)

- (HMBaseValue *)hmAccessible {
    return [HMBaseValue valueWithBool:self.isAccessibilityElement inContext:self.hmContext];
}

- (void)setHmAccessible:(HMBaseValue *)accessible {
    self.isAccessibilityElement = accessible.toBool;
}

HM_EXPORT_PROPERTY(accessible, hmAccessible, setHmAccessible:)

- (HMBaseValue *)hmAccessibilityLabel {
    return [HMBaseValue valueWithObject:self.accessibilityLabel inContext:self.hmContext];
}

- (void)setHmAccessibilityLabel:(HMBaseValue *)hmAccessibilityLabel {
    self.accessibilityLabel = hmAccessibilityLabel.toString;
}

HM_EXPORT_PROPERTY(accessibilityLabel, hmAccessibilityLabel, setHmAccessibilityLabel:)

- (HMBaseValue *)hmAccessibilityHint {
    return [HMBaseValue valueWithObject:self.accessibilityHint inContext:self.hmContext];
}

- (void)setHmAccessibilityHint:(HMBaseValue *)hmAccessibilityHint {
    self.accessibilityHint = hmAccessibilityHint.toString;
}

HM_EXPORT_PROPERTY(accessibilityHint, hmAccessibilityHint, setHmAccessibilityHint:)

- (HMBaseValue *)hmAccessibilityRole {
    return [HMBaseValue valueWithUndefinedInContext:self.hmContext];
}

- (void)setHmAccessibilityRole:(HMBaseValue *)accessibilityRole {
    id json = accessibilityRole.toObject;
    const UIAccessibilityTraits AccessibilityRolesMask = UIAccessibilityTraitNone | UIAccessibilityTraitButton | UIAccessibilityTraitLink | UIAccessibilityTraitSearchField | UIAccessibilityTraitImage | UIAccessibilityTraitKeyboardKey | UIAccessibilityTraitStaticText | UIAccessibilityTraitAdjustable | UIAccessibilityTraitHeader | UIAccessibilityTraitSummaryElement | HummerSwitchAccessibilityTrait;
    // 清空
    self.accessibilityTraits &= ~AccessibilityRolesMask;
    UIAccessibilityTraits newTraits = json ? [HMConverter UIAccessibilityTraits:json] : UIAccessibilityTraitNone;
    if (newTraits != UIAccessibilityTraitNone) {
      UIAccessibilityTraits maskedTraits = newTraits & AccessibilityRolesMask;
      self.accessibilityTraits |= maskedTraits;
    }
}

HM_EXPORT_PROPERTY(accessibilityRole, hmAccessibilityRole, setHmAccessibilityRole:)

- (HMBaseValue *)hmAccessibilityState {
    return [HMBaseValue valueWithUndefinedInContext:self.hmContext];
}

- (void)setHmAccessibilityState:(HMBaseValue *)accessibilityState {
    id json = accessibilityState.toObject;
    NSDictionary<NSString *, id> *state = json ? [HMConverter NSDictionary:json] : nil;
    NSMutableDictionary<NSString *, id> *newState = [[NSMutableDictionary<NSString *, id> alloc] init];
    
    if (!state) {
        return;
    }
    
    const UIAccessibilityTraits AccessibilityStatesMask = UIAccessibilityTraitNotEnabled | UIAccessibilityTraitSelected;
    self.accessibilityTraits = self.accessibilityTraits & ~AccessibilityStatesMask;
    
    for (NSString *s in state) {
        id val = [state objectForKey:s];
        if (!val) {
            continue;
        }
        if ([s isEqualToString:@"selected"] && [val isKindOfClass:[NSNumber class]] && [val boolValue]) {
            self.accessibilityTraits |= UIAccessibilityTraitSelected;
        } else if ([s isEqualToString:@"disabled"] && [val isKindOfClass:[NSNumber class]] && [val boolValue]) {
            self.accessibilityTraits |= UIAccessibilityTraitNotEnabled;
        } else {
            newState[s] = val;
        }
    }
    if (newState.count > 0) {
        // Post a layout change notification to make sure VoiceOver get notified for the state
        // changes that don't happen upon users' click.
        UIAccessibilityPostNotification(UIAccessibilityLayoutChangedNotification, nil);
    }
}

HM_EXPORT_PROPERTY(accessibilityState, hmAccessibilityState, setHmAccessibilityState:)

HM_EXPORT_PROPERTY(style, hm_style, hm_setStyle:)

HM_EXPORT_PROPERTY(viewID, hm_viewID, hm_setViewID:)

HM_EXPORT_PROPERTY(enabled, hm_enabled, hm_setEnabled:)

HM_EXPORT_METHOD(getRect, hm_getRect:)

HM_EXPORT_METHOD(appendChild, hm_addSubview:)

HM_EXPORT_METHOD(removeChild, hm_removeSubview:)

HM_EXPORT_METHOD(removeAll, hm_removeAllSubviews)

HM_EXPORT_METHOD(insertBefore, hm_insertBefore:
    withNode:)

HM_EXPORT_METHOD(replaceChild, hm_replaceSubview:
    withNode:)

HM_EXPORT_METHOD(getElementById, hm_getSubViewByID:)

HM_EXPORT_METHOD(layout, hm_layoutRootView)


- (NSMapTable<UIView * , HMBaseValue *> *)hm_jsValueLifeContainer {
    
    NSMapTable<UIView * , HMBaseValue *> *store = objc_getAssociatedObject(self, _cmd);
    if (!store) {
        store = [NSMapTable mapTableWithKeyOptions:NSPointerFunctionsWeakMemory valueOptions:NSPointerFunctionsStrongMemory];
        objc_setAssociatedObject(self, _cmd, store, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return store;
}
- (CAShapeLayer *)hm_borderTopLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderTopLayer:(CAShapeLayer *)hm_borderTopLayer {
    objc_setAssociatedObject(self, @selector(hm_borderTopLayer), hm_borderTopLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_borderRightLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderRightLayer:(CAShapeLayer *)hm_borderRightLayer {
    objc_setAssociatedObject(self, @selector(hm_borderRightLayer), hm_borderRightLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_borderBottomLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderBottomLayer:(CAShapeLayer *)hm_borderBottomLayer {
    objc_setAssociatedObject(self, @selector(hm_borderBottomLayer), hm_borderBottomLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_borderLeftLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderLeftLayer:(CAShapeLayer *)hm_borderLeftLayer {
    objc_setAssociatedObject(self, @selector(hm_borderLeftLayer), hm_borderLeftLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)hm_isMasksToBoundsOptimization {
    NSNumber *isMasksToBoundsOptimization = objc_getAssociatedObject(self, _cmd);

    return isMasksToBoundsOptimization.boolValue;
}

- (void)setHm_isMasksToBoundsOptimization:(BOOL)hm_isMasksToBoundsOptimization {
    objc_setAssociatedObject(self, @selector(hm_isMasksToBoundsOptimization), hm_isMasksToBoundsOptimization ? @YES : nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)hm_isFixedPosition {
    NSNumber *isFixedPosition = objc_getAssociatedObject(self, _cmd);

    return isFixedPosition.boolValue;
}

- (void)setHm_isFixedPosition:(BOOL)hm_isFixedPosition {
    objc_setAssociatedObject(self, @selector(hm_isFixedPosition), hm_isFixedPosition ? @YES : nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (UIView *)hm_fixedPositionLastContainerView {
    WeakPointerWrapper *weakPointerWrapper = objc_getAssociatedObject(self, _cmd);

    if (!weakPointerWrapper.value) {
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }

    return weakPointerWrapper.value;
}

- (void)setHm_fixedPositionLastContainerView:(UIView *)hm_fixedPositionLastContainerView {
    if (!hm_fixedPositionLastContainerView) {
        objc_setAssociatedObject(self, @selector(hm_fixedPositionLastContainerView), nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    } else {
        WeakPointerWrapper<UIView *> *weakPointerWrapper = objc_getAssociatedObject(self, @selector(hm_fixedPositionLastContainerView));
        if (!weakPointerWrapper) {
            weakPointerWrapper = [[WeakPointerWrapper alloc] init];
            objc_setAssociatedObject(self, @selector(hm_fixedPositionLastContainerView), weakPointerWrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        }
        weakPointerWrapper.value = hm_fixedPositionLastContainerView;
    }
}

- (CAShapeLayer *)hm_backgroundColorShapeLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_backgroundColorShapeLayer:(CAShapeLayer *)hm_backgroundColorShapeLayer {
    objc_setAssociatedObject(self, @selector(hm_backgroundColorShapeLayer), hm_backgroundColorShapeLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_backgroundColorMaskLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_backgroundColorMaskLayer:(CAShapeLayer *)hm_backgroundColorMaskLayer {
    objc_setAssociatedObject(self, @selector(hm_backgroundColorMaskLayer), hm_backgroundColorMaskLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSDictionary<NSString *, NSObject *> *)hm_styleStore {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_styleStore:(NSDictionary<NSString *, NSObject *> *)hmStyleStore {
    objc_setAssociatedObject(self, @selector(hm_styleStore), hmStyleStore, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (HMTransitionAnimation *)hm_transitionAnimation {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_transitionAnimation:(HMTransitionAnimation *)hm_transitionAnimation {
    objc_setAssociatedObject(self, @selector(hm_transitionAnimation), hm_transitionAnimation, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_maskLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_maskLayer:(CAShapeLayer *)hm_maskLayer {
    objc_setAssociatedObject(self, @selector(hm_maskLayer), hm_maskLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAGradientLayer *)hm_gradientLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_gradientLayer:(CAGradientLayer *)hm_gradientLayer {
    objc_setAssociatedObject(self, @selector(hm_gradientLayer), hm_gradientLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (HMBorderModelCollection *)hm_borderModelCollection {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderModelCollection:(HMBorderModelCollection *)hm_borderModelCollection {
    objc_setAssociatedObject(self, @selector(hm_borderModelCollection), hm_borderModelCollection, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (HMCornerRadiusModel *)hm_cornerRadiusModel {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_cornerRadiusModel:(HMCornerRadiusModel *)hm_cornerRadiusModel {
    objc_setAssociatedObject(self, @selector(hm_cornerRadiusModel), hm_cornerRadiusModel, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (void)hm_fallbackWithBorderModelCollection:(HMBorderModelCollection *)borderModelCollection {
    // 回退机制
    if ([borderModelCollection.top isEqualToModel:borderModelCollection.right] && [borderModelCollection.right isEqualToModel:borderModelCollection.bottom] && [borderModelCollection.bottom isEqualToModel:borderModelCollection.left]) {
        if (borderModelCollection.top.borderStyle == HMBorderStyleSolid && borderModelCollection.top.borderWidth > 0) {
            self.layer.borderColor = borderModelCollection.top.borderColor.CGColor;
            self.layer.borderWidth = borderModelCollection.top.borderWidth;
            self.hm_borderModelCollection = nil;

            return;
        } else if (borderModelCollection.top.borderStyle == HMBorderStyleNone && borderModelCollection.top.borderWidth == 0) {
            self.hm_borderModelCollection = nil;
            self.layer.borderColor = borderModelCollection.top.borderColor.CGColor;
            self.layer.borderWidth = 0;

            return;
        }
    }
    self.hm_borderModelCollection = borderModelCollection;
    self.layer.borderWidth = 0;
    self.layer.borderColor = nil;
}

- (void)hm_saveBorderStyleWithTop:(NSNumber *)top right:(NSNumber *)right bottom:(NSNumber *)bottom left:(NSNumber *)left {
    HMBorderModelCollection *borderModelCollection = self.hm_borderModelCollection;
    if (!borderModelCollection) {
        borderModelCollection = [self hm_createBorderModelCollection];
    }
    if (top) {
        borderModelCollection.top.borderStyle = (HMBorderStyle) top.unsignedIntegerValue;
    }
    if (right) {
        borderModelCollection.right.borderStyle = (HMBorderStyle) right.unsignedIntegerValue;
    }
    if (bottom) {
        borderModelCollection.bottom.borderStyle = (HMBorderStyle) bottom.unsignedIntegerValue;
    }
    if (left) {
        borderModelCollection.left.borderStyle = (HMBorderStyle) left.unsignedIntegerValue;
    }
    [self hm_fallbackWithBorderModelCollection:borderModelCollection];
    [self hm_updateBorder];
}

- (void)hm_saveBorderColorWithTop:(UIColor *)top right:(UIColor *)right bottom:(UIColor *)bottom left:(UIColor *)left {
    HMBorderModelCollection *borderModelCollection = self.hm_borderModelCollection;
    if (!borderModelCollection) {
        borderModelCollection = [self hm_createBorderModelCollection];
    }
    if (top) {
        borderModelCollection.top.borderColor = top;
    }
    if (right) {
        borderModelCollection.right.borderColor = right;
    }
    if (bottom) {
        borderModelCollection.bottom.borderColor = bottom;
    }
    if (left) {
        borderModelCollection.left.borderColor = left;
    }
    [self hm_fallbackWithBorderModelCollection:borderModelCollection];
    [self hm_updateBorder];
}

- (void)hm_saveBorderWidthWithTop:(NSNumber *)top right:(NSNumber *)right bottom:(NSNumber *)bottom left:(NSNumber *)left {
    HMBorderModelCollection *borderModelCollection = self.hm_borderModelCollection;
    if (!borderModelCollection) {
        borderModelCollection = [self hm_createBorderModelCollection];
    }
    if (top) {
        borderModelCollection.top.borderWidth = top.doubleValue;
    }
    if (right) {
        borderModelCollection.right.borderWidth = right.doubleValue;
    }
    if (bottom) {
        borderModelCollection.bottom.borderWidth = bottom.doubleValue;
    }
    if (left) {
        borderModelCollection.left.borderWidth = left.doubleValue;
    }
    [self hm_fallbackWithBorderModelCollection:borderModelCollection];
    [self hm_updateBorder];
}

- (void)hm_saveCornerRadiusWithTopLeft:(NSNumber *)topLeft topRight:(NSNumber *)topRight bottomLeft:(NSNumber *)bottomLeft bottomRight:(NSNumber *)bottomRight {
    HMCornerRadiusModel *cornerRadiusModel = nil;
    if (self.hm_cornerRadiusModel) {
        // 原先已经是多角
        cornerRadiusModel = self.hm_cornerRadiusModel;
    } else {
        // 原先是单角
        cornerRadiusModel = [[HMCornerRadiusModel alloc] init];
        cornerRadiusModel.topLeft = self.layer.cornerRadius;
        cornerRadiusModel.topRight = self.layer.cornerRadius;
        cornerRadiusModel.bottomLeft = self.layer.cornerRadius;
        cornerRadiusModel.bottomRight = self.layer.cornerRadius;
    }

    if (topLeft) {
        cornerRadiusModel.topLeft = topLeft.doubleValue;
    }
    if (topRight) {
        cornerRadiusModel.topRight = topRight.doubleValue;
    }
    if (bottomLeft) {
        cornerRadiusModel.bottomLeft = bottomLeft.doubleValue;
    }
    if (bottomRight) {
        cornerRadiusModel.bottomRight = bottomRight.doubleValue;
    }

    if (hm_doubleEqual(cornerRadiusModel.topLeft, cornerRadiusModel.topRight) && hm_doubleEqual(cornerRadiusModel.topRight, cornerRadiusModel.bottomRight) && hm_doubleEqual(cornerRadiusModel.bottomRight, cornerRadiusModel.bottomLeft)) {
        // 转单角
        self.layer.cornerRadius = cornerRadiusModel.topLeft;
        self.hm_cornerRadiusModel = nil;
    } else {
        // 转多角
        self.layer.cornerRadius = 0;
        self.hm_cornerRadiusModel = cornerRadiusModel;
    }
    // 不使用 setNeedsLayout
    [self hm_updateMasksToBounds];
    [self hm_updateBackgroundColor];
    [self hm_updateShadow];
    [self hm_updateBorder];
}

- (void)hm_performBackgroundColorWithBackgroundColor:(nullable UIColor *)backgroundColor {
    if (backgroundColor) {
        // 有颜色
        // 1. 有 layer 更新 layer 颜色
        // 2. 没有则更新 backgroundColor
        if (self.hm_backgroundColorShapeLayer) {
            self.hm_backgroundColorShapeLayer.fillColor = backgroundColor.CGColor;
        } else {
            self.backgroundColor = backgroundColor;
        }
        // 3. 移除渐变色
        [self.hm_gradientLayer removeFromSuperlayer];
        self.hm_gradientLayer = nil;
    } else {
        // 没有颜色
        // 1. 移除 layer
        [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
        self.hm_backgroundColorShapeLayer = nil;
        // 2. 设置 nil 背景色
        self.backgroundColor = nil;
    }

    // 不使用 setNeedsLayout
    [self hm_updateBackgroundColor];
}

- (void)hm_performGradientColorWithGradientColor:(nullable HMGradientColor *)gradientColor {
    if (gradientColor) {
        self.backgroundColor = nil;
        [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
        self.hm_backgroundColorShapeLayer = nil;
        if (!self.hm_gradientLayer) {
            self.hm_gradientLayer = CAGradientLayer.layer;
            [self.layer insertSublayer:self.hm_gradientLayer atIndex:0];
        }
        [CATransaction begin];
        [CATransaction setDisableActions:YES];
        self.hm_gradientLayer.colors = @[(id) gradientColor.beginColor.CGColor, (id) gradientColor.endColor.CGColor];
        self.hm_gradientLayer.startPoint = gradientColor.beginPoint;
        self.hm_gradientLayer.endPoint = gradientColor.endPoint;
        [CATransaction commit];
    } else {
        [self.hm_gradientLayer removeFromSuperlayer];
        self.hm_gradientLayer = nil;
    }
    // 不使用 setNeedsLayout
    [self hm_updateBackgroundColor];
}

- (HMBorderModelCollection *)hm_createBorderModelCollection {
    HMBorderModelCollection *borderModelCollection = [[HMBorderModelCollection alloc] init];
    borderModelCollection.top = [[HMBorderModel alloc] init];
    borderModelCollection.top.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.top.borderStyle = HMBorderStyleSolid;
    borderModelCollection.top.borderWidth = self.layer.borderWidth;

    borderModelCollection.right = [[HMBorderModel alloc] init];
    borderModelCollection.right.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.right.borderStyle = HMBorderStyleSolid;
    borderModelCollection.right.borderWidth = self.layer.borderWidth;

    borderModelCollection.bottom = [[HMBorderModel alloc] init];
    borderModelCollection.bottom.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.bottom.borderStyle = HMBorderStyleSolid;
    borderModelCollection.bottom.borderWidth = self.layer.borderWidth;

    borderModelCollection.left = [[HMBorderModel alloc] init];
    borderModelCollection.left.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.left.borderStyle = HMBorderStyleSolid;
    borderModelCollection.left.borderWidth = self.layer.borderWidth;

    self.layer.borderColor = nil;
    self.layer.borderWidth = 0;

    return borderModelCollection;
}

- (UIBezierPath *)hm_createCornerRadiusPath {
    if (!self.hm_cornerRadiusModel) {
        return [UIBezierPath bezierPathWithRoundedRect:self.layer.bounds cornerRadius:self.layer.cornerRadius];
    } else {
        // 多角路径
        // 需要考虑高度是否够，宽度是否够
        // startAngle 是 PI + asin(delta_h / r)
        // endAngle 是 1.5 PI - asin(delta_w / r)
        UIBezierPath *bezierPath = UIBezierPath.bezierPath;
        double topLeftStartAngle = M_PI;
        double topLeftEndAngle = M_PI_2 * 3;
        double topRightStartAngle = M_PI_2 * 3;
        double topRightEndAngle = M_PI * 2;
        double bottomRightStartAngle = 0;
        double bottomRightEndAngle = M_PI_2;
        double bottomLeftStartAngle = M_PI_2;
        double bottomLeftEndAngle = M_PI;
        // 左
        double deltaLeft = self.bounds.size.height - self.hm_cornerRadiusModel.topLeft - self.hm_cornerRadiusModel.bottomLeft;
        if (deltaLeft < 0) {
            double topLeftRate = self.hm_cornerRadiusModel.topLeft / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.bottomLeft);
            double bottomLeftRate = self.hm_cornerRadiusModel.bottomLeft / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.bottomLeft);
            double topLeftDeltaHeight = topLeftRate * -deltaLeft;
            double bottomLeftDeltaHeight = bottomLeftRate * -deltaLeft;
            topLeftStartAngle += asin(topLeftDeltaHeight / self.hm_cornerRadiusModel.topLeft);
            bottomLeftEndAngle -= asin(bottomLeftDeltaHeight / self.hm_cornerRadiusModel.bottomLeft);
        }
        // 上
        double deltaTop = self.bounds.size.width - self.hm_cornerRadiusModel.topLeft - self.hm_cornerRadiusModel.topRight;
        if (deltaTop < 0) {
            double topLeftRate = self.hm_cornerRadiusModel.topLeft / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.topRight);
            double topRightRate = self.hm_cornerRadiusModel.topRight / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.topRight);
            double topLeftDeltaWidth = -deltaTop * topLeftRate;
            double topRightDeltaWidth = -deltaTop * topRightRate;
            topLeftEndAngle -= asin(topLeftDeltaWidth / self.hm_cornerRadiusModel.topLeft);
            topRightStartAngle += asin(topRightDeltaWidth / self.hm_cornerRadiusModel.topRight);
        }
        // 上左角
        [bezierPath addArcWithCenter:CGPointMake(self.hm_cornerRadiusModel.topLeft+self.bounds.origin.x, self.hm_cornerRadiusModel.topLeft+self.bounds.origin.y) radius:self.hm_cornerRadiusModel.topLeft startAngle:topLeftStartAngle endAngle:topLeftEndAngle clockwise:YES];
        // 右
        double deltaRight = self.bounds.size.height - self.hm_cornerRadiusModel.topRight - self.hm_cornerRadiusModel.bottomRight;
        if (deltaRight < 0) {
            double bottomRightRate = self.hm_cornerRadiusModel.bottomRight / (self.hm_cornerRadiusModel.topRight + self.hm_cornerRadiusModel.bottomRight);
            double topRightRate = self.hm_cornerRadiusModel.topRight / (self.hm_cornerRadiusModel.topRight + self.hm_cornerRadiusModel.bottomRight);
            double topRightDeltaHeight = topRightRate * -deltaRight;
            double bottomRightDeltaHeight = bottomRightRate * -deltaRight;
            topRightEndAngle -= asin(topRightDeltaHeight / self.hm_cornerRadiusModel.topRight);
            bottomRightStartAngle += asin(bottomRightDeltaHeight / self.hm_cornerRadiusModel.bottomRight);
        }
        // 上右角
        [bezierPath addArcWithCenter:CGPointMake(self.bounds.size.width - self.hm_cornerRadiusModel.topRight+self.bounds.origin.x, self.hm_cornerRadiusModel.topRight+self.bounds.origin.y) radius:self.hm_cornerRadiusModel.topRight startAngle:topRightStartAngle endAngle:topRightEndAngle clockwise:YES];
        // 下
        double deltaBottom = self.bounds.size.width - self.hm_cornerRadiusModel.bottomLeft - self.hm_cornerRadiusModel.bottomRight;
        if (deltaBottom < 0) {
            double bottomRightRate = self.hm_cornerRadiusModel.bottomRight / (self.hm_cornerRadiusModel.bottomLeft + self.hm_cornerRadiusModel.bottomRight);
            double bottomLeftRate = self.hm_cornerRadiusModel.bottomLeft / (self.hm_cornerRadiusModel.bottomLeft + self.hm_cornerRadiusModel.bottomRight);
            double bottomLeftDeltaWidth = bottomLeftRate * -deltaBottom;
            double bottomRightDeltaWidth = bottomRightRate * -deltaBottom;
            bottomRightEndAngle -= asin(bottomRightDeltaWidth / self.hm_cornerRadiusModel.bottomRight);
            bottomLeftStartAngle += asin(bottomLeftDeltaWidth / self.hm_cornerRadiusModel.bottomLeft);
        }
        // 右下角
        [bezierPath addArcWithCenter:CGPointMake(self.bounds.size.width - self.hm_cornerRadiusModel.bottomRight+self.bounds.origin.x, self.bounds.size.height - self.hm_cornerRadiusModel.bottomRight+self.bounds.origin.y) radius:self.hm_cornerRadiusModel.bottomRight startAngle:bottomRightStartAngle endAngle:bottomRightEndAngle clockwise:YES];
        // 左下角
        [bezierPath addArcWithCenter:CGPointMake(self.hm_cornerRadiusModel.bottomLeft+self.bounds.origin.x, self.bounds.size.height - self.hm_cornerRadiusModel.bottomLeft+self.bounds.origin.y) radius:self.hm_cornerRadiusModel.bottomLeft startAngle:bottomLeftStartAngle endAngle:bottomLeftEndAngle clockwise:YES];

        return bezierPath;
    }
}

#pragma clang diagnostic push
#pragma ide diagnostic ignored "InfiniteRecursion"

#pragma clang diagnostic pop

- (void)hm_layoutYogaRootView {
    NSAssert(NSThread.isMainThread, @"必须是主线程");
    // 如果本视图位于 Yoga 视图树中
    // isYogaEnabled 防止多余 YGLayout 创建
    if (self.isHmLayoutEnabled) {
        NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
        [self hm_applyLayoutPreservingOrigin:YES affectedShadowViews:affectedShadowViews];
        [HMAnimationManager notifyStartAnimation];
        if (affectedShadowViews.count > 0) {
            NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;
            id<HMLayoutStyleProtocol> value = nil;
            while ((value = enumerator.nextObject)) {
                [value.view hm_layoutBackgroundColorImageBorderShadowCornerRadius];
            }
        }
    }
}

- (void)hm_updateMasksToBounds {
    // 针对 Hummer overflow attribute 的优化支持
    // TODO(唐佳诚): 缺少 remove 机制，后续优化，不确定是否 clipsToBounds 是否会触发 layoutSubviews，但是实际上不碍事，猜测应当是不会触发的
    if (self.clipsToBounds && !self.layer.mask) {
        self.hm_maskLayer = CAShapeLayer.layer;
        self.layer.mask = self.hm_maskLayer;
        self.clipsToBounds = NO;
        self.hm_isMasksToBoundsOptimization = YES;
    }
    [self hm_layoutMaskView];
}

- (void)hm_updateBorder {
    // 1. 多角情况，一个边框 -> 多个边框
    if (self.hm_cornerRadiusModel && self.layer.borderWidth > 0 && self.layer.borderColor) {
        self.hm_borderModelCollection = [self hm_createBorderModelCollection];
        self.layer.borderWidth = 0;
        self.layer.borderColor = nil;
    }
    // 2. 多个边框，实际上等同，并且为 HMBorderStyleSolid，单角情况 -> 回退为一个边框
    if ([self.hm_borderModelCollection.top isEqualToModel:self.hm_borderModelCollection.right] && [self.hm_borderModelCollection.right isEqualToModel:self.hm_borderModelCollection.bottom] && [self.hm_borderModelCollection.bottom isEqualToModel:self.hm_borderModelCollection.left] && self.hm_borderModelCollection.top.borderStyle == HMBorderStyleSolid && !self.hm_cornerRadiusModel) {
        self.layer.borderWidth = self.hm_borderModelCollection.top.borderWidth;
        self.layer.borderColor = self.hm_borderModelCollection.top.borderColor.CGColor;
    }

    if (self.hm_borderModelCollection) {
        if ([self.hm_borderModelCollection.top isShowBorder] && !self.hm_borderTopLayer) {
            self.hm_borderTopLayer = CAShapeLayer.layer;
            self.hm_borderTopLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderTopLayer];
        }
        if (self.hm_borderTopLayer) {
            self.hm_borderTopLayer.lineWidth = self.hm_borderModelCollection.top.borderWidth;
            self.hm_borderTopLayer.strokeColor = self.hm_borderModelCollection.top.borderColor.CGColor;
            self.hm_borderTopLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.top.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderTopLayer.lineDashPattern = @[@(self.hm_borderModelCollection.top.borderWidth * 3), @(self.hm_borderModelCollection.top.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderTopLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.top.borderWidth * 2)];
                    self.hm_borderTopLayer.lineCap = kCALineCapRound;
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.top isShowBorder] && self.hm_borderTopLayer) {
            [self.hm_borderTopLayer removeFromSuperlayer];
            self.hm_borderTopLayer = nil;
        }
        if ([self.hm_borderModelCollection.right isShowBorder] && !self.hm_borderRightLayer) {
            self.hm_borderRightLayer = CAShapeLayer.layer;
            self.hm_borderRightLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderRightLayer];
        }
        if (self.hm_borderRightLayer) {
            self.hm_borderRightLayer.lineWidth = self.hm_borderModelCollection.right.borderWidth;
            self.hm_borderRightLayer.strokeColor = self.hm_borderModelCollection.right.borderColor.CGColor;
            self.hm_borderRightLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.right.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderRightLayer.lineDashPattern = @[@(self.hm_borderModelCollection.right.borderWidth * 3), @(self.hm_borderModelCollection.right.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderRightLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.right.borderWidth * 2)];
                    self.hm_borderRightLayer.lineCap = kCALineCapRound;
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.right isShowBorder] && self.hm_borderRightLayer) {
            [self.hm_borderRightLayer removeFromSuperlayer];
            self.hm_borderRightLayer = nil;
        }
        if ([self.hm_borderModelCollection.bottom isShowBorder] && !self.hm_borderBottomLayer) {
            self.hm_borderBottomLayer = CAShapeLayer.layer;
            self.hm_borderBottomLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderBottomLayer];
        }
        if (self.hm_borderBottomLayer) {
            self.hm_borderBottomLayer.lineWidth = self.hm_borderModelCollection.bottom.borderWidth;
            self.hm_borderBottomLayer.strokeColor = self.hm_borderModelCollection.bottom.borderColor.CGColor;
            self.hm_borderBottomLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.bottom.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderBottomLayer.lineDashPattern = @[@(self.hm_borderModelCollection.bottom.borderWidth * 3), @(self.hm_borderModelCollection.bottom.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderBottomLayer.lineCap = kCALineCapRound;
                    self.hm_borderBottomLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.bottom.borderWidth * 2)];
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.bottom isShowBorder] && self.hm_borderBottomLayer) {
            [self.hm_borderBottomLayer removeFromSuperlayer];
            self.hm_borderBottomLayer = nil;
        }
        if ([self.hm_borderModelCollection.left isShowBorder] && !self.hm_borderLeftLayer) {
            self.hm_borderLeftLayer = CAShapeLayer.layer;
            self.hm_borderLeftLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderLeftLayer];
        }
        if (self.hm_borderLeftLayer) {
            self.hm_borderLeftLayer.lineWidth = self.hm_borderModelCollection.left.borderWidth;
            self.hm_borderLeftLayer.strokeColor = self.hm_borderModelCollection.left.borderColor.CGColor;
            self.hm_borderLeftLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.left.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderLeftLayer.lineDashPattern = @[@(self.hm_borderModelCollection.left.borderWidth * 3), @(self.hm_borderModelCollection.left.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderLeftLayer.lineCap = kCALineCapRound;
                    self.hm_borderLeftLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.left.borderWidth * 2)];
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.left isShowBorder] && self.hm_borderLeftLayer) {
            [self.hm_borderLeftLayer removeFromSuperlayer];
            self.hm_borderLeftLayer = nil;
        }
    } else {
        if (self.hm_borderTopLayer) {
            [self.hm_borderTopLayer removeFromSuperlayer];
            self.hm_borderTopLayer = nil;
        }
        if (self.hm_borderRightLayer) {
            [self.hm_borderRightLayer removeFromSuperlayer];
            self.hm_borderRightLayer = nil;
        }
        if (self.hm_borderBottomLayer) {
            [self.hm_borderBottomLayer removeFromSuperlayer];
            self.hm_borderBottomLayer = nil;
        }
        if (self.hm_borderLeftLayer) {
            [self.hm_borderLeftLayer removeFromSuperlayer];
            self.hm_borderLeftLayer = nil;
        }
    }

    [self hm_layoutBorder];
}

- (void)hm_layoutBorder {
    if (self.hm_borderTopLayer) {
        [self.hm_borderLeftLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderLeftLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderRightLayer) {
        [self.hm_borderRightLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderRightLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderBottomLayer) {
        [self.hm_borderBottomLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderBottomLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderLeftLayer) {
        [self.hm_borderLeftLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderLeftLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderModelCollection) {
        CGFloat topLeftRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.topLeft : self.layer.cornerRadius;
        CGFloat topRightRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.topLeft : self.layer.cornerRadius;
        CGFloat bottomRightRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.bottomRight : self.layer.cornerRadius;
        CGFloat bottomLeftRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.bottomLeft : self.layer.cornerRadius;
        if (self.hm_borderTopLayer) {
            CGFloat topBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.top.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaTop = self.bounds.size.width - topLeftRadius - topRightRadius;
            if (deltaTop > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(topLeftRadius, topBorderWidth / 2)];
                [bezierPath addLineToPoint:CGPointMake(topLeftRadius + deltaTop, topBorderWidth / 2)];
                self.hm_borderTopLayer.path = bezierPath.CGPath;
            }
        }
        if (self.hm_borderRightLayer) {
            CGFloat rightBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.right.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaRight = self.bounds.size.height - topRightRadius - bottomRightRadius;
            if (deltaRight > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(self.bounds.size.width - rightBorderWidth / 2, topRightRadius)];
                [bezierPath addLineToPoint:CGPointMake(self.bounds.size.width - rightBorderWidth / 2, topRightRadius + deltaRight)];
                self.hm_borderRightLayer.path = bezierPath.CGPath;
            }
        }
        if (self.hm_borderBottomLayer) {
            CGFloat bottomBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.bottom.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaBottom = self.bounds.size.width - bottomRightRadius - bottomLeftRadius;
            if (deltaBottom > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(bottomLeftRadius + deltaBottom, self.bounds.size.height - bottomBorderWidth / 2)];
                [bezierPath addLineToPoint:CGPointMake(bottomLeftRadius, self.bounds.size.height - bottomBorderWidth / 2)];
                self.hm_borderBottomLayer.path = bezierPath.CGPath;
            }
        }
        if (self.hm_borderLeftLayer) {
            CGFloat leftBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.left.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaLeft = self.bounds.size.height - topLeftRadius - bottomLeftRadius;
            if (deltaLeft > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(leftBorderWidth / 2, topLeftRadius + deltaLeft)];
                [bezierPath addLineToPoint:CGPointMake(leftBorderWidth / 2, topLeftRadius)];
                self.hm_borderLeftLayer.path = bezierPath.CGPath;
            }
        }
    }
}

- (void)hm_layoutMaskView {
    if (self.hm_maskLayer) {
        // TODO(唐佳诚): 性能优化
        self.hm_maskLayer.path = [self hm_createCornerRadiusPath].CGPath;
    }
}

- (void)hm_layoutBackgroundColorImageBorderShadowCornerRadius {
    [self hm_updateMasksToBounds];
    [self hm_layoutBackgroundColor];
    [self hm_updateShadow];
    [self hm_layoutBorder];
}

- (void)hm_layoutBackgroundColor {
    if (self.hm_gradientLayer) {
        [CATransaction begin];
        [CATransaction setDisableActions:YES];
        self.hm_gradientLayer.frame = self.bounds;
        [CATransaction commit];
    }
    if (self.hm_backgroundColorShapeLayer) {
        if (self.layer.sublayers.firstObject != self.hm_backgroundColorShapeLayer) {
            [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
            [self.layer insertSublayer:self.hm_backgroundColorShapeLayer atIndex:0];
        }
        // TODO(唐佳诚): 性能优化
        self.hm_backgroundColorShapeLayer.path = [self hm_createCornerRadiusPath].CGPath;
    }
    if (self.hm_backgroundColorMaskLayer) {
        // TODO(唐佳诚): 性能优化
        self.hm_backgroundColorMaskLayer.path = [self hm_createCornerRadiusPath].CGPath;
    }
}

- (void)hm_updateBackgroundColor {
    // 没有渐变色的时候移除渐变色背景的 hm_maskLayer
    if (!self.hm_gradientLayer && self.hm_backgroundColorMaskLayer) {
        [self.hm_backgroundColorMaskLayer removeFromSuperlayer];
        self.hm_backgroundColorMaskLayer = nil;
    }
    // 1. 纯色 + cornerRadius -> 不需要处理
    // 2. 纯色 + path -> CAShapeLayer
    // 2.1 创建条件 -> backgroundColor 转化 layer 情况
    if (self.hm_cornerRadiusModel && self.backgroundColor && !self.hm_backgroundColorShapeLayer) {
        CAShapeLayer *backgroundColorShapeLayer = CAShapeLayer.layer;
        backgroundColorShapeLayer.fillColor = self.backgroundColor.CGColor;
        self.hm_backgroundColorShapeLayer = backgroundColorShapeLayer;
        self.backgroundColor = nil;
        [self.layer insertSublayer:backgroundColorShapeLayer atIndex:0];
    }
    // 2.2 其他销毁条件 -> hm_cornerRadiusModel 消失 -> 需要回退到 backgroundColor
    if (!self.hm_cornerRadiusModel && self.hm_backgroundColorShapeLayer) {
        self.backgroundColor = [UIColor colorWithCGColor:self.hm_backgroundColorShapeLayer.fillColor];
        [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
        self.hm_backgroundColorShapeLayer = nil;
    }
    // 3. 渐变色 + cornerRadius -> CAGradientLayer + cornerRaidus
    if (self.hm_gradientLayer) {
        self.hm_gradientLayer.cornerRadius = self.layer.cornerRadius;
    }
    // 4. 渐变色 + path -> CAGradientLayer + MaskLayer
    // 4.1 创建 -> 有 CAGradientLayer，没有对应 MaskLayer，
    if (self.hm_gradientLayer && !self.hm_gradientLayer.mask) {
        self.hm_backgroundColorMaskLayer = CAShapeLayer.layer;
        self.hm_gradientLayer.mask = self.hm_backgroundColorMaskLayer;
    }
    // 4.2 销毁 -> 当前的 hm_maskLayer 和 hm_gradientLayer.mask 不同，或者没有 hm_cornerRadiusModel 了（不需要圆角了）
    if (self.hm_backgroundColorMaskLayer && (self.hm_gradientLayer.mask != self.hm_backgroundColorMaskLayer || !self.hm_cornerRadiusModel)) {
        [self.hm_backgroundColorMaskLayer removeFromSuperlayer];
        self.hm_backgroundColorMaskLayer = nil;
    }
    // 5. 纯色但是不是 CALayer，则需要 mask
    if (self.layer.class != CALayer.class) {
        if (self.backgroundColor && (self.hm_cornerRadiusModel || !hm_doubleEqual(self.layer.cornerRadius, 0))) {
            if (!self.hm_maskLayer) {
                self.hm_maskLayer = CAShapeLayer.layer;
                self.layer.mask = self.hm_maskLayer;
            }
        }
        if ((!self.backgroundColor || (!self.hm_cornerRadiusModel && hm_doubleEqual(self.layer.cornerRadius, 0))) && !self.hm_isMasksToBoundsOptimization && self.hm_maskLayer) {
            // 移除机制
            // 1. 没有背景色，并且这个 mask 不是优化添加的则移除
            // 2. 没有圆角并且不是优化添加
            [self.hm_maskLayer removeFromSuperlayer];
            self.hm_maskLayer = nil;
        }
        [self hm_layoutMaskView];
    }
    [self hm_layoutBackgroundColor];
}

- (void)hm_updateShadow {
    // 阴影离屏渲染
    if (!hm_doubleEqual(self.layer.shadowOpacity, 0)) {
        // 每次都需要重新设置 path
        // TODO(唐佳诚): 无法判断重新设置相同路径是否会触发渲染脏标记，未来需要优化实现，只有当页面布局为脏节点时候才需要重新渲染
        self.layer.shadowPath = [self hm_createCornerRadiusPath].CGPath;
    } else {
        self.layer.shadowPath = nil;
    }
}

- (NSArray<NSString *> *)hm_layoutInfoKeys {
    return @[@"top",
            @"left",
            @"bottom",
            @"right",
            @"margin",
            @"marginTop",
            @"marginLeft",
            @"marginBottom",
            @"marginRight",
            @"padding",
            @"paddingTop",
            @"paddingLeft",
            @"paddingBottom",
            @"paddingRight",
            @"width",
            @"height",
            @"minWidth",
            @"minHeight",
            @"maxWidth",
            @"maxHeight",
            @"flexDirection",
            @"flexWrap",
            @"flexFlow",
            @"justifyContent",
            @"alignItems",
            @"alignContent",
            @"order",
            @"flexGrow",
            @"flexShrink",
            @"flexBasis",
            @"flex",
            @"display",
            @"alignSelf",
            @"position",
    ];
}

- (NSArray<NSString *> *)hm_transtionInfoKeys {
    return @[
        @"transitionDelay",
        @"transitionDuration",
        @"transitionProperty",
        @"transitionTimingFunction",
    ];
}

static NSHashTable<__kindof UIView *> *viewSet = nil;

- (void)hm_layoutRootView {
    [UIView hm_layoutIfNeeded];
}

+ (void)hm_layoutIfNeeded {
    if (viewSet.count == 0) {
        return;
    }
    NSHashTable<__kindof UIView *> *rootViewSet = nil;
    NSEnumerator<__kindof UIView *> *enumerator = viewSet.objectEnumerator;
    UIView *value = nil;
    // 根视图搜索
    while ((value = enumerator.nextObject)) {
        UIView *rootView = hm_yoga_get_root_view(value);
        if (!rootViewSet) {
            rootViewSet = NSHashTable.weakObjectsHashTable;
        }
        [rootViewSet addObject:rootView];
    }
    viewSet = nil;
    enumerator = rootViewSet.objectEnumerator;
    while ((value = enumerator.nextObject)) {
        [value hm_layoutYogaRootView];
    }
}

#pragma mark - Export Property

- (void)hm_getRect:(HMFuncCallback)callBack {
    dispatch_async(dispatch_get_main_queue(), ^{
//    HMExecOnMainQueue(^{
        NSDictionary *dic = [HMLayoutUtils rectForView:self];
        HM_SafeRunBlock(callBack,@[dic]);
    });
}

- (NSNumber *)hm_enabled {
    return @(self.userInteractionEnabled);
}

- (void)hm_setEnabled:(HMBaseValue *)enabledValue {
    self.userInteractionEnabled = enabledValue.toBool;
}

- (nullable NSDictionary<NSString *, NSObject *> *)hm_style {
    return self.hm_styleStore;
}

- (void)hm_setStyle:(HMBaseValue *)style {
    id styleObject = style.toDictionary;
    NSDictionary *styleDic = nil;
    if ([styleObject isKindOfClass:NSDictionary.class]) {
        styleDic = styleObject;
    }
    if (styleDic.count == 0) {
        HMLogError(@"style 必须有键值对");

        return;
    }
    NSMutableDictionary<NSString *, NSObject *> *layoutInfo = NSMutableDictionary.dictionary;
    NSMutableDictionary<NSString *, NSObject *> *attributes = NSMutableDictionary.dictionary;
    NSMutableDictionary<NSString *, NSObject *> *transitions = NSMutableDictionary.dictionary;
    [styleDic enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        if (![key isKindOfClass:NSString.class]) {
            return;
        }
        if ([[self hm_layoutInfoKeys] containsObject:key]) {
            layoutInfo[key] = obj;
        } else if ([[self hm_transtionInfoKeys] containsObject:key]) {
            transitions[key] = obj;
        } else {
            attributes[key] = obj;
        }
    }];

    NSMutableDictionary<NSString *, NSObject *> *mutableStyleDictionary = self.hm_styleStore.mutableCopy;
    if (!mutableStyleDictionary) {
        mutableStyleDictionary = [NSMutableDictionary dictionaryWithCapacity:layoutInfo.count + attributes.count + transitions.count];
    }
    self.hm_styleStore = nil;
    [mutableStyleDictionary addEntriesFromDictionary:layoutInfo];
    [mutableStyleDictionary addEntriesFromDictionary:attributes];
    [mutableStyleDictionary addEntriesFromDictionary:transitions];
    self.hm_styleStore = mutableStyleDictionary;

    // 转换样式
    id positionObject = layoutInfo[@"position"];
    if ([positionObject isKindOfClass:NSString.class]) {
        if ([((NSString *) positionObject).lowercaseString isEqualToString:@"fixed"]) {
            NSMutableDictionary *mutableDomStyleDictionary = layoutInfo.mutableCopy;
            layoutInfo = nil;
            mutableDomStyleDictionary[@"position"] = @"absolute";
            layoutInfo = mutableDomStyleDictionary.copy;
            self.hm_isFixedPosition = YES;
        } else {
            self.hm_isFixedPosition = NO;
        }
    }

    NSMutableDictionary *transitionAnimations = NSMutableDictionary.dictionary;
    [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
        [layoutInfo enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSObject *obj, BOOL *stop) {
            // 过滤需要动画的属性，通过动画展示
            if (self.hm_transitionAnimation && [self.hm_transitionAnimation.needAnimations.allKeys containsObject:key]) {
                [transitionAnimations addEntriesFromDictionary:@{key:obj}];
            } else {
                [self hm_configureWithTarget:layout cssAttribute:key value:obj converterManager:HMYogaConfig.defaulfConfig];
            }
        }];
    }];
    [attributes enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSObject *obj, BOOL *stop) {
        // 过滤需要动画的属性，通过动画展示
        if (self.hm_transitionAnimation && [self.hm_transitionAnimation.needAnimations.allKeys containsObject:key]) {
            [transitionAnimations addEntriesFromDictionary:@{key: obj}];
        } else {
            [self hm_configureWithTarget:self cssAttribute:key value:obj converterManager:HMAttrManager.sharedManager];
        }
    }];
    
    if (self.HMBorderBoxSizing) {
        if (self.hm_borderModelCollection) {
            self.hm_renderObject.borderTopWidth = self.hm_borderModelCollection.top.isShowBorder ? self.hm_borderModelCollection.top.borderWidth : YOGA_TYPE_WRAPPER(YGUndefined);
            self.hm_renderObject.borderBottomWidth = self.hm_borderModelCollection.bottom.isShowBorder ? self.hm_borderModelCollection.bottom.borderWidth : YOGA_TYPE_WRAPPER(YGUndefined);
            self.hm_renderObject.borderLeftWidth = self.hm_borderModelCollection.left.isShowBorder ? self.hm_borderModelCollection.left.borderWidth : YOGA_TYPE_WRAPPER(YGUndefined);
            self.hm_renderObject.borderRightWidth = self.hm_borderModelCollection.right.isShowBorder ? self.hm_borderModelCollection.right.borderWidth : YOGA_TYPE_WRAPPER(YGUndefined);
        } else if (self.layer.borderWidth > 0) {
            self.hm_renderObject.borderWidth = self.layer.borderWidth;
        } else {
            self.hm_renderObject.borderWidth = YOGA_TYPE_WRAPPER(YGUndefined);
            self.hm_renderObject.borderTopWidth = YOGA_TYPE_WRAPPER(YGUndefined);
            self.hm_renderObject.borderBottomWidth = YOGA_TYPE_WRAPPER(YGUndefined);
            self.hm_renderObject.borderLeftWidth = YOGA_TYPE_WRAPPER(YGUndefined);
            self.hm_renderObject.borderRightWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        }
    } else {
        self.hm_renderObject.borderWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderTopWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderBottomWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderLeftWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderRightWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        //            self.hm_renderObject.borderStartWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        //            self.hm_renderObject.borderEndWidth = YOGA_TYPE_WRAPPER(YGUndefined);
    }
    
    // 设置样式之后，根据zindex 处理fixed
    [self hm_processFixedPositionWithContext:[HMJSGlobal.globalObject currentContext:style.context]];
    // 将动画相关信息记录到transitionAnimation
    [self.hm_transitionAnimation addAnimations:transitionAnimations];
    
    // 初始化transitionAnimation对象
    if (!self.hm_transitionAnimation && transitions.count > 0) {
        self.hm_transitionAnimation = [[HMTransitionAnimation alloc] initWithTransitions:transitions view:self];
    }
    [self hm_markDirty];
}

- (void)hm_configureWithTarget:(id)target cssAttribute:(NSString *)cssAttribute value:(id)value converterManager:(id)converterManager {
    // TODO(唐佳诚): 未来改成协议
    if (![converterManager respondsToSelector:@selector(converterWithCSSAttr:)]) {
        NSAssert(NO, @"必须响应对应内容");

        return;
    }
    SEL converter = [converterManager converterWithCSSAttr:cssAttribute];
    NSMethodSignature *signature = [HMConverter.class methodSignatureForSelector:converter];
    if (signature.numberOfArguments != 3 ||
            *(signature.methodReturnType) == 'v') {
        HMLogError(@"Converter [%@] method signature error!, cssAttribute [%@]",
                NSStringFromSelector(converter), cssAttribute);

        return;
    }

    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:[HMConverter class]];
    [invocation setSelector:converter];
    [invocation setArgument:(void *) &value atIndex:2];
    [invocation invoke];

    NSString *property = nil;
    // TODO(唐佳诚): 未来改成协议
    if ([converterManager isKindOfClass:HMYogaConfig.class]) {
        HMYogaConfig *yogaConfig = converterManager;
        property = [yogaConfig ygPropertyWithCSSAttr:cssAttribute];
    } else if ([converterManager isKindOfClass:HMAttrManager.class]) {
        HMAttrManager *attrManager = converterManager;
        property = [attrManager viewPropWithCSSAttr:cssAttribute];
    }

    SEL selector = [self hm_setterSelectorForPropertyName:property];
    if (!property.length || ![target respondsToSelector:selector]) {
        HMLogError(@"视图或者 YGLayout can not found selector [%@]",
                NSStringFromSelector(converter));

        return;
    }

    void *returnVal = malloc(signature.methodReturnLength);
    [invocation getReturnValue:returnVal];

    signature = [target methodSignatureForSelector:selector];
    invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:target];
    [invocation setSelector:selector];
    [invocation setArgument:returnVal atIndex:2];
    [invocation invoke];

    if (returnVal) {
        free(returnVal);
    }
}

- (SEL)hm_setterSelectorForPropertyName:(NSString *)propertyName {
    if (!propertyName || propertyName.length <= 0) {
        return nil;
    }
    if (propertyName.length < 1) {
        NSAssert(NO, @"propertyName 必须至少一个字符");

        return nil;
    }

    NSString *setterSel = [NSString stringWithFormat:@"set%@%@:", [propertyName substringToIndex:1].uppercaseString,
                                                     [propertyName substringFromIndex:1]];

    return NSSelectorFromString(setterSel);
}
// 注意 fixed 的场景下，需要 手动使用 removeChild 进行解引用(但不需要 superview 正确)

- (void)hm_processFixedPositionWithContext:(HMJSContext *)context {
    if (self.hm_isFixedPosition && self.superview) {
        // superview -> rootView
        self.hm_fixedPositionLastContainerView = self.superview;
        [self removeFromSuperview];
        [self.hm_fixedPositionLastContainerView hm_markDirty];
        [context.rootView addSubview:self];
        [context.rootView hm_markDirty];
    } else if (!self.hm_isFixedPosition && self.hm_fixedPositionLastContainerView) {
        // superview(rootView) -> superview
        UIView *superView = self.superview;
        [self removeFromSuperview];
        [superView hm_markDirty];
        [self.hm_fixedPositionLastContainerView addSubview:self];
        [self.hm_fixedPositionLastContainerView hm_markDirty];
        self.hm_fixedPositionLastContainerView = nil;
    }
    if (self.superview == context.rootView) {
        [UIView hm_reSortFixedView:context];
    }
}
/**
 * 所有 fixed 布局可能收到非自身的影响，因此无法(比较苦难)通过提前标记来判断是否需要重新 sort
 * 所以目前采用，每次都排序，但是经过 diff，只移动变化的视图，来处理。
 */
+ (void)hm_reSortFixedView:(HMJSContext *)context{
    
    NSArray *m_subviews = context.rootView.subviews;
    NSMutableArray *rootSubViews = [NSMutableArray new];
    BOOL hasFixed = NO;
    for (UIView *subview in m_subviews) {
        if (subview.hm_isFixedPosition) {
            hasFixed = YES;
        }
        [rootSubViews addObject:subview];
    }
    if (hasFixed == NO) {return;}
    
    NSArray<UIView *> *sortedViews = [rootSubViews sortedArrayWithOptions:NSSortStable usingComparator:^NSComparisonResult(UIView *view1, UIView *view2) {
        if (view1.hm_zIndex > view2.hm_zIndex) {
            return NSOrderedDescending;
        }else if (view1.hm_zIndex < view2.hm_zIndex) {
            return NSOrderedAscending;
        }
        return NSOrderedSame;
    }];
    //o   : 非 fixed view
    //f   : fixed view
    //数组 : 添加时的顺序
    //rootSubViews [o1,f1,o2,f2] 变为
    //sortedViews  [o1,o2,f1,f2]
    for (int i = 0; i<sortedViews.count; i++) {
        //排序之前，目标位置的原始视图: f1
        UIView *oriView = rootSubViews[i];
        //排序之后，目标位置的目标视图: o2
        UIView *sortedView = sortedViews[i];
        if (oriView == sortedView) {
            continue;
        }
        //交换 o2 到 目标位置。
        //rootView 的层级不会很多，因为 js view(非 fixed) 都在 context.root.view(hummer.render) 中。
        //因此涉及到排序的视图数量 = fixed views + 1(hummer.render)
        //因此直接获取 index。后续或考虑维护index。
        NSUInteger oIdx = [rootSubViews indexOfObject:sortedView];
        [context.rootView exchangeSubviewAtIndex:i withSubviewAtIndex:oIdx];
        //更新 原视图数组顺序
        [rootSubViews exchangeObjectAtIndex:i withObjectAtIndex:oIdx];
    }
}

- (void)hm_markDirty {
    if (!self.isHmLayoutEnabled) {
        return;
    }

    // 1. 叶节点 -> 叶节点（脏），需要 markDirty + setNeedsLayout
    // 2. 容器节点 -> 容器节点（脏），只需要 setNeedsLayout
    // 3. 叶节点 -> 容器节点（脏），只需要 setNeedsLayout
    // 4. 容器节点 -> 叶节点（脏），只需要 setNeedsLayout
    // YGAttachNodesFromViewHierachy 会针对 2 3 4 情况自行做出标记脏节点的动作
    if (self.hm_renderObject.numberOfChildren == 0 && self.hm_renderObject.isLeaf) {
        // 原先是叶节点，现在也是叶节点
        [self.hm_renderObject markDirty];
    }
    NSAssert(NSThread.isMainThread, @"必须是主线程");
    if (!viewSet) {
        viewSet = NSHashTable.weakObjectsHashTable;
        dispatch_async(dispatch_get_main_queue(), ^{
            [UIView hm_layoutIfNeeded];
        });
    }
    [viewSet addObject:self];
}

- (NSString *)hm_viewID {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)hm_setViewID:(NSString *)viewID {
    if (!viewID) {return;}
    NSString *vid = nil;
    if ([viewID isKindOfClass:NSString.class]) {
        vid = viewID;
    } else if ([viewID isKindOfClass:HMBaseValue.class]) {
        HMBaseValue *jsv = (HMBaseValue *)viewID;
        if (jsv.isString) {
            vid = jsv.toString;
        }
    }
    objc_setAssociatedObject(self, @selector(hm_viewID), vid, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

#pragma mark - Export Method

- (void)hm_removeSubview:(HMBaseValue *)child {
    id viewObject = child.hm_toObjCObject;
    UIView *view = nil;
    if ([viewObject isKindOfClass:UIView.class]) {
        view = viewObject;
    }
    if (!view) {
        HMLogError(@"参数必须为视图");

        return;
    }
    if (view.superview) {
        UIView *superView = view.superview;
        [view removeFromSuperview];
        [superView hm_markDirty];
        [superView.hm_jsValueLifeContainer removeObjectForKey:view];
    }
    /* a -> a0 -> a00(with height), remove a00, a0's height not change.
    UIView *superView = view.superview;
    if (superView) {
        [view removeFromSuperview];
        [superView hm_markDirty];
    }
    if (superView.subviews.count > 0) {
        return;
    }
    superView = superView.superview;
    while (superView && superView.subviews.count < 2) {
        superView = superView.superview;
    }
    [superView hm_markDirty];
    [superView.superview hm_markDirty];
     */
}

- (void)hm_removeAllSubviews {
    [self.subviews enumerateObjectsUsingBlock:^(__kindof UIView *_Nonnull obj,
            NSUInteger idx,
            BOOL *_Nonnull stop) {
        [obj removeFromSuperview];
    }];
    [self.hm_jsValueLifeContainer removeAllObjects];
    [self hm_markDirty];
}

- (void)hm_replaceSubview:(HMBaseValue *)newChild withNode:(HMBaseValue *)oldChild {
    id newViewObject = newChild.hm_toObjCObject;
    id oldViewObject = oldChild.hm_toObjCObject;
    UIView *newView = nil;
    UIView *oldView = nil;
    if ([newViewObject isKindOfClass:UIView.class]) {
        newView = newViewObject;
    }
    if ([oldViewObject isKindOfClass:UIView.class]) {
        oldView = oldViewObject;
    }
    if (!newView || !oldView) {
        HMLogError(@"参数必须为视图");

        return;
    }
    NSInteger index = [self.subviews indexOfObject:oldView];
    if (index == NSNotFound) {
        return;
    }

    if (newView.superview != self) {
        UIView *parent = newView.superview;
        [newView removeFromSuperview];
        //deref
        [parent.hm_jsValueLifeContainer removeObjectForKey:newView];
        [parent hm_markDirty];
    }
    [oldView removeFromSuperview];

    [self insertSubview:newView atIndex:index];
    //ref
    [self.hm_jsValueLifeContainer setObject:newView.hmValue forKey:newView];
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:newChild.context];
    [newView hm_processFixedPositionWithContext:context];
    [self hm_markDirty];
}
- (void)hm_addSubview:(HMBaseValue *)subview {
    [self _hm_insertNode:subview beforeNode:nil];
}

/**
 * 当 oldChild 为 nil，则相当于 hm_addSubview 。
 */
- (void)_hm_insertNode:(HMBaseValue *)newChild beforeNode:(nullable HMBaseValue *)oldChild {

    id newViewObject = newChild.hm_toObjCObject;
    id oldViewObject = oldChild.hm_toObjCObject;
    UIView *newView = nil;
    UIView *oldView = nil;
    if ([newViewObject isKindOfClass:UIView.class]) {
        newView = newViewObject;
    }
    if ([oldViewObject isKindOfClass:UIView.class]) {
        oldView = oldViewObject;
    }
    // 目标视图不能为空，如果 oldChild 为空，则 addsubview
    if (!newView) {
        HMLogError(@"参数必须为视图");
        return;
    }
    if (newView.superview && newView.superview != self) {
        UIView *parent = newView.superview;
        [newView removeFromSuperview];
        //deref
        [parent.hm_jsValueLifeContainer removeObjectForKey:newView];
        [parent hm_markDirty];
    }
    if (newView && oldView){
        [self insertSubview:newView belowSubview:oldView];
    }else{
        [self addSubview:newView];
    }
    //ref
    [self.hm_jsValueLifeContainer setObject:newView.hmValue forKey:newView];
    HMJSContext *context = [HMJSGlobal.globalObject currentContext:newChild.context];
    [newView hm_processFixedPositionWithContext:context];
    [self hm_markDirty];
}

// 保持该方法行为与之前一致。
- (void)hm_insertBefore:(HMBaseValue *)newChild withNode:(HMBaseValue *)oldChild {
    id newViewObject = newChild.hm_toObjCObject;
    id oldViewObject = oldChild.hm_toObjCObject;
    UIView *newView = nil;
    UIView *oldView = nil;
    if ([newViewObject isKindOfClass:UIView.class]) {
        newView = newViewObject;
    }
    if ([oldViewObject isKindOfClass:UIView.class]) {
        oldView = oldViewObject;
    }
    if (!newView || !oldView) {
        HMLogError(@"参数必须为视图");
        return;
    }
    [self _hm_insertNode:newChild beforeNode:oldChild];
}

- (HMBaseValue *)hm_getSubViewByID:(HMBaseValue *)viewID {
    for (UIView *view in self.subviews) {
        if ([view.viewID isEqualToString:viewID.toString]) {
            return view.hmValue;
        }
        [view hm_getSubViewByID:viewID];
    }
    return nil;
}

- (void)hummerSetFrame:(CGRect)frame {
    // These frames are in terms of anchorPoint = topLeft, but internally the
    // views are anchorPoint = center for easier scale and rotation animations.
    // Convert the frame so it works with anchorPoint = center.
    CGPoint position = {CGRectGetMidX(frame), CGRectGetMidY(frame)};
    CGRect bounds = {CGPointZero, frame.size};
    
    // Avoid crashes due to nan coords
    if (isnan(position.x) || isnan(position.y) || isnan(bounds.origin.x) || isnan(bounds.origin.y) ||
        isnan(bounds.size.width) || isnan(bounds.size.height)) {
        HMLogError(@"Invalid layout for %@. position: %@. bounds: %@",
                   self,
                   NSStringFromCGPoint(position),
                   NSStringFromCGRect(bounds));
        
        return;
    }
    
    self.center = position;
    self.bounds = bounds;
}

@end
