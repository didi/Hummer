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
#import <UIView+HMImageLoader.h>

@implementation UIView(HMAttribute)

- (CGFloat)hm_zIndex {
    return [objc_getAssociatedObject(self, _cmd) floatValue];
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
HM_EXPORT_ATTRIBUTE(overflow, clipsToBounds, HMStringToClipSubviews:)
HM_EXPORT_ATTRIBUTE(visibility, __visibility, HMStringToViewHidden:)
- (void)set__visibility:(BOOL)isHidden {
    self.hm_visibility = isHidden;
    self.hidden = isHidden;//此处设计有问题
}
#pragma mark - Export Zindex

HM_EXPORT_ATTRIBUTE(zIndex, __zIndex, HMNumberToNSInteger:)
- (void)set__zIndex:(NSUInteger)index {
    self.hm_zIndex = index;
    self.layer.zPosition = index;
}
#pragma mark - Export Attribute Border

HM_EXPORT_ATTRIBUTE(borderWidth, __borderWidth, HMStringToNumberArray:)
HM_EXPORT_ATTRIBUTE(borderLeftWidth, __borderLeftWidth, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(borderTopWidth, __borderTopWidth, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(borderRightWidth, __borderRightWidth, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(borderBottomWidth, __borderBottomWidth, HMStringToFloat:)

HM_EXPORT_ATTRIBUTE(borderRadius, __borderRadius, HMStringToBorderRadiusList:)
HM_EXPORT_ATTRIBUTE(borderTopLeftRadius, __borderTopLeftRadius, HMNumberToYGPoint:)
HM_EXPORT_ATTRIBUTE(borderTopRightRadius, __borderTopRightRadius, HMNumberToYGPoint:)
HM_EXPORT_ATTRIBUTE(borderBottomLeftRadius, __borderBottomLeftRadius, HMNumberToYGPoint:)
HM_EXPORT_ATTRIBUTE(borderBottomRightRadius, __borderBottomRightRadius, HMNumberToYGPoint:)

HM_EXPORT_ATTRIBUTE(borderColor, __borderColor, HMStringToBorderColorList:)
HM_EXPORT_ATTRIBUTE(borderLeftColor, __borderLeftColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(borderTopColor, __borderTopColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(borderRightColor, __borderRightColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(borderBottomColor, __borderBottomColor, HMStringToColor:)

HM_EXPORT_ATTRIBUTE(borderStyle, __borderStyle, HMStringToBorderStyleList:)
HM_EXPORT_ATTRIBUTE(borderLeftStyle, __borderLeftStyle, HMStringToBorderStyle:)
HM_EXPORT_ATTRIBUTE(borderTopStyle, __borderTopStyle, HMStringToBorderStyle:)
HM_EXPORT_ATTRIBUTE(borderRightStyle, __borderRightStyle, HMStringToBorderStyle:)
HM_EXPORT_ATTRIBUTE(borderBottomStyle, __borderBottomStyle, HMStringToBorderStyle:)

HM_EXPORT_ATTRIBUTE(boxSizing, HMBorderBoxSizing, HMBoxSizingStringToBoolean:)

- (BOOL)HMBorderBoxSizing {
    NSNumber *borderBoxSizing = objc_getAssociatedObject(self, _cmd);

    return borderBoxSizing.boolValue;
}

- (void)setHMBorderBoxSizing:(BOOL)hmBorderBoxSizing {
    objc_setAssociatedObject(self, @selector(HMBorderBoxSizing), hmBorderBoxSizing ? @YES : nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

//HMBorderPropertyListSetter(Radius)
- (void)set__borderRadius:(NSArray<NSValue *> *)list {
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

//HMBorderPropertyYGValueSetter(Radius, TopLeft, YGValue, radius)
- (void)set__borderTopLeftRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil topRight:nil bottomLeft:nil bottomRight:nil];
}

//HMBorderPropertyYGValueSetter(Radius, TopRight, YGValue, radius)
- (void)set__borderTopRightRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:nil topRight:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil bottomLeft:nil bottomRight:nil];
}

//HMBorderPropertyYGValueSetter(Radius, BottomLeft, YGValue, radius)
- (void)set__borderBottomLeftRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:nil topRight:nil bottomLeft:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil bottomRight:nil];
}

//HMBorderPropertyYGValueSetter(Radius, BottomRight, YGValue, radius)
- (void)set__borderBottomRightRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    [self hm_saveCornerRadiusWithTopLeft:nil topRight:nil bottomLeft:nil bottomRight:radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? @(radius.value) : nil];
}

//HMBorderPropertyListSetter(Width)
- (void)set__borderWidth:(NSArray<NSNumber *> *)list {
    if (list.count == 1) {
        list = @[list[0], list[0], list[0], list[0]];
    } else if (list.count == 2) {
        list = @[list[0], list[1], list[0], list[1]];
    } else if (list.count == 3) {
        list = @[list[0], list[1], list[2], list[1]];
    }
    [self hm_saveBorderWidthWithTop:list[0] right:list[1] bottom:list[2] left:list[3]];
}

//HMBorderPropertyNumberSetter(Width,Left, CGFloat, width)
- (void)set__borderLeftWidth:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:nil right:nil bottom:nil left:@(width)];
}

//HMBorderPropertyNumberSetter(Width,Top, CGFloat, width)
- (void)set__borderTopWidth:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:@(width) right:nil bottom:nil left:nil];
}

