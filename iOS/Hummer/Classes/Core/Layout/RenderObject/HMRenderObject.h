//
//  HMShadowView.h
//  yogaDemo1
//
//  Created by didi on 2020/9/17.
//  Copyright © 2020 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMLayout.h>
#import <Hummer/HMLayoutStyleProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRenderObject : NSObject <HMLayoutStyleProtocol>

#pragma mark - Computed Layout-Inferred Metrics

@property (nonatomic, readonly) UIEdgeInsets paddingAsInsets;
@property (nonatomic, readonly) UIEdgeInsets borderAsInsets;
@property (nonatomic, readonly) UIEdgeInsets compoundInsets;
@property (nonatomic, readonly) CGSize availableSize;
@property (nonatomic, readonly) CGRect contentFrame;

/**
 * Represents the natural size of the view, which is used when explicit size is not set or is ambiguous.
 * Defaults to `{UIViewNoIntrinsicMetric, UIViewNoIntrinsicMetric}`.
 */
@property (nonatomic, assign) CGSize intrinsicContentSize;

/**
 * Yoga Config which will be used to create `yogaNode` property.
 * Override in subclass to enable special Yoga features.
 * Defaults to suitable to current device configuration.
 */
+ (YOGA_TYPE_WRAPPER(YGConfigRef))yogaConfig;

@property (nonatomic, weak, readonly, nullable) HMRenderObject *superview;
@property (nonatomic, assign, readonly) YOGA_TYPE_WRAPPER(YGNodeRef) yogaNode;

/**
 * 替代 reactSubviews，本质上就是 YGNodeRef children
 */
@property (nonatomic, copy, readonly, nullable) NSArray<__kindof HMRenderObject *> *subviews;

/**
 * YogaKit YGLayout 特有，为了能在计算时候获取视图，- sizeThatFits: 后返回给 measure 函数，因此加入，未来如果实现了抽象计算，则可以去掉这个功能
 */
@property (nonatomic, weak, nullable) UIView *view;

/**
 * Computed layout of the view.
 */
@property (nonatomic, assign) HMLayoutMetrics layoutMetrics;

#pragma mark - Layout

/**
 * Initiates layout starts from the view.
 */
- (void)layoutWithMinimumSize:(CGSize)minimumSize
                  maximumSize:(CGSize)maximumSize
              layoutDirection:(UIUserInterfaceLayoutDirection)layoutDirection
                layoutContext:(HMLayoutContext)layoutContext;

/**
 * Applies computed layout metrics to the view.
 */
- (BOOL)layoutWithMetrics:(HMLayoutMetrics)layoutMetrics layoutContext:(HMLayoutContext)layoutContext;

/**
 * Calculates (if needed) and applies layout to subviews.
 */
- (nullable NSArray <HMRenderObject *>*)layoutSubviewsWithContext:(HMLayoutContext)layoutContext;

/**
 * Measures shadow view without side-effects.
 * Default implementation uses Yoga for measuring.
 */
- (CGSize)sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize;


/// 计算自身在最大大小约束下自适应（基于 Yoga 的自适应）的宽高情况
/// 注意：不要把它和 iOS 系统提供的 - sizeThatFits: 或者 intrinsicContentSize 混同起来，因为如果 Yoga 样式设置了 width 或者 height 等参数（min/max），会导致直接按照 Yoga 样式计算返回，而不是走真正的计算流程
/// @param maximumSize 最大的大小，使用 CoreGraphics CGFloat
- (CGSize)sizeThatFitsMaximumSize:(CGSize)maximumSize;

/**
 * Returns whether or not this node acts as a leaf node in the eyes of Yoga.
 * For example `RCTTextShadowView` has children which it does not want Yoga
 * to lay out so in the eyes of Yoga it is a leaf node.
 * Defaults to `NO`. Can be overridden in subclasses.
 * Don't confuse this with `canHaveSubviews`.
 */
- (BOOL)isYogaLeafNode;

#pragma mark - 子视图管理，未来不依赖布局 attach 子视图的时候需要

/**
 * @brief 管理子视图核心方法
 * @param view renderObject
 * @param index iOS 使用 NSInteger，实际上是错误的，这里做了修改
 */
- (void)insertSubview:(HMRenderObject *)view atIndex:(NSUInteger)index NS_REQUIRES_SUPER;

/**
 * @brief 管理子视图核心方法
 * @param subview renderObject
 */
- (void)removeSubview:(HMRenderObject *)subview NS_REQUIRES_SUPER;

- (void)removeAllSubviews NS_REQUIRES_SUPER;

- (void)addSubview:(HMRenderObject *)subview;

- (BOOL)hasExactSameChildren:(nullable NSArray<__kindof HMRenderObject *> *)children;

/**
 * Computes the recursive offset, meaning the sum of all descendant offsets -
 * this is the sum of all positions inset from parents. This is not merely the
 * sum of `top`/`left`s, as this function uses the *actual* positions of
 * children, not the style specified positions - it computes this based on the
 * resulting layout. It does not yet compensate for native scroll view insets or
 * transforms or anchor points.
 */
- (CGRect)measureLayoutRelativeToAncestor:(HMRenderObject *)ancestor;

/**
 * Checks if the current shadow view is a descendant of the provided `ancestor`
 */
- (BOOL)viewIsDescendantOf:(HMRenderObject *)ancestor;

@end

NS_ASSUME_NONNULL_END
