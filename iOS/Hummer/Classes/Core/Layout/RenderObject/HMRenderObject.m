//
//  HMShadowView.m
//  yogaDemo1
//
//  Created by didi on 2020/9/17.
//  Copyright © 2020 didi. All rights reserved.
//

#import "HMRenderObject.h"
#import "HMUtility.h"
#import "UIView+HMRenderObject.h"
#import "HMUIManager.h"

NS_ASSUME_NONNULL_BEGIN

static void HMPrint(YOGA_TYPE_WRAPPER(YGNodeRef) node) __attribute__((unused));

@interface HMRenderObject ()

@end

NS_ASSUME_NONNULL_END

@implementation HMRenderObject

static void HMPrint(YOGA_TYPE_WRAPPER(YGNodeRef) node) {
    HMRenderObject *shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(node);
    HMLogDebug(@"%@", shadowView.view);
}

#if __has_include(<yoga/FINYoga.h>)
#define HM_SET_YGVALUE(ygvalue, setter, ...)      \
  switch (ygvalue.unit) {                          \
    case YOGA_TYPE_WRAPPER(YGUnitAuto):                               \
    case YOGA_TYPE_WRAPPER(YGUnitUndefined):                          \
      FIN##setter(__VA_ARGS__, YOGA_TYPE_WRAPPER(YGUndefined));            \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPoint):                              \
      FIN##setter(__VA_ARGS__, ygvalue.value);          \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPercent):                            \
      FIN##setter##Percent(__VA_ARGS__, ygvalue.value); \
      break;                                       \
  }

#define HM_SET_YGVALUE_AUTO(ygvalue, setter, ...) \
  switch (ygvalue.unit) {                          \
    case YOGA_TYPE_WRAPPER(YGUnitAuto):                               \
      FIN##setter##Auto(__VA_ARGS__);                   \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitUndefined):                          \
      FIN##setter(__VA_ARGS__, YOGA_TYPE_WRAPPER(YGUndefined));            \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPoint):                              \
      FIN##setter(__VA_ARGS__, ygvalue.value);          \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPercent):                            \
      FIN##setter##Percent(__VA_ARGS__, ygvalue.value); \
      break;                                       \
  }
#elif __has_include(<yoga/Yoga.h>)
#define HM_SET_YGVALUE(ygvalue, setter, ...)      \
  switch (ygvalue.unit) {                          \
    case YOGA_TYPE_WRAPPER(YGUnitAuto):                               \
    case YOGA_TYPE_WRAPPER(YGUnitUndefined):                          \
      setter(__VA_ARGS__, YOGA_TYPE_WRAPPER(YGUndefined));            \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPoint):                              \
      setter(__VA_ARGS__, ygvalue.value);          \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPercent):                            \
      setter##Percent(__VA_ARGS__, ygvalue.value); \
      break;                                       \
  }

#define HM_SET_YGVALUE_AUTO(ygvalue, setter, ...) \
  switch (ygvalue.unit) {                          \
    case YOGA_TYPE_WRAPPER(YGUnitAuto):                               \
      setter##Auto(__VA_ARGS__);                   \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitUndefined):                          \
      setter(__VA_ARGS__, YOGA_TYPE_WRAPPER(YGUndefined));            \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPoint):                              \
      setter(__VA_ARGS__, ygvalue.value);          \
      break;                                       \
    case YOGA_TYPE_WRAPPER(YGUnitPercent):                            \
      setter##Percent(__VA_ARGS__, ygvalue.value); \
      break;                                       \
  }
#endif

+ (YOGA_TYPE_WRAPPER(YGConfigRef))yogaConfig {
    static YOGA_TYPE_WRAPPER(YGConfigRef) yogaConfig;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        yogaConfig = YOGA_TYPE_WRAPPER(YGConfigNew)();
        YOGA_TYPE_WRAPPER(YGConfigSetPointScaleFactor)(yogaConfig, (float) UIScreen.mainScreen.scale);
    });

    return yogaConfig;
}

- (instancetype)init {
    if (self = [super init]) {
        _intrinsicContentSize = CGSizeMake(UIViewNoIntrinsicMetric, UIViewNoIntrinsicMetric);

        _yogaNode = YOGA_TYPE_WRAPPER(YGNodeNewWithConfig)([[self class] yogaConfig]);
        YOGA_TYPE_WRAPPER(YGNodeSetContext)(_yogaNode, (__bridge void *) self);
//        YGNodeSetPrintFunc(_yogaNode, HMPrint);
    }

    return self;
}

- (void)dealloc {
    YOGA_TYPE_WRAPPER(YGNodeFree)(_yogaNode);
}

