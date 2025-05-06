//
//  UIView+HMAttribute.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMAttribute.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "HMUtility.h"
#import "HMGradientColor.h"
#import "HMImageLayer.h"
#import "HMImageView.h"
#import "UIView+HMDom.h"
#import <objc/runtime.h>
#import "HMUtility.h"
#import "HMBorderModelCollection.h"
#import "HMBorderModel.h"
#import "HMTransformResolver.h"
#import "UIView+HMAnimation.h"
#import <UIView+HMImageLoader.h>

#import "HMTransitionAnimationConverter.h"
@implementation UIView(HMAttribute)

- (CGFloat)hm_zIndex {
    return [objc_getAssociatedObject(self, _cmd) floatValue];
}

- (BOOL)hm_isLoadingBackgroundImage{
    return [objc_getAssociatedObject(self, _cmd) boolValue];
}

- (void)setHm_isLoadingBackgroundImage:(BOOL)isLoadingBackgroundImage {
    
    objc_setAssociatedObject(self, @selector(hm_isLoadingBackgroundImage), @(isLoadingBackgroundImage), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (void)setHm_zIndex:(CGFloat)hm_zIndex {
    objc_setAssociatedObject(self, @selector(hm_zIndex), @(hm_zIndex), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)hm_visibility {
    return [objc_getAssociatedObject(self, _cmd) boolValue];
}

- (void)setHm_visibility:(BOOL)hm_visibility {
    objc_setAssociatedObject(self, @selector(hm_visibility), @(hm_visibility), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

#pragma mark - Export Attribute visible

HM_EXPORT_ATTRIBUTE(opacity, alpha, HMNumberToCGFloat:)
HM_EXPORT_ATTRIBUTE(overflow, hm__clipsToBounds_legacy, HMStringToClipSubviews:)
- (void)setHm__clipsToBounds_legacy:(BOOL)isClipped {
    self.hm_clipsToBounds = isClipped;
    [self hm_layoutBackgroundColorImageBorderShadowCornerRadius];
}

HM_EXPORT_ATTRIBUTE(visibility, hm__visibility_legacy, HMStringToViewHidden:)
- (void)setHm__visibility_legacy:(BOOL)isHidden {
    self.hm_visibility = isHidden;
    self.hidden = isHidden;//此处设计有问题
}
#pragma mark - Export Zindex

HM_EXPORT_ATTRIBUTE(zIndex, hm__zIndex_legacy, HMNumberToNSInteger:)
- (void)setHm__zIndex_legacy:(NSUInteger)index {
    self.hm_zIndex = index;
    self.layer.zPosition = index;
}
#pragma mark - Export Attribute Border

HM_EXPORT_ATTRIBUTE(borderWidth, hm__borderWidth_legacy, HMStringToNumberArray:)
//HMBorderPropertyListSetter(Width)
- (void)setHm__borderWidth_legacy:(NSArray<NSNumber *> *)list {
    if (list.count == 1) {
        list = @[list[0], list[0], list[0], list[0]];
    } else if (list.count == 2) {
        list = @[list[0], list[1], list[0], list[1]];
    } else if (list.count == 3) {
        list = @[list[0], list[1], list[2], list[1]];
    }
    [self hm_saveBorderWidthWithTop:list[0] right:list[1] bottom:list[2] left:list[3]];
}

HM_EXPORT_ATTRIBUTE(borderLeftWidth, hm__borderLeftWidth_legacy, HMStringToFloat:)
- (void)setHm__borderLeftWidth_legacy:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:nil right:nil bottom:nil left:@(width)];
}

HM_EXPORT_ATTRIBUTE(borderTopWidth, hm__borderTopWidth_legacy, HMStringToFloat:)
- (void)setHm__borderTopWidth_legacy:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:@(width) right:nil bottom:nil left:nil];
}

HM_EXPORT_ATTRIBUTE(borderRightWidth, hm__borderRightWidth_legacy, HMStringToFloat:)
- (void)setHm__borderRightWidth_legacy:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:nil right:@(width) bottom:nil left:nil];
}

