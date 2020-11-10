//
//  HMShadowView.m
//  yogaDemo1
//
//  Created by didi on 2020/9/17.
//  Copyright © 2020 didi. All rights reserved.
//

#import "HMRenderObject.h"
#import "HMUtility.h"
#import "HMYogaUtility.h"
#import "UIView+HMRenderObject.h"

NS_ASSUME_NONNULL_BEGIN

static void HMPrint(YGNodeRef node) __attribute__((unused));

@interface HMRenderObject ()

@end

NS_ASSUME_NONNULL_END

@implementation HMRenderObject

static void HMPrint(YGNodeRef node) {
    HMRenderObject *shadowView = (__bridge HMRenderObject *) YGNodeGetContext(node);
    HMLogDebug(@"%@", shadowView.view);
}

#define HM_SET_YGVALUE(ygvalue, setter, ...)      \
  switch (ygvalue.unit) {                          \
    case YGUnitAuto:                               \
    case YGUnitUndefined:                          \
      setter(__VA_ARGS__, YGUndefined);            \
      break;                                       \
    case YGUnitPoint:                              \
      setter(__VA_ARGS__, ygvalue.value);          \
      break;                                       \
    case YGUnitPercent:                            \
      setter##Percent(__VA_ARGS__, ygvalue.value); \
      break;                                       \
  }

#define HM_SET_YGVALUE_AUTO(ygvalue, setter, ...) \
  switch (ygvalue.unit) {                          \
    case YGUnitAuto:                               \
      setter##Auto(__VA_ARGS__);                   \
      break;                                       \
    case YGUnitUndefined:                          \
      setter(__VA_ARGS__, YGUndefined);            \
      break;                                       \
    case YGUnitPoint:                              \
      setter(__VA_ARGS__, ygvalue.value);          \
      break;                                       \
    case YGUnitPercent:                            \
      setter##Percent(__VA_ARGS__, ygvalue.value); \
      break;                                       \
  }

+ (YGConfigRef)yogaConfig {
    static YGConfigRef yogaConfig;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        yogaConfig = YGConfigNew();
        YGConfigSetPointScaleFactor(yogaConfig, (float) HMScreenScale());
        YGConfigSetUseLegacyStretchBehaviour(yogaConfig, true);
    });

    return yogaConfig;
}

- (instancetype)init {
    if (self = [super init]) {
        _intrinsicContentSize = CGSizeMake(UIViewNoIntrinsicMetric, UIViewNoIntrinsicMetric);

        _yogaNode = YGNodeNewWithConfig([[self class] yogaConfig]);
        YGNodeSetContext(_yogaNode, (__bridge void *) self);
//        YGNodeSetPrintFunc(_yogaNode, HMPrint);
    }

    return self;
}

- (void)dealloc {
    YGNodeFree(_yogaNode);
}

- (BOOL)isYogaLeafNode {
    return NO;
}

- (void)insertSubview:(HMRenderObject *)view atIndex:(NSUInteger)index {
//    HMAssert(self.canHaveSubviews, @"Attempt to insert subview inside leaf view.");
    if (![self isYogaLeafNode]) {
        YGNodeInsertChild(_yogaNode, view.yogaNode, (uint32_t) index);
    }
}

- (void)removeSubview:(HMRenderObject *)subview {
    if (![self isYogaLeafNode]) {
        YGNodeRemoveChild(_yogaNode, subview.yogaNode);
    }
}

#pragma mark - Layout