- (BOOL)isYogaLeafNode {
    return NO;
}

- (void)insertSubview:(HMRenderObject *)view atIndex:(NSUInteger)index {
//    HMAssert(self.canHaveSubviews, @"Attempt to insert subview inside leaf view.");
    if (![self isYogaLeafNode]) {
        YOGA_TYPE_WRAPPER(YGNodeInsertChild)(_yogaNode, view.yogaNode, (uint32_t) index);
    }
}

- (void)removeSubview:(HMRenderObject *)subview {
    if (![self isYogaLeafNode]) {
        YOGA_TYPE_WRAPPER(YGNodeRemoveChild)(_yogaNode, subview.yogaNode);
    }
}

#pragma mark - Layout

- (void)layoutWithMinimumSize:(CGSize)minimumSize
                  maximumSize:(CGSize)maximumSize
              layoutDirection:(UIUserInterfaceLayoutDirection)layoutDirection
                layoutContext:(HMLayoutContext)layoutContext {
    YOGA_TYPE_WRAPPER(YGNodeRef) yogaNode = _yogaNode;

    CGSize oldMinimumSize = (CGSize) {HMCoreGraphicsFloatFromYogaValue(YOGA_TYPE_WRAPPER(YGNodeStyleGetMinWidth)(yogaNode), 0.0),
            HMCoreGraphicsFloatFromYogaValue(YOGA_TYPE_WRAPPER(YGNodeStyleGetMinHeight)(yogaNode), 0.0)};

    if (!CGSizeEqualToSize(oldMinimumSize, minimumSize)) {
        YOGA_TYPE_WRAPPER(YGNodeStyleSetMinWidth)(yogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.width));
        YOGA_TYPE_WRAPPER(YGNodeStyleSetMinHeight)(yogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.height));
    }

    YOGA_TYPE_WRAPPER(YGNodeCalculateLayout)(
            yogaNode,
            HMYogaFloatFromCoreGraphicsFloat(maximumSize.width),
            HMYogaFloatFromCoreGraphicsFloat(maximumSize.height),
            HMYogaLayoutDirectionFromUIKitLayoutDirection(layoutDirection));

    HMAssert(!YOGA_TYPE_WRAPPER(YGNodeIsDirty)(yogaNode), @"Attempt to get layout metrics from dirtied Yoga node.");

    if (!YOGA_TYPE_WRAPPER(YGNodeGetHasNewLayout)(yogaNode)) {
        return;
    }

    YOGA_TYPE_WRAPPER(YGNodeSetHasNewLayout)(yogaNode, false);

    HMLayoutMetrics layoutMetrics = HMLayoutMetricsFromYogaNode(yogaNode);

    layoutContext.absolutePosition.x += layoutMetrics.frame.origin.x;
    layoutContext.absolutePosition.y += layoutMetrics.frame.origin.y;

    [self layoutWithMetrics:layoutMetrics layoutContext:layoutContext];

    [self layoutSubviewsWithContext:layoutContext];
}

- (BOOL)layoutWithMetrics:(HMLayoutMetrics)layoutMetrics layoutContext:(HMLayoutContext)layoutContext {
    if (!HMLayoutMetricsEqualToLayoutMetrics(self.layoutMetrics, layoutMetrics)) {
        self.layoutMetrics = layoutMetrics;
        [layoutContext.affectedShadowViews addObject:self];
        return YES;
    }
    return NO;
}
// 返回当前节点下，是否存在子节点需要更新布局。
// 在某些场景下(scroll)，虽然当前容器的布局可能未发生改变，但需要更新内部布局(contentSize)