//HMBorderPropertyNumberSetter(Width,Right, CGFloat, width)
- (void)set__borderRightWidth:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:nil right:@(width) bottom:nil left:nil];
}

//HMBorderPropertyNumberSetter(Width,Bottom, CGFloat, width)
- (void)set__borderBottomWidth:(CGFloat)width {
    [self hm_saveBorderWidthWithTop:nil right:nil bottom:@(width) left:nil];
}

//HMBorderPropertyListSetter(Color)
- (void)set__borderColor:(NSArray<UIColor *> *)list {
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

//HMBorderPropertyColorSetter(Left)
- (void)set__borderLeftColor:(UIColor *)color {
    [self hm_saveBorderColorWithTop:nil right:nil bottom:nil left:color];
}

//HMBorderPropertyColorSetter(Top)
- (void)set__borderTopColor:(UIColor *)color {
    [self hm_saveBorderColorWithTop:color right:nil bottom:nil left:nil];
}

//HMBorderPropertyColorSetter(Right)
- (void)set__borderRightColor:(UIColor *)color {
    [self hm_saveBorderColorWithTop:nil right:color bottom:nil left:nil];
}

//HMBorderPropertyColorSetter(Bottom)
- (void)set__borderBottomColor:(UIColor *)color {
    [self hm_saveBorderColorWithTop:nil right:nil bottom:color left:nil];
}

//HMBorderPropertyListSetter(Style)
- (void)set__borderStyle:(NSArray*)list {
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
- (void)set__borderLeftStyle:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:nil right:nil bottom:nil left:@(style)];
}

//HMBorderPropertyNumberSetter(Style, Top, HMBorderStyle, style)
- (void)set__borderTopStyle:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:@(style) right:nil bottom:nil left:nil];
}

//HMBorderPropertyNumberSetter(Style, Right, HMBorderStyle, style)
- (void)set__borderRightStyle:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:nil right:@(style) bottom:nil left:nil];
}

//HMBorderPropertyNumberSetter(Style, Bottom, HMBorderStyle, style)
- (void)set__borderBottomStyle:(HMBorderStyle)style {
    [self hm_saveBorderStyleWithTop:nil right:nil bottom:@(style) left:nil];
}

#pragma mark - Export Attribute shadow

HM_EXPORT_ATTRIBUTE(shadow, __shadow, HMStringToShadowAttributes:)

- (void)set__shadow:(NSArray<NSObject *> *)shadowAttributes {
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

HM_EXPORT_ATTRIBUTE(backgroundColor, __backgroundColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(backgroundImage, __backgroundImage, HMStringOrigin:)

- (void)set__backgroundColor:(UIColor *)backgroundColor {
    if ([backgroundColor isKindOfClass:HMGradientColor.class]) {
        [self hm_performGradientColorWithGradientColor:(HMGradientColor *) backgroundColor];
    } else {
        [self hm_performBackgroundColorWithBackgroundColor:backgroundColor];
    }
}

- (void)set__backgroundImage:(NSString *)imageString {
    if (imageString.length == 0) {
        HMLogWarning(@"URL 无效");
    }
    [self hm_internalSetImageWithURL:imageString inJSBundleSource:nil context:nil completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (image) {
            self.layer.contents = (__bridge id _Nullable)(image.CGImage);
        }
    }];
}

#pragma mark - Export Attribute transform
HM_EXPORT_ATTRIBUTE(transform, __transform, HMValueOrigin:)
- (void)set__transform:(id)transform
{
    self.layer.transform = [HMTransformResolver resolverTransformValue:transform view:self];
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