- (void)layoutWithMinimumSize:(CGSize)minimumSize
                  maximumSize:(CGSize)maximumSize
              layoutDirection:(UIUserInterfaceLayoutDirection)layoutDirection
                layoutContext:(HMLayoutContext)layoutContext {
    YGNodeRef yogaNode = _yogaNode;

    CGSize oldMinimumSize = (CGSize) {HMCoreGraphicsFloatFromYogaValue(YGNodeStyleGetMinWidth(yogaNode), 0.0),
            HMCoreGraphicsFloatFromYogaValue(YGNodeStyleGetMinHeight(yogaNode), 0.0)};

    if (!CGSizeEqualToSize(oldMinimumSize, minimumSize)) {
        YGNodeStyleSetMinWidth(yogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.width));
        YGNodeStyleSetMinHeight(yogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.height));
    }

    YGNodeCalculateLayout(
            yogaNode,
            HMYogaFloatFromCoreGraphicsFloat(maximumSize.width),
            HMYogaFloatFromCoreGraphicsFloat(maximumSize.height),
            HMYogaLayoutDirectionFromUIKitLayoutDirection(layoutDirection));

    HMAssert(!YGNodeIsDirty(yogaNode), @"Attempt to get layout metrics from dirtied Yoga node.");

    if (!YGNodeGetHasNewLayout(yogaNode)) {
        return;
    }

    YGNodeSetHasNewLayout(yogaNode, false);

    HMLayoutMetrics layoutMetrics = HMLayoutMetricsFromYogaNode(yogaNode);

    layoutContext.absolutePosition.x += layoutMetrics.frame.origin.x;
    layoutContext.absolutePosition.y += layoutMetrics.frame.origin.y;

    [self layoutWithMetrics:layoutMetrics layoutContext:layoutContext];

    [self layoutSubviewsWithContext:layoutContext];
}

- (void)layoutWithMetrics:(HMLayoutMetrics)layoutMetrics layoutContext:(HMLayoutContext)layoutContext {
    if (!HMLayoutMetricsEqualToLayoutMetrics(self.layoutMetrics, layoutMetrics)) {
        self.layoutMetrics = layoutMetrics;
        [layoutContext.affectedShadowViews addObject:self];
    }
}

- (void)layoutSubviewsWithContext:(HMLayoutContext)layoutContext {
    HMLayoutMetrics layoutMetrics = self.layoutMetrics;
    if (layoutMetrics.displayType == HMDisplayTypeNone) {
        return;
    }

    for (HMRenderObject *childShadowView in self.subviews) {
        YGNodeRef childYogaNode = childShadowView.yogaNode;

        HMAssert(!YGNodeIsDirty(childYogaNode), @"Attempt to get layout metrics from dirtied Yoga node.");

        if (!YGNodeGetHasNewLayout(childYogaNode)) {
            continue;
        }

        YGNodeSetHasNewLayout(childYogaNode, false);

        HMLayoutMetrics childLayoutMetrics = HMLayoutMetricsFromYogaNode(childYogaNode);

        layoutContext.absolutePosition.x += childLayoutMetrics.frame.origin.x;
        layoutContext.absolutePosition.y += childLayoutMetrics.frame.origin.y;

        [childShadowView layoutWithMetrics:childLayoutMetrics layoutContext:layoutContext];

        // Recursive call.
        [childShadowView layoutSubviewsWithContext:layoutContext];
    }
}

- (void)markDirty {

}

- (CGSize)sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize {
    YGNodeRef clonedYogaNode = YGNodeClone(self.yogaNode);
    YGNodeRef constraintYogaNode = YGNodeNewWithConfig([[self class] yogaConfig]);

    YGNodeInsertChild(constraintYogaNode, clonedYogaNode, 0);

    YGNodeStyleSetMinWidth(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.width));
    YGNodeStyleSetMinHeight(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.height));
    YGNodeStyleSetMaxWidth(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(maximumSize.width));
    YGNodeStyleSetMaxHeight(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(maximumSize.height));

    YGNodeCalculateLayout(
            constraintYogaNode,
            YGUndefined,
            YGUndefined,
            HMYogaLayoutDirectionFromUIKitLayoutDirection(self.layoutMetrics.layoutDirection));

    CGSize measuredSize = (CGSize) {
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetWidth(constraintYogaNode)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetHeight(constraintYogaNode)),
    };
    // 如果使用如下代码会泄漏