- (nullable NSArray <HMRenderObject *> *)layoutSubviewsWithContext:(HMLayoutContext)layoutContext {
    HMLayoutMetrics layoutMetrics = self.layoutMetrics;

    // YGZeroOutLayoutRecursivly 递归设置 { 0, 0 } 后，如果是 absolute 元素，按照原来的 YogaKit 逻辑还是可能继续显示的
    if (layoutMetrics.displayType == HMDisplayTypeNone) {
        return nil;
    }
    NSMutableArray *affectedObjects = [NSMutableArray new];
    for (HMRenderObject *childShadowView in self.subviews) {
        YOGA_TYPE_WRAPPER(YGNodeRef) childYogaNode = childShadowView.yogaNode;

        // 防止兼容模式在 Debug 包下走该断言，详情见 http://git.xiaojukeji.com/Hummer/hummer-ios/issues/51
        if (!HMUseDoubleAttributeControlHidden) {
            HMAssert(!YOGA_TYPE_WRAPPER(YGNodeIsDirty)(childYogaNode), @"Attempt to get layout metrics from dirtied Yoga node.");
        }

        if (!YOGA_TYPE_WRAPPER(YGNodeGetHasNewLayout)(childYogaNode)) {
            continue;
        }

        YOGA_TYPE_WRAPPER(YGNodeSetHasNewLayout)(childYogaNode, false);

        HMLayoutMetrics childLayoutMetrics = HMLayoutMetricsFromYogaNode(childYogaNode);

        layoutContext.absolutePosition.x += childLayoutMetrics.frame.origin.x;
        layoutContext.absolutePosition.y += childLayoutMetrics.frame.origin.y;
        if ([childShadowView layoutWithMetrics:childLayoutMetrics layoutContext:layoutContext]) {
            [affectedObjects addObject:childShadowView];
        }

        // Recursive call.
        NSArray *childAffectedObjects = [childShadowView layoutSubviewsWithContext:layoutContext];
        if (childAffectedObjects.count > 0) {
            [affectedObjects addObjectsFromArray:childAffectedObjects];
        }
    }
    return affectedObjects;
}

- (void)markDirty {

}

- (CGSize)sizeThatFitsMaximumSize:(CGSize)maximumSize {
    return [self sizeThatFitsMinimumSize:CGSizeZero maximumSize:maximumSize];
}

- (CGSize)sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize {
    YOGA_TYPE_WRAPPER(YGNodeRef) clonedYogaNode = YOGA_TYPE_WRAPPER(YGNodeClone)(self.yogaNode);
    
    if (HMGetSizeThatFitsMode() == HMSizeThatFitsModePreferNative) {
        YOGA_TYPE_WRAPPER(YGValue) width = YOGA_TYPE_WRAPPER(YGNodeStyleGetWidth(clonedYogaNode));
        if (width.unit == YOGA_TYPE_WRAPPER(YGUnitPercent)) {
            YOGA_TYPE_WRAPPER(YGNodeStyleSetWidthAuto)(clonedYogaNode);
        }
        YOGA_TYPE_WRAPPER(YGValue) height = YOGA_TYPE_WRAPPER(YGNodeStyleGetHeight(clonedYogaNode));
        if (height.unit == YOGA_TYPE_WRAPPER(YGUnitPercent)) {
            YOGA_TYPE_WRAPPER(YGNodeStyleSetHeightAuto)(clonedYogaNode);
        }
        YOGA_TYPE_WRAPPER(YGValue) minWidth = YOGA_TYPE_WRAPPER(YGNodeStyleGetMinWidth(clonedYogaNode));
        if (minWidth.unit == YOGA_TYPE_WRAPPER(YGUnitPercent)) {
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMinWidth)(clonedYogaNode, YOGA_TYPE_WRAPPER(YGUndefined));
        }
        YOGA_TYPE_WRAPPER(YGValue) minHeight = YOGA_TYPE_WRAPPER(YGNodeStyleGetMinHeight(clonedYogaNode));
        if (minHeight.unit == YOGA_TYPE_WRAPPER(YGUnitPercent)) {
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMinHeight)(clonedYogaNode, YOGA_TYPE_WRAPPER(YGUndefined));
        }
        YOGA_TYPE_WRAPPER(YGValue) maxWidth = YOGA_TYPE_WRAPPER(YGNodeStyleGetMaxWidth(clonedYogaNode));
        if (maxWidth.unit == YOGA_TYPE_WRAPPER(YGUnitPercent)) {
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMaxWidth)(clonedYogaNode, YOGA_TYPE_WRAPPER(YGUndefined));
        }
        YOGA_TYPE_WRAPPER(YGValue) maxHeight = YOGA_TYPE_WRAPPER(YGNodeStyleGetMaxHeight(clonedYogaNode));
        if (maxHeight.unit == YOGA_TYPE_WRAPPER(YGUnitPercent)) {
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMaxHeight)(clonedYogaNode, YOGA_TYPE_WRAPPER(YGUndefined));
        }
        YOGA_TYPE_WRAPPER(YGPositionType) position = YOGA_TYPE_WRAPPER(YGNodeStyleGetPositionType(clonedYogaNode));
        if (position == YOGA_TYPE_WRAPPER(YGPositionTypeAbsolute)) {
            YOGA_TYPE_WRAPPER(YGNodeStyleSetPositionType)(clonedYogaNode, YOGA_TYPE_WRAPPER(YGPositionTypeRelative));
        }
        // 不需要设置 bottom left right top，因为虽然相对布局会计算这些属性，但是由于当前只计算大小，所以不修改也没关系
    }
    
    YOGA_TYPE_WRAPPER(YGNodeRef) constraintYogaNode = YOGA_TYPE_WRAPPER(YGNodeNewWithConfig)([[self class] yogaConfig]);
    
    YOGA_TYPE_WRAPPER(YGNodeInsertChild)(constraintYogaNode, clonedYogaNode, 0);
    
    YOGA_TYPE_WRAPPER(YGNodeStyleSetMinWidth)(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.width));
    YOGA_TYPE_WRAPPER(YGNodeStyleSetMinHeight)(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.height));
    YOGA_TYPE_WRAPPER(YGNodeStyleSetMaxWidth)(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(maximumSize.width));
    YOGA_TYPE_WRAPPER(YGNodeStyleSetMaxHeight)(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(maximumSize.height));
    
    YOGA_TYPE_WRAPPER(YGNodeCalculateLayout)(constraintYogaNode, YOGA_TYPE_WRAPPER(YGUndefined), YOGA_TYPE_WRAPPER(YGUndefined), HMYogaLayoutDirectionFromUIKitLayoutDirection(self.layoutMetrics.layoutDirection));
    
    CGSize measuredSize = (CGSize){
        HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetWidth)(constraintYogaNode)),
        HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetHeight)(constraintYogaNode)),
    };

    HMYogaNodeFreeRecursive(constraintYogaNode);
    
    return measuredSize;
}

