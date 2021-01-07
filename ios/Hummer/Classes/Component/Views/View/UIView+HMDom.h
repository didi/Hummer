//
//  UIView+HMDom.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HMImageLoaderDefine.h"

@class HMCornerRadiusModel;
@class HMGradientColor;
@class HMBorderModelCollection;
@class HMTransitionAnimation;
@class HMJSContext;
@class JSValue;
@class YGLayout;

@interface UIView (HMDom)

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, nullable, copy, setter=hm_setViewID:, getter=hm_viewID) NSString *viewID;

@property (nonatomic, nullable, strong) CAShapeLayer *hm_borderTopLayer;

@property (nonatomic, nullable, strong) CAShapeLayer *hm_borderRightLayer;

@property (nonatomic, nullable, strong) CAShapeLayer *hm_borderBottomLayer;

@property (nonatomic, nullable, strong) CAShapeLayer *hm_borderLeftLayer;

/**
 * @brief 如果是 masksToBounds 优化，则加一个标记位，用于 revert
 */
@property (nonatomic, assign) BOOL hm_isMasksToBoundsOptimization;

@property (nonatomic, weak, nullable) UIView *hm_fixedPositionLastContainerView;

@property (nonatomic, assign) BOOL hm_isFixedPosition;

@property (nonatomic, strong, nullable) CAShapeLayer *hm_backgroundColorShapeLayer;

@property (nonatomic, strong, nullable) CAShapeLayer *hm_backgroundColorMaskLayer;

@property (nonatomic, strong, nullable) CAShapeLayer *hm_maskLayer;

@property (nonatomic, strong, nullable) CAGradientLayer *hm_gradientLayer;

@property (nonatomic, copy, nullable) HMCornerRadiusModel *hm_cornerRadiusModel;

@property (nonatomic, copy, nullable) HMBorderModelCollection *hm_borderModelCollection;

@property (nonatomic, copy, nullable) NSDictionary<NSString *, NSObject *> *hm_styleStore;

@property (nonatomic, strong, nullable) HMTransitionAnimation *hm_transitionAnimation;

- (void)hm_markDirty;

+ (void)hm_layoutIfNeeded;

- (void)hm_addSubview:(JSValue *)subview;

- (void)hm_removeSubview:(JSValue *)child;

- (void)hm_removeAllSubviews;

- (void)hm_replaceSubview:(JSValue *)newChild withNode:(JSValue *)oldChild;

- (void)hm_insertBefore:(JSValue *)newChild withNode:(JSValue *)oldChild;

- (nullable JSValue *)hm_getSubViewByID:(nullable JSValue *)viewId DEPRECATED_MSG_ATTRIBUTE("废弃接口，属于浏览器 DOM 移植概念");

- (void)hm_fallbackWithBorderModelCollection:(nullable HMBorderModelCollection *)borderModelCollection;

- (void)hm_saveBorderStyleWithTop:(nullable NSNumber *)top right:(nullable NSNumber *)right bottom:(nullable NSNumber *)bottom left:(nullable NSNumber *)left;

- (void)hm_saveBorderColorWithTop:(nullable UIColor *)top right:(nullable UIColor *)right bottom:(nullable UIColor *)bottom left:(nullable UIColor *)left;

- (void)hm_saveBorderWidthWithTop:(nullable NSNumber *)top right:(nullable NSNumber *)right bottom:(nullable NSNumber *)bottom left:(nullable NSNumber *)left;

- (void)hm_saveCornerRadiusWithTopLeft:(nullable NSNumber *)topLeft topRight:(nullable NSNumber *)topRight bottomLeft:(nullable NSNumber *)bottomLeft bottomRight:(nullable NSNumber *)bottomRight;

- (void)hm_performBackgroundColorWithBackgroundColor:(nullable UIColor *)backgroundColor;

- (void)hm_performGradientColorWithGradientColor:(nullable HMGradientColor *)gradientColor;

- (HMBorderModelCollection *)hm_createBorderModelCollection ;

- (UIBezierPath *)hm_createCornerRadiusPath;

- (void)hm_updateShadow;

- (NSArray<NSString *> *)hm_layoutInfoKeys;

- (void)hm_layoutBackgroundColorImageBorderShadowCornerRadius;

- (void)hm_updateBackgroundColor;

- (void)hm_layoutBackgroundColor;

- (void)hm_layoutMaskView;

- (void)hm_updateMasksToBounds;

- (void)hm_updateBorder;

- (void)hm_layoutBorder;

- (void)hm_layoutRootView;

- (NSNumber *)hm_enabled;

- (void)hm_setEnabled:(JSValue *)enabledValue;

- (nullable NSDictionary<NSString *, NSObject *> *)hm_style;

- (void)hm_setStyle:(JSValue *)style;

- (void)hm_configureWithTarget:(id)target cssAttribute:(NSString *)cssAttribute value:(id)value converterManager:(id)converterManager;

- (void)hm_layoutYogaRootView;

- (SEL)hm_setterSelectorForPropertyName:(NSString *)propertyName;

- (void)hm_processFixedPositionWithContext:(HMJSContext *)context;

/**
 * @brief 重要的设置 frame 的方法，避免直接设置 frame 影响动画等
 */
- (void)hummerSetFrame:(CGRect)frame;


/*   Layout Pass   */

/**
 * @brief 当 js 设置 style 之后调用
 */
- (void)hm_didSetProps:(NSDictionary<NSString *, NSObject *> *)changedProps NS_REQUIRES_SUPER;

/**
 * view 布局函数。
 * 布局周期函数内不要做复杂行为，否则会 block 到主线程。
 */

/**
 * @brief yoga 计算布局结束，应用布局之前
 */
- (void)hm_willPerformLayout NS_REQUIRES_SUPER;

/**
 * @brief 设置 frame 之后。
 */
- (void)hm_didPerformLayout NS_REQUIRES_SUPER;

NS_ASSUME_NONNULL_END
@end
