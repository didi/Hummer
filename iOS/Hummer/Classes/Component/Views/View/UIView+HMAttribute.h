//
//  UIView+HMAttribute.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMBorderModel.h>
#import <Hummer/HMYogaUtility.h>

@class HMViewDecoration;

#define HMAssociatedPropertyGetterDeclaration(prop, type) \
- (nullable type *)hm_##prop;

NS_ASSUME_NONNULL_BEGIN

@interface UIView (HMAttribute)

HMAssociatedPropertyGetterDeclaration(decoration, HMViewDecoration)

- (void)set__borderRadius:(nullable NSArray<NSValue *> *)list;

- (void)set__borderTopLeftRadius:(YOGA_TYPE_WRAPPER(YGValue))radius;

- (void)set__borderTopRightRadius:(YOGA_TYPE_WRAPPER(YGValue))radius;

- (void)set__borderBottomLeftRadius:(YOGA_TYPE_WRAPPER(YGValue))radius;

- (void)set__borderBottomRightRadius:(YOGA_TYPE_WRAPPER(YGValue))radius;

- (void)set__shadow:(nullable NSArray<NSObject *> *)shadowAttributes;

- (void)set__backgroundColor:(nullable UIColor *)backgroundColor;

- (void)set__backgroundImage:(nullable NSString *)imageString;

- (void)set__borderStyle:(nullable NSArray *)list;

- (void)set__borderLeftStyle:(HMBorderStyle)style;

- (void)set__borderTopStyle:(HMBorderStyle)style;

- (void)set__borderRightStyle:(HMBorderStyle)style;

- (void)set__borderBottomStyle:(HMBorderStyle)style;

- (void)set__borderColor:(nullable NSArray<UIColor *> *)list;

- (void)set__borderLeftColor:(nullable UIColor *)color;

- (void)set__borderTopColor:(nullable UIColor *)color;

- (void)set__borderRightColor:(nullable UIColor *)color;

- (void)set__borderBottomColor:(nullable UIColor *)color;

- (void)set__borderWidth:(nullable NSArray<NSNumber *> *)list;

- (void)set__borderLeftWidth:(CGFloat)width;

- (void)set__borderTopWidth:(CGFloat)width;

- (void)set__borderRightWidth:(CGFloat)width;

- (void)set__borderBottomWidth:(CGFloat)width;

- (CGFloat)hm_zIndex;

// NO:visible
- (BOOL)hm_visibility;
@end

NS_ASSUME_NONNULL_END