// Dimensions
#if __has_include(<yoga/FINYoga.h>)
#define HM_DIMENSION_PROPERTY(setProp, getProp, cssProp)            \
  -(void)set##setProp : (YOGA_TYPE_WRAPPER(YGValue))value                               \
  {                                                                  \
    HM_SET_YGVALUE_AUTO(value, YGNodeStyleSet##cssProp, _yogaNode); \
  }                                                                  \
  -(YOGA_TYPE_WRAPPER(YGValue))getProp                                                  \
  {                                                                  \
    return FINYGNodeStyleGet##cssProp(_yogaNode);                       \
  }

#define HM_MIN_MAX_DIMENSION_PROPERTY(setProp, getProp, cssProp) \
  -(void)set##setProp : (YOGA_TYPE_WRAPPER(YGValue))value                            \
  {                                                               \
    HM_SET_YGVALUE(value, YGNodeStyleSet##cssProp, _yogaNode);   \
  }                                                               \
  -(YOGA_TYPE_WRAPPER(YGValue))getProp                                               \
  {                                                               \
    return FINYGNodeStyleGet##cssProp(_yogaNode);                    \
  }
#elif __has_include(<yoga/Yoga.h>)
#define HM_DIMENSION_PROPERTY(setProp, getProp, cssProp)            \
  -(void)set##setProp : (YOGA_TYPE_WRAPPER(YGValue))value                               \
  {                                                                  \
    HM_SET_YGVALUE_AUTO(value, YGNodeStyleSet##cssProp, _yogaNode); \
  }                                                                  \
  -(YGValue)getProp                                                  \
  {                                                                  \
    return YGNodeStyleGet##cssProp(_yogaNode);                       \
  }

#define HM_MIN_MAX_DIMENSION_PROPERTY(setProp, getProp, cssProp) \
  -(void)set##setProp : (YOGA_TYPE_WRAPPER(YGValue))value                            \
  {                                                               \
    HM_SET_YGVALUE(value, YGNodeStyleSet##cssProp, _yogaNode);   \
  }                                                               \
  -(YOGA_TYPE_WRAPPER(YGValue))getProp                                               \
  {                                                               \
    return YGNodeStyleGet##cssProp(_yogaNode);                    \
  }
#endif

HM_DIMENSION_PROPERTY(Width, width, Width)

HM_DIMENSION_PROPERTY(Height, height, Height)

HM_MIN_MAX_DIMENSION_PROPERTY(MinWidth, minWidth, MinWidth)

HM_MIN_MAX_DIMENSION_PROPERTY(MinHeight, minHeight, MinHeight)

HM_MIN_MAX_DIMENSION_PROPERTY(MaxWidth, maxWidth, MaxWidth)

HM_MIN_MAX_DIMENSION_PROPERTY(MaxHeight, maxHeight, MaxHeight)

// Position

#if __has_include(<yoga/FINYoga.h>)
#define HM_POSITION_PROPERTY(setProp, getProp, edge)                \
  -(void)set##setProp : (YOGA_TYPE_WRAPPER(YGValue))value                               \
  {                                                                  \
    HM_SET_YGVALUE(value, YGNodeStyleSetPosition, _yogaNode, edge); \
  }                                                                  \
  -(YOGA_TYPE_WRAPPER(YGValue))getProp                                                  \
  {                                                                  \
    return FINYGNodeStyleGetPosition(_yogaNode, edge);                  \
  }
#elif __has_include(<yoga/Yoga.h>)
#define HM_POSITION_PROPERTY(setProp, getProp, edge)                \
  -(void)set##setProp : (YOGA_TYPE_WRAPPER(YGValue))value                               \
  {                                                                  \
    HM_SET_YGVALUE(value, YGNodeStyleSetPosition, _yogaNode, edge); \
  }                                                                  \
  -(YOGA_TYPE_WRAPPER(YGValue))getProp                                                  \
  {                                                                  \
    return YGNodeStyleGetPosition(_yogaNode, edge);                  \
  }
#endif

HM_POSITION_PROPERTY(Left, left, YOGA_TYPE_WRAPPER(YGEdgeLeft))

HM_POSITION_PROPERTY(Right, right, YOGA_TYPE_WRAPPER(YGEdgeRight))

HM_POSITION_PROPERTY(Top, top, YOGA_TYPE_WRAPPER(YGEdgeTop))

HM_POSITION_PROPERTY(Bottom, bottom, YOGA_TYPE_WRAPPER(YGEdgeBottom))

HM_POSITION_PROPERTY(Start, start, YOGA_TYPE_WRAPPER(YGEdgeStart))

HM_POSITION_PROPERTY(End, end, YOGA_TYPE_WRAPPER(YGEdgeEnd))

// IntrinsicContentSize

static inline YOGA_TYPE_WRAPPER(YGSize) HMShadowViewMeasure(YOGA_TYPE_WRAPPER(YGNodeRef) node, float width, YOGA_TYPE_WRAPPER(YGMeasureMode) widthMode, float height, YOGA_TYPE_WRAPPER(YGMeasureMode) heightMode) {
    HMRenderObject *shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(node);

    CGSize intrinsicContentSize = shadowView->_intrinsicContentSize;
    // Replace `UIViewNoIntrinsicMetric` (which equals `-1`) with zero.
    intrinsicContentSize.width = MAX(0, intrinsicContentSize.width);
    intrinsicContentSize.height = MAX(0, intrinsicContentSize.height);

    // 修复 AppCode 警告
    YOGA_TYPE_WRAPPER(YGSize) result = {
            0,
            0
    };

    switch (widthMode) {
        case YOGA_TYPE_WRAPPER(YGMeasureModeUndefined):
            result.width = (float) intrinsicContentSize.width;
            break;
        case YOGA_TYPE_WRAPPER(YGMeasureModeExactly):
            result.width = width;
            break;
        case YOGA_TYPE_WRAPPER(YGMeasureModeAtMost):
            result.width = (float) MIN(width, intrinsicContentSize.width);
            break;
    }

    switch (heightMode) {
        case YOGA_TYPE_WRAPPER(YGMeasureModeUndefined):
            result.height = (float) intrinsicContentSize.height;
            break;
        case YOGA_TYPE_WRAPPER(YGMeasureModeExactly):
            result.height = height;
            break;
        case YOGA_TYPE_WRAPPER(YGMeasureModeAtMost):
            result.height = (float) MIN(height, intrinsicContentSize.height);
            break;
    }

    return result;
}

- (UIEdgeInsets)paddingAsInsets {
    YOGA_TYPE_WRAPPER(YGNodeRef) yogaNode = self.yogaNode;

    return (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop))),
            HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft))),
            HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom))),
            HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight)))};
}