HM_EXPORT_ATTRIBUTE(borderBottomWidth, hm__borderBottomWidth_legacy, HMStringToFloat:)
- (void)setHm__borderBottomWidth_legacy:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:nil right:nil bottom:@(width) left:nil];
}


HM_EXPORT_ATTRIBUTE(borderRadius, hm__borderRadius_legacy, HMStringToBorderRadiusList:)
- (void)setHm__borderRadius_legacy:(NSArray<NSValue *> *)list {
    if (list.count == 1) {
        list = @[list[0], list[0], list[0], list[0]];
    }
    if (list.count == 2) {
        list = @[list[0], list[1], list[0], list[1]];
    }
    if (list.count == 3) {
        list = @[list[0], list[1], list[2], list[1]];
    }
    // TODO(唐佳诚): 支持百分比特性
    NSNumber *topLeft = list[0].ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(list[0].ygValue.value) : nil;
    NSNumber *topRight = list[1].ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(list[1].ygValue.value) : nil;
    NSNumber *bottomRight = list[2].ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(list[2].ygValue.value) : nil;
    NSNumber *bottomLeft = list[3].ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(list[3].ygValue.value) : nil;
    
    // 只支持 pt 单位
    [self hm_saveCornerRadiusWithTopLeft:topLeft topRight:topRight bottomLeft:bottomLeft bottomRight:bottomRight];
}

HM_EXPORT_ATTRIBUTE(borderTopLeftRadius, hm__borderTopLeftRadius_legacy, HMNumberToYGPoint:)
- (void)setHm__borderTopLeftRadius_legacy:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil topRight:nil bottomLeft:nil bottomRight:nil];
}

HM_EXPORT_ATTRIBUTE(borderTopRightRadius, hm__borderTopRightRadius_legacy, HMNumberToYGPoint:)
- (void)setHm__borderTopRightRadius_legacy:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:nil topRight:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil bottomLeft:nil bottomRight:nil];
}

HM_EXPORT_ATTRIBUTE(borderBottomLeftRadius, hm__borderBottomLeftRadius_legacy, HMNumberToYGPoint:)
- (void)setHm__borderBottomLeftRadius_legacy:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:nil topRight:nil bottomLeft:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil bottomRight:nil];
}

HM_EXPORT_ATTRIBUTE(borderBottomRightRadius, hm__borderBottomRightRadius_legacy, HMNumberToYGPoint:)
- (void)saetHm__borderBottomRightRadius_legacy:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:nil topRight:nil bottomLeft:nil bottomRight:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil];
}



HM_EXPORT_ATTRIBUTE(borderColor, hm__borderColor_legacy, HMStringToBorderColorList:)
- (void)setHm__borderColor_legacy:(NSArray<UIColor *> *)list {
    if (list.count == 0) {
        return;
    }
    if (list.count == 1) {
        list = @[list[0], list[0], list[0], list[0]];
    } else if (list.count == 2) {
        list = @[list[0], list[1], list[0], list[1]];
    } else if (list.count == 3) {
        list = @[list[0], list[1], list[2], list[1]];
    }
    [self hm_saveBorderColorWithTop:list[0] right:list[1] bottom:list[2] left:list[3]];
}

HM_EXPORT_ATTRIBUTE(borderLeftColor, hm__borderLeftColor_legacy, HMStringToColor:)
- (void)setHm__borderLeftColor_legacy:(UIColor *)color {
    [self hm_saveBorderColorWithTop:nil right:nil bottom:nil left:color];
}

HM_EXPORT_ATTRIBUTE(borderTopColor, hm__borderTopColor_legacy, HMStringToColor:)
- (void)setHm__borderTopColor_legacy:(UIColor *)color {
    [self hm_saveBorderColorWithTop:color right:nil bottom:nil left:nil];
}

HM_EXPORT_ATTRIBUTE(borderRightColor, hm__borderRightColor_legacy, HMStringToColor:)
- (void)setHm__borderRightColor_legacy:(UIColor *)color {
    [self hm_saveBorderColorWithTop:nil right:color bottom:nil left:nil];
}