//    YGNodeRemoveChild(constraintYogaNode, clonedYogaNode);
//    YGNodeFree(constraintYogaNode);
//    YGNodeFree(clonedYogaNode);
    // 使用以下代码会过度释放
//    YGNodeFreeRecursive(constraintYogaNode);
    hm_yoga_node_free_recursive(constraintYogaNode);

    return measuredSize;
}

// Dimensions
#define HM_DIMENSION_PROPERTY(setProp, getProp, cssProp)            \
  -(void)set##setProp : (YGValue)value                               \
  {                                                                  \
    HM_SET_YGVALUE_AUTO(value, YGNodeStyleSet##cssProp, _yogaNode); \
  }                                                                  \
  -(YGValue)getProp                                                  \
  {                                                                  \
    return YGNodeStyleGet##cssProp(_yogaNode);                       \
  }

#define HM_MIN_MAX_DIMENSION_PROPERTY(setProp, getProp, cssProp) \
  -(void)set##setProp : (YGValue)value                            \
  {                                                               \
    HM_SET_YGVALUE(value, YGNodeStyleSet##cssProp, _yogaNode);   \
  }                                                               \
  -(YGValue)getProp                                               \
  {                                                               \
    return YGNodeStyleGet##cssProp(_yogaNode);                    \
  }

HM_DIMENSION_PROPERTY(Width, width, Width)

HM_DIMENSION_PROPERTY(Height, height, Height)

HM_MIN_MAX_DIMENSION_PROPERTY(MinWidth, minWidth, MinWidth)

HM_MIN_MAX_DIMENSION_PROPERTY(MinHeight, minHeight, MinHeight)

HM_MIN_MAX_DIMENSION_PROPERTY(MaxWidth, maxWidth, MaxWidth)

HM_MIN_MAX_DIMENSION_PROPERTY(MaxHeight, maxHeight, MaxHeight)

// Position

#define HM_POSITION_PROPERTY(setProp, getProp, edge)                \
  -(void)set##setProp : (YGValue)value                               \
  {                                                                  \
    HM_SET_YGVALUE(value, YGNodeStyleSetPosition, _yogaNode, edge); \
  }                                                                  \
  -(YGValue)getProp                                                  \
  {                                                                  \
    return YGNodeStyleGetPosition(_yogaNode, edge);                  \
  }

HM_POSITION_PROPERTY(Left, left, YGEdgeLeft)

HM_POSITION_PROPERTY(Right, right, YGEdgeRight)

HM_POSITION_PROPERTY(Top, top, YGEdgeTop)

HM_POSITION_PROPERTY(Bottom, bottom, YGEdgeBottom)

HM_POSITION_PROPERTY(Start, start, YGEdgeStart)

HM_POSITION_PROPERTY(End, end, YGEdgeEnd)

// IntrinsicContentSize

static inline YGSize
HMShadowViewMeasure(YGNodeRef node, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode) {
    HMRenderObject *shadowView = (__bridge HMRenderObject *) YGNodeGetContext(node);

    CGSize intrinsicContentSize = shadowView->_intrinsicContentSize;
    // Replace `UIViewNoIntrinsicMetric` (which equals `-1`) with zero.
    intrinsicContentSize.width = MAX(0, intrinsicContentSize.width);
    intrinsicContentSize.height = MAX(0, intrinsicContentSize.height);

    // 修复 AppCode 警告
    YGSize result = {
            0,
            0
    };

    switch (widthMode) {
        case YGMeasureModeUndefined:
            result.width = (float) intrinsicContentSize.width;
            break;
        case YGMeasureModeExactly:
            result.width = width;
            break;
        case YGMeasureModeAtMost:
            result.width = (float) MIN(width, intrinsicContentSize.width);
            break;
    }

    switch (heightMode) {
        case YGMeasureModeUndefined:
            result.height = (float) intrinsicContentSize.height;
            break;
        case YGMeasureModeExactly:
            result.height = height;
            break;
        case YGMeasureModeAtMost:
            result.height = (float) MIN(height, intrinsicContentSize.height);
            break;
    }

    return result;
}

- (UIEdgeInsets)paddingAsInsets {
    YGNodeRef yogaNode = self.yogaNode;
    return (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeTop)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeLeft)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeBottom)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeRight))};
}