- (UIEdgeInsets)borderAsInsets {
    YOGA_TYPE_WRAPPER(YGNodeRef) yogaNode = self.yogaNode;

    return (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop))),
            HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft))),
            HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom))),
            HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight)))};
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
        YOGA_TYPE_WRAPPER(YGNodeSetMeasureFunc)(_yogaNode, NULL);
    } else {
        YOGA_TYPE_WRAPPER(YGNodeSetMeasureFunc)(_yogaNode, HMShadowViewMeasure);
    }

    YOGA_TYPE_WRAPPER(YGNodeMarkDirty)(_yogaNode);
}

// Flex

- (void)setFlexBasis:(YOGA_TYPE_WRAPPER(YGValue))value {
    HM_SET_YGVALUE_AUTO(value, YGNodeStyleSetFlexBasis, _yogaNode);
}

- (YOGA_TYPE_WRAPPER(YGValue))flexBasis {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetFlexBasis)(_yogaNode);
}

#if __has_include(<yoga/FINYoga.h>)
#define HM_STYLE_PROPERTY(setProp, getProp, cssProp, type) \
  -(void)set##setProp : (type)value                         \
  {                                                         \
    FINYGNodeStyleSet##cssProp(_yogaNode, value);              \
  }                                                         \
  -(type)getProp                                            \
  {                                                         \
    return FINYGNodeStyleGet##cssProp(_yogaNode);              \
  }
