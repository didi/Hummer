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

// TODO: 后续多线程版本上线后，这部分代码迁移到 commonStyle，Hummer1导出接口保留，通用样式处理迁移到 commonStyle
- (void)setHm__backgroundColor:(nullable UIColor *)backgroundColor;

- (CGFloat)hm_zIndex;

// NO:visible
- (BOOL)hm_visibility;
@end

NS_ASSUME_NONNULL_END