- (UIEdgeInsets)borderAsInsets {
    YGNodeRef yogaNode = self.yogaNode;
    return (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeTop)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeLeft)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeBottom)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeRight))};
}

- (UIEdgeInsets)compoundInsets {
    UIEdgeInsets borderAsInsets = self.borderAsInsets;
    UIEdgeInsets paddingAsInsets = self.paddingAsInsets;

    return (UIEdgeInsets) {borderAsInsets.top + paddingAsInsets.top,
            borderAsInsets.left + paddingAsInsets.left,
            borderAsInsets.bottom + paddingAsInsets.bottom,
            borderAsInsets.right + paddingAsInsets.right};
}

- (CGSize)availableSize {
    return self.layoutMetrics.contentFrame.size;
}

- (CGRect)contentFrame {
    return self.layoutMetrics.contentFrame;
}

- (void)setIntrinsicContentSize:(CGSize)intrinsicContentSize {
    if (CGSizeEqualToSize(_intrinsicContentSize, intrinsicContentSize)) {
        return;
    }

    _intrinsicContentSize = intrinsicContentSize;

    if (CGSizeEqualToSize(_intrinsicContentSize, CGSizeMake(UIViewNoIntrinsicMetric, UIViewNoIntrinsicMetric))) {
        YGNodeSetMeasureFunc(_yogaNode, NULL);
    } else {
        YGNodeSetMeasureFunc(_yogaNode, HMShadowViewMeasure);
    }

    YGNodeMarkDirty(_yogaNode);
}

// Flex

- (void)setFlexBasis:(YGValue)value {
    HM_SET_YGVALUE_AUTO(value, YGNodeStyleSetFlexBasis, _yogaNode);
}

- (YGValue)flexBasis {
    return YGNodeStyleGetFlexBasis(_yogaNode);
}

#define HM_STYLE_PROPERTY(setProp, getProp, cssProp, type) \
  -(void)set##setProp : (type)value                         \
  {                                                         \
    YGNodeStyleSet##cssProp(_yogaNode, value);              \
  }                                                         \
  -(type)getProp                                            \
  {                                                         \
    return YGNodeStyleGet##cssProp(_yogaNode);              \
  }

HM_STYLE_PROPERTY(Flex, flex, Flex, CGFloat)

HM_STYLE_PROPERTY(FlexGrow, flexGrow, FlexGrow, CGFloat)

HM_STYLE_PROPERTY(FlexShrink, flexShrink, FlexShrink, CGFloat)

HM_STYLE_PROPERTY(FlexDirection, flexDirection, FlexDirection, YGFlexDirection)

HM_STYLE_PROPERTY(JustifyContent, justifyContent, JustifyContent, YGJustify)

HM_STYLE_PROPERTY(AlignSelf, alignSelf, AlignSelf, YGAlign)

HM_STYLE_PROPERTY(AlignItems, alignItems, AlignItems, YGAlign)

HM_STYLE_PROPERTY(AlignContent, alignContent, AlignContent, YGAlign)

HM_STYLE_PROPERTY(Position, position, PositionType, YGPositionType)

HM_STYLE_PROPERTY(FlexWrap, flexWrap, FlexWrap, YGWrap)

HM_STYLE_PROPERTY(Overflow, overflow, Overflow, YGOverflow)

HM_STYLE_PROPERTY(Display, display, Display, YGDisplay)

HM_STYLE_PROPERTY(Direction, direction, Direction, YGDirection)

HM_STYLE_PROPERTY(AspectRatio, aspectRatio, AspectRatio, CGFloat)