#elif __has_include(<yoga/Yoga.h>)
#define HM_STYLE_PROPERTY(setProp, getProp, cssProp, type) \
  -(void)set##setProp : (type)value                         \
  {                                                         \
    YGNodeStyleSet##cssProp(_yogaNode, value);              \
  }                                                         \
  -(type)getProp                                            \
  {                                                         \
    return YGNodeStyleGet##cssProp(_yogaNode);              \
  }
#endif

HM_STYLE_PROPERTY(Flex, flex, Flex, float)

HM_STYLE_PROPERTY(FlexGrow, flexGrow, FlexGrow, float)

HM_STYLE_PROPERTY(FlexShrink, flexShrink, FlexShrink, float)

HM_STYLE_PROPERTY(FlexDirection, flexDirection, FlexDirection, YOGA_TYPE_WRAPPER(YGFlexDirection))

HM_STYLE_PROPERTY(JustifyContent, justifyContent, JustifyContent, YOGA_TYPE_WRAPPER(YGJustify))

HM_STYLE_PROPERTY(AlignSelf, alignSelf, AlignSelf, YOGA_TYPE_WRAPPER(YGAlign))

HM_STYLE_PROPERTY(AlignItems, alignItems, AlignItems, YOGA_TYPE_WRAPPER(YGAlign))

HM_STYLE_PROPERTY(AlignContent, alignContent, AlignContent, YOGA_TYPE_WRAPPER(YGAlign))

HM_STYLE_PROPERTY(Position, position, PositionType, YOGA_TYPE_WRAPPER(YGPositionType))

HM_STYLE_PROPERTY(FlexWrap, flexWrap, FlexWrap, YOGA_TYPE_WRAPPER(YGWrap))

HM_STYLE_PROPERTY(Overflow, overflow, Overflow, YOGA_TYPE_WRAPPER(YGOverflow))

HM_STYLE_PROPERTY(Display, display, Display, YOGA_TYPE_WRAPPER(YGDisplay))

HM_STYLE_PROPERTY(Direction, direction, Direction, YOGA_TYPE_WRAPPER(YGDirection))

HM_STYLE_PROPERTY(AspectRatio, aspectRatio, AspectRatio, float)

- (void)addSubview:(HMRenderObject *)subview {
    [self insertSubview:subview atIndex:YOGA_TYPE_WRAPPER(YGNodeGetChildCount)(self.yogaNode)];
}

- (void)removeAllSubviews {
    YOGA_TYPE_WRAPPER(YGNodeRemoveAllChildren)(self.yogaNode);
}


- (HMRenderObject *)superview {
    YOGA_TYPE_WRAPPER(YGNodeRef) owner = YOGA_TYPE_WRAPPER(YGNodeGetOwner)(self.yogaNode);
    if (owner) {
        //if owner == nullptr。YGNodeGetContext 会导致 crash
        HMRenderObject *shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(owner);

        return shadowView;
    }

    return nil;
}

- (NSArray<HMRenderObject *> *)subviews {
    NSMutableArray<HMRenderObject *> *subviewArray = nil;
    uint32_t count = YOGA_TYPE_WRAPPER(YGNodeGetChildCount)(self.yogaNode);
    for (uint32_t i = 0; i < count; ++i) {
        YOGA_TYPE_WRAPPER(YGNodeRef) childNodeRef = YOGA_TYPE_WRAPPER(YGNodeGetChild)(self.yogaNode, i);
        HMRenderObject *renderObject = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(childNodeRef);
        if (!subviewArray) {
            subviewArray = [NSMutableArray arrayWithCapacity:count];
        }
        [subviewArray addObject:renderObject];
    }

    return subviewArray.copy;
}

- (NSUInteger)numberOfChildren {
    return YOGA_TYPE_WRAPPER(YGNodeGetChildCount)(self.yogaNode);
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
    return YOGA_TYPE_WRAPPER(YGNodeIsDirty)(self.yogaNode);
}

