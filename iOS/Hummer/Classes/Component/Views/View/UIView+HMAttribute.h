//
//  UIView+HMAttribute.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

@class HMViewDecoration;

#define HMAssociatedPropertyGetterDeclaration(prop, type) \
- (nullable type *)hm_##prop;

NS_ASSUME_NONNULL_BEGIN

@interface UIView(HMAttribute)

HMAssociatedPropertyGetterDeclaration(decoration, HMViewDecoration)

- (void)set__borderRadius:(NSArray<NSValue *> *)list;

- (void)set__shadow:(nullable NSArray<NSObject *> *)shadowAttributes;

- (void)set__backgroundColor:(nullable UIColor *)backgroundColor;

- (void)set__borderWidth:(NSArray<NSNumber *> *)list;

- (CGFloat)hm_zIndex;

@end

NS_ASSUME_NONNULL_END