- (void)addSubview:(HMRenderObject *)subview {
    [self insertSubview:subview atIndex:YGNodeGetChildCount(self.yogaNode)];
}

- (void)removeAllSubviews {
    YGNodeRemoveAllChildren(self.yogaNode);
}

- (NSArray<HMRenderObject *> *)subviews {
    NSMutableArray<HMRenderObject *> *subviewArray = nil;
    uint32_t count = YGNodeGetChildCount(self.yogaNode);
    for (uint32_t i = 0; i < count; ++i) {
        YGNodeRef childNodeRef = YGNodeGetChild(self.yogaNode, i);
        HMRenderObject *renderObject = (__bridge HMRenderObject *) YGNodeGetContext(childNodeRef);
        if (!subviewArray) {
            subviewArray = [NSMutableArray arrayWithCapacity:count];
        }
        [subviewArray addObject:renderObject];
    }

    return subviewArray.copy;
}

- (NSUInteger)numberOfChildren {
    return YGNodeGetChildCount(self.yogaNode);
}

- (BOOL)isLeaf {
    NSAssert([NSThread isMainThread], @"This method must be called on the main thread.");
//    if (self.isEnabled) {
    for (UIView *subview in self.view.subviews) {
        if (subview.isHmLayoutEnabled) {
            return NO;
        }
    }
//    }

    return YES;
}

- (BOOL)isDirty {
    return YGNodeIsDirty(self.yogaNode);
}

- (BOOL)hasExactSameChildren:(NSArray<__kindof HMRenderObject *> *)children {
    if (YGNodeGetChildCount(self.yogaNode) != children.count) {
        return NO;
    }

    for (int i = 0; i < children.count; i++) {
        if (YGNodeGetChild(self.yogaNode, (uint32_t) i) != children[(NSUInteger) i].yogaNode) {
            return NO;
        }
    }

    return YES;
}

- (CGRect)measureLayoutRelativeToAncestor:(HMRenderObject *)ancestor {
    CGPoint offset = CGPointZero;
    HMRenderObject *shadowView = self;
    while (shadowView && shadowView != ancestor) {
        offset.x += shadowView.layoutMetrics.frame.origin.x;
        offset.y += shadowView.layoutMetrics.frame.origin.y;
#if __has_include(<yoga/Yoga.h>)
        YGNodeRef nodeRef = YGNodeGetOwner(shadowView.yogaNode);
#elif __has_include(<YogaKit/Yoga.h>)
        YGNodeRef nodeRef = YGNodeGetParent(shadowView.yogaNode);
#endif
        if (nodeRef) {
            shadowView = (__bridge HMRenderObject *) YGNodeGetContext(nodeRef);
        } else {
            shadowView = nil;
        }
//        shadowView = shadowView->_superview;
    }
    if (ancestor != shadowView) {
        return CGRectNull;
    }

    return (CGRect) {offset, self.layoutMetrics.frame.size};

}

- (BOOL)viewIsDescendantOf:(HMRenderObject *)ancestor {
    HMRenderObject *shadowView = self;
    while (shadowView && shadowView != ancestor) {
#if __has_include(<yoga/Yoga.h>)
        YGNodeRef nodeRef = YGNodeGetOwner(shadowView.yogaNode);
#elif __has_include(<YogaKit/Yoga.h>)
        YGNodeRef nodeRef = YGNodeGetParent(shadowView.yogaNode);
#endif
        if (nodeRef) {
            shadowView = (__bridge HMRenderObject *) YGNodeGetContext(nodeRef);
        } else {
            shadowView = nil;
        }
//        shadowView = shadowView->_superview;
    }
    return ancestor == shadowView;
}

#pragma mark - YogaKit 复制代码

#define YG_EDGE_PROPERTY_GETTER(type, lowercased_name, capitalized_name, property, edge) \
- (type)lowercased_name                                                                  \
{                                                                                        \
  return YGNodeStyleGet##property(self.yogaNode, edge);                                      \
}