- (BOOL)hasExactSameChildren:(NSArray<__kindof HMRenderObject *> *)children {
    if (YOGA_TYPE_WRAPPER(YGNodeGetChildCount)(self.yogaNode) != children.count) {
        return NO;
    }

    for (int i = 0; i < children.count; i++) {
        if (YOGA_TYPE_WRAPPER(YGNodeGetChild)(self.yogaNode, (uint32_t) i) != children[(NSUInteger) i].yogaNode) {
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
        YOGA_TYPE_WRAPPER(YGNodeRef) nodeRef = YOGA_TYPE_WRAPPER(YGNodeGetOwner)(shadowView.yogaNode);
        if (nodeRef) {
            shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(nodeRef);
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
        YOGA_TYPE_WRAPPER(YGNodeRef) nodeRef = YOGA_TYPE_WRAPPER(YGNodeGetOwner)(shadowView.yogaNode);
        if (nodeRef) {
            shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(nodeRef);
        } else {
            shadowView = nil;
        }
//        shadowView = shadowView->_superview;
    }
    return ancestor == shadowView;
}

#pragma mark - YogaKit 复制代码

#if __has_include(<yoga/FINYoga.h>)
#define YG_EDGE_PROPERTY_GETTER(type, lowercased_name, capitalized_name, property, edge) \
- (type)lowercased_name                                                                  \
{                                                                                        \
  return FINYGNodeStyleGet##property(self.yogaNode, edge);                                      \
}

#define YG_EDGE_PROPERTY_SETTER(lowercased_name, capitalized_name, property, edge) \
- (void)set##capitalized_name:(float)lowercased_name                             \
{                                                                                  \
  FINYGNodeStyleSet##property(self.yogaNode, edge, lowercased_name);                      \
}
#elif __has_include(<yoga/Yoga.h>)
#define YG_EDGE_PROPERTY_GETTER(type, lowercased_name, capitalized_name, property, edge) \
- (type)lowercased_name                                                                  \
{                                                                                        \
  return YGNodeStyleGet##property(self.yogaNode, edge);                                      \
}

#define YG_EDGE_PROPERTY_SETTER(lowercased_name, capitalized_name, property, edge) \
- (void)set##capitalized_name:(float)lowercased_name                             \
{                                                                                  \
  YGNodeStyleSet##property(self.yogaNode, edge, lowercased_name);                      \
}
#endif

#define YG_EDGE_PROPERTY(lowercased_name, capitalized_name, property, edge)         \
YG_EDGE_PROPERTY_GETTER(float, lowercased_name, capitalized_name, property, edge) \
YG_EDGE_PROPERTY_SETTER(lowercased_name, capitalized_name, property, edge)

#if __has_include(<yoga/FINYoga.h>)
#define YG_VALUE_EDGE_PROPERTY_SETTER(objc_lowercased_name, objc_capitalized_name, c_name, edge) \
- (void)set##objc_capitalized_name:(YOGA_TYPE_WRAPPER(YGValue))objc_lowercased_name                                 \
{                                                                                                \
  switch (objc_lowercased_name.unit) {                                                           \
    case YOGA_TYPE_WRAPPER(YGUnitAuto):                                                                        \
    case YOGA_TYPE_WRAPPER(YGUnitUndefined):                                                                        \
      FINYGNodeStyleSet##c_name(self.yogaNode, edge, objc_lowercased_name.value);                       \
      break;                                                                                     \
    case YOGA_TYPE_WRAPPER(YGUnitPoint):                                                                            \
      FINYGNodeStyleSet##c_name(self.yogaNode, edge, objc_lowercased_name.value);                       \
      break;                                                                                     \
    case YOGA_TYPE_WRAPPER(YGUnitPercent):                                                                          \
      FINYGNodeStyleSet##c_name##Percent(self.yogaNode, edge, objc_lowercased_name.value);              \
      break;                                                                                     \
    default:                                                                                     \
      NSAssert(NO, @"Not implemented");                                                          \
  }                                                                                              \
}
#elif __has_include(<yoga/Yoga.h>)
#define YG_VALUE_EDGE_PROPERTY_SETTER(objc_lowercased_name, objc_capitalized_name, c_name, edge) \
- (void)set##objc_capitalized_name:(YGValue)objc_lowercased_name                                 \
{                                                                                                \
  switch (objc_lowercased_name.unit) {                                                           \
    case YGUnitAuto:                                                                        \
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
#endif

#define YG_VALUE_EDGE_PROPERTY(lowercased_name, capitalized_name, property, edge)   \
YG_EDGE_PROPERTY_GETTER(YOGA_TYPE_WRAPPER(YGValue), lowercased_name, capitalized_name, property, edge) \
YG_VALUE_EDGE_PROPERTY_SETTER(lowercased_name, capitalized_name, property, edge)

#define YG_VALUE_EDGES_PROPERTIES(lowercased_name, capitalized_name)                                                  \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Left, capitalized_name##Left, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeLeft))                   \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Top, capitalized_name##Top, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeTop))                      \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Right, capitalized_name##Right, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeRight))                \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Bottom, capitalized_name##Bottom, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeBottom))             \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Start, capitalized_name##Start, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeStart))                \
YG_VALUE_EDGE_PROPERTY(lowercased_name##End, capitalized_name##End, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeEnd))                      \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Horizontal, capitalized_name##Horizontal, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeHorizontal)) \
YG_VALUE_EDGE_PROPERTY(lowercased_name##Vertical, capitalized_name##Vertical, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeVertical))       \
YG_VALUE_EDGE_PROPERTY(lowercased_name, capitalized_name, capitalized_name, YOGA_TYPE_WRAPPER(YGEdgeAll))

- (YOGA_TYPE_WRAPPER(YGValue))marginLeft {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft));
}

- (void)setMarginLeft:(YOGA_TYPE_WRAPPER(YGValue))marginLeft {
    switch (marginLeft.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft), marginLeft.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft), marginLeft.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))marginTop {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop));
}