HM_EXPORT_ATTRIBUTE(borderBottomColor, hm__borderBottomColor_legacy, HMStringToColor:)
- (void)setHm__borderBottomColor_legacy:(UIColor *)color {
    [self hm_saveBorderColorWithTop:nil right:nil bottom:color left:nil];
}


HM_EXPORT_ATTRIBUTE(borderStyle, hm__borderStyle_legacy, HMStringToBorderStyleList:)
HM_EXPORT_ATTRIBUTE(borderLeftStyle, hm__borderLeftStyle_legacy, HMStringToBorderStyle:)
HM_EXPORT_ATTRIBUTE(borderTopStyle, hm__borderTopStyle_legacy, HMStringToBorderStyle:)
HM_EXPORT_ATTRIBUTE(borderRightStyle,hm__borderRightStyle_legacy, HMStringToBorderStyle:)
HM_EXPORT_ATTRIBUTE(borderBottomStyle, hm__borderBottomStyle_legacy, HMStringToBorderStyle:)
//HMBorderPropertyListSetter(Style)
- (void)hm__borderStyle_legacy:(NSArray*)list {
    if (list.count == 1) {
        list = @[list[0], list[0], list[0], list[0]];
    } else if (list.count == 2) {
        list = @[list[0], list[1], list[0], list[1]];
    } else if (list.count == 3) {
        list = @[list[0], list[1], list[2], list[1]];
    }
    [self hm_saveBorderStyleWithTop:list[0] right:list[1] bottom:list[2] left:list[3]];
}

//HMBorderPropertyNumberSetter(Style, Left, HMBorderStyle, style)
- (void)setHm__borderLeftStyle_legacy:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:nil right:nil bottom:nil left:@(style)];
}

//HMBorderPropertyNumberSetter(Style, Top, HMBorderStyle, style)
- (void)setHm__borderTopStyle_legacy:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:@(style) right:nil bottom:nil left:nil];
}

//HMBorderPropertyNumberSetter(Style, Right, HMBorderStyle, style)
- (void)setHm__borderRightStyle_legacy:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:nil right:@(style) bottom:nil left:nil];
}

//HMBorderPropertyNumberSetter(Style, Bottom, HMBorderStyle, style)
- (void)setHm__borderBottomStyle_legacy:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:nil right:nil bottom:@(style) left:nil];
}



HM_EXPORT_ATTRIBUTE(boxSizing, HMBorderBoxSizing, HMBoxSizingStringToBoolean:)

- (BOOL)HMBorderBoxSizing {
    NSNumber *borderBoxSizing = objc_getAssociatedObject(self, _cmd);

    return borderBoxSizing.boolValue;
}