#define YG_EDGE_PROPERTY_SETTER(lowercased_name, capitalized_name, property, edge) \
- (void)set##capitalized_name:(CGFloat)lowercased_name                             \
{                                                                                  \
  YGNodeStyleSet##property(self.yogaNode, edge, lowercased_name);                      \
}

#define YG_EDGE_PROPERTY(lowercased_name, capitalized_name, property, edge)         \
YG_EDGE_PROPERTY_GETTER(CGFloat, lowercased_name, capitalized_name, property, edge) \
YG_EDGE_PROPERTY_SETTER(lowercased_name, capitalized_name, property, edge)

#define YG_VALUE_EDGE_PROPERTY_SETTER(objc_lowercased_name, objc_capitalized_name, c_name, edge) \
- (void)set##objc_capitalized_name:(YGValue)objc_lowercased_name                                 \
{                                                                                                \
  switch (objc_lowercased_name.unit) {                                                           \
    case YGUnitUndefined:                                                                        \
      YGNodeStyleSet##c_name(self.yogaNode, edge, objc_lowercased_name.value);                       \
      break;                                                                                     \
    case YGUnitPoint:                                                                            \
      YGNodeStyleSet##c_name(self.yogaNode, edge, objc_lowercased_name.value);                       \
      break;                                                                                     \
    case YGUnitPercent:                                                                          \
      YGNodeStyleSet##c_name##Percent(self.yogaNode, edge, objc_lowercased_name.value);              \
      break;                                                                                     \
    default:                                                                                     \
      NSAssert(NO, @"Not implemented");                                                          \
  }                                                                                              \
}

#define YG_VALUE_EDGE_PROPERTY(lowercased_name, capitalized_name, property, edge)   \
YG_EDGE_PROPERTY_GETTER(YGValue, lowercased_name, capitalized_name, property, edge) \
YG_VALUE_EDGE_PROPERTY_SETTER(lowercased_name, capitalized_name, property, edge)

#define YG_VALUE_EDGES_PROPERTIES(lowercased_name, capitalized_name)                                                  \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Left, capitalized_name##Left, capitalized_name, YGEdgeLeft)                   \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Top, capitalized_name##Top, capitalized_name, YGEdgeTop)                      \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Right, capitalized_name##Right, capitalized_name, YGEdgeRight)                \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Bottom, capitalized_name##Bottom, capitalized_name, YGEdgeBottom)             \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Start, capitalized_name##Start, capitalized_name, YGEdgeStart)                \
YG_VALUE_EDGE_PROPERTY(lowercased_name##End, capitalized_name##End, capitalized_name, YGEdgeEnd)                      \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Horizontal, capitalized_name##Horizontal, capitalized_name, YGEdgeHorizontal) \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Vertical, capitalized_name##Vertical, capitalized_name, YGEdgeVertical)       \
YG_VALUE_EDGE_PROPERTY(lowercased_name, capitalized_name, capitalized_name, YGEdgeAll)

YG_VALUE_EDGES_PROPERTIES(margin, Margin)

YG_VALUE_EDGES_PROPERTIES(padding, Padding)

YG_EDGE_PROPERTY(borderLeftWidth, BorderLeftWidth, Border, YGEdgeLeft)

YG_EDGE_PROPERTY(borderTopWidth, BorderTopWidth, Border, YGEdgeTop)

YG_EDGE_PROPERTY(borderRightWidth, BorderRightWidth, Border, YGEdgeRight)

YG_EDGE_PROPERTY(borderBottomWidth, BorderBottomWidth, Border, YGEdgeBottom)

YG_EDGE_PROPERTY(borderStartWidth, BorderStartWidth, Border, YGEdgeStart)

YG_EDGE_PROPERTY(borderEndWidth, BorderEndWidth, Border, YGEdgeEnd)

YG_EDGE_PROPERTY(borderWidth, BorderWidth, Border, YGEdgeAll)

@end