- (void)setMarginTop:(YOGA_TYPE_WRAPPER(YGValue))marginTop {
    switch (marginTop.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop), marginTop.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop), marginTop.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))marginRight {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight));
}

- (void)setMarginRight:(YOGA_TYPE_WRAPPER(YGValue))marginRight {
    switch (marginRight.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight), marginRight.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight), marginRight.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))marginBottom {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom));
}

- (void)setMarginBottom:(YOGA_TYPE_WRAPPER(YGValue))marginBottom {
    switch (marginBottom.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom), marginBottom.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom), marginBottom.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))marginStart {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeStart));
}

- (void)setMarginStart:(YOGA_TYPE_WRAPPER(YGValue))marginStart {
    switch (marginStart.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeStart));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeStart), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeStart), marginStart.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeStart), marginStart.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))marginEnd {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeEnd));
}

- (void)setMarginEnd:(YOGA_TYPE_WRAPPER(YGValue))marginEnd {
    switch (marginEnd.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeEnd));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeEnd), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeEnd), marginEnd.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeEnd), marginEnd.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))marginHorizontal {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeHorizontal));
}

- (void)setMarginHorizontal:(YOGA_TYPE_WRAPPER(YGValue))marginHorizontal {
    switch (marginHorizontal.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeHorizontal));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeHorizontal), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeHorizontal), marginHorizontal.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeHorizontal), marginHorizontal.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))marginVertical {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeVertical));
}

- (void)setMarginVertical:(YOGA_TYPE_WRAPPER(YGValue))marginVertical {
    switch (marginVertical.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeVertical));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeVertical), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeVertical), marginVertical.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeVertical), marginVertical.value);
            break;
    }
}

- (YOGA_TYPE_WRAPPER(YGValue))margin {
    return YOGA_TYPE_WRAPPER(YGNodeStyleGetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeAll));
}

- (void)setMargin:(YOGA_TYPE_WRAPPER(YGValue))margin {
    switch (margin.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginAuto)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeAll));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeAll), YOGA_TYPE_WRAPPER(YGUndefined));
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMargin)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeAll), margin.value);
            break;
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            YOGA_TYPE_WRAPPER(YGNodeStyleSetMarginPercent)(self.yogaNode, YOGA_TYPE_WRAPPER(YGEdgeAll), margin.value);
            break;
    }
}

YG_VALUE_EDGES_PROPERTIES(padding, Padding)

YG_EDGE_PROPERTY(borderLeftWidth, BorderLeftWidth, Border, YOGA_TYPE_WRAPPER(YGEdgeLeft))

YG_EDGE_PROPERTY(borderTopWidth, BorderTopWidth, Border, YOGA_TYPE_WRAPPER(YGEdgeTop))

YG_EDGE_PROPERTY(borderRightWidth, BorderRightWidth, Border, YOGA_TYPE_WRAPPER(YGEdgeRight))

YG_EDGE_PROPERTY(borderBottomWidth, BorderBottomWidth, Border, YOGA_TYPE_WRAPPER(YGEdgeBottom))

YG_EDGE_PROPERTY(borderStartWidth, BorderStartWidth, Border, YOGA_TYPE_WRAPPER(YGEdgeStart))

YG_EDGE_PROPERTY(borderEndWidth, BorderEndWidth, Border, YOGA_TYPE_WRAPPER(YGEdgeEnd))

YG_EDGE_PROPERTY(borderWidth, BorderWidth, Border, YOGA_TYPE_WRAPPER(YGEdgeAll))

@end