- (void)setHMBorderBoxSizing:(BOOL)hmBorderBoxSizing {
    objc_setAssociatedObject(self, @selector(HMBorderBoxSizing), hmBorderBoxSizing ? @YES : nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

#pragma mark - Export Attribute shadow

HM_EXPORT_ATTRIBUTE(shadow, hm__shadow_legacy, HMStringToShadowAttributes:)

- (void)setHm__shadow_legacy:(NSArray<NSObject *> *)shadowAttributes {
    if (shadowAttributes.count != 4) {
        return;
    }
    NSAssert(shadowAttributes.count == 4, @"shadow attributes must have 3 item");
    CGFloat widthOffset = [shadowAttributes[0] isKindOfClass:NSNumber.class] ? ((NSNumber *) shadowAttributes[0]).doubleValue : 0;
    CGFloat heightOffset = [shadowAttributes[1] isKindOfClass:NSNumber.class] ? ((NSNumber *) shadowAttributes[1]).doubleValue : 0;
    CGFloat shadowRadius = [shadowAttributes[2] isKindOfClass:NSNumber.class] ? ((NSNumber *) shadowAttributes[2]).doubleValue : 0;
    UIColor *color = [shadowAttributes[3] isKindOfClass:UIColor.class] ? (UIColor *) shadowAttributes[3] : nil;
    
    self.layer.shadowOpacity = CGColorGetAlpha(color.CGColor);
    self.layer.shadowColor = CGColorCreateCopyWithAlpha(color.CGColor, 1);

    self.layer.shadowRadius = shadowRadius;
    self.layer.shadowOffset = CGSizeMake(widthOffset, heightOffset);
    // 按照当前状态创建路径，而不是 setNeedsLayout
    [self hm_updateShadow];
}

#pragma mark - Export Attribute background
- (void)setHm__backgroundColor:(nullable UIColor *)backgroundColor {
    if ([backgroundColor isKindOfClass:HMGradientColor.class]) {
        [self hm_performGradientColorWithGradientColor:(HMGradientColor *) backgroundColor];
    } else {
        [self hm_performBackgroundColorWithBackgroundColor:backgroundColor];
    }
    [self hm_cancelBackgoundImageRequest];
    [self hm_resetBackgroundImage];
    
}


HM_EXPORT_ATTRIBUTE(backgroundColor, hm__backgroundColor_legacy, HMStringToColor:)
- (void)setHm__backgroundColor_legacy:(UIColor *)backgroundColor {
    [self setHm__backgroundColor:backgroundColor];
}

- (void)hm_cancelBackgoundImageRequest {
    if(self.hm_isLoadingBackgroundImage){
        [self hm_cancelImageRequest];
        self.hm_isLoadingBackgroundImage = NO;
    }
}

- (void)hm_resetBackgroundColor {
    self.backgroundColor = nil;
    [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
    self.hm_backgroundColorShapeLayer = nil;
    [self.hm_gradientLayer removeFromSuperlayer];
    self.hm_gradientLayer = nil;
}

- (void)hm_resetBackgroundImage {
    if(self.layer.contents){
        self.layer.contents = nil;
        [self.layer setNeedsDisplay];
    }
}

HM_EXPORT_ATTRIBUTE(backgroundImage, hm__backgroundImage_legacy, HMStringOrigin:)
- (void)setHm__backgroundImage_legacy:(NSString *)imageString {
    if (imageString == nil || imageString.length == 0) {
        HMLogWarning(@"URL 无效");
        [self hm_cancelBackgoundImageRequest];
        [self hm_resetBackgroundColor];
        self.layer.contents = nil;
        [self.layer setNeedsDisplay];
        return;
    }
    self.hm_isLoadingBackgroundImage = YES;
    [self hm_internalSetImageWithURL:imageString inJSBundleSource:nil context:nil completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
        self.hm_isLoadingBackgroundImage = NO;
        if (image) {
            [self hm_resetBackgroundColor];
            self.layer.contents = (__bridge id _Nullable)(image.CGImage);
        }
    }];
}

#pragma mark - Export Attribute transform
HM_EXPORT_ATTRIBUTE(transform, hm__transform_legacy, HMValueOrigin:)
- (void)setHm__transform_legacy:(id)transform
{
    NSDictionary <NSString *, NSObject *> *transformValues = [HMTransitionAnimationConverter convertStyleToAnimations:@{@"transform": transform}];
    HMTransform *newTransform = [HMTransformResolver applyTransformValues:transformValues defaultValue:self.hm_transform];
    self.hm_transform = newTransform;
    self.layer.transform = [newTransform getCATransform3D];
}

#pragma mark - Associatied Properties

#define HMAssociatedPropertyGetter(prop,type) \
- (type *)hm_##prop{ \
    return objc_getAssociatedObject(self, @selector(hm_##prop));\
}

#define HMAssociatedPropertySetter(prop,type,value) \
- (void)setHm_##prop:(type *)value { \
    objc_setAssociatedObject(self, @selector(hm_##prop), value, OBJC_ASSOCIATION_RETAIN); \
}

HMAssociatedPropertyGetter(decoration,HMViewDecoration)
HMAssociatedPropertySetter(decoration,HMViewDecoration, decoration)

HMAssociatedPropertyGetter(decorationLayer,CALayer)
HMAssociatedPropertySetter(decorationLayer,CALayer, decorationLayer)

@end
