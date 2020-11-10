//
//  HMLayout.m
//  yogaDemo1
//
//  Created by didi on 2020/9/18.
//  Copyright © 2020 didi. All rights reserved.
//

#import "HMLayout.h"

HMLayoutMetrics HMLayoutMetricsFromYogaNode(YGNodeRef yogaNode) {
    HMLayoutMetrics layoutMetrics;
    CGRect frame = (CGRect) {(CGPoint) {HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetLeft(yogaNode)),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetTop(yogaNode))},
            (CGSize) {HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetWidth(yogaNode)),
                    HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetHeight(yogaNode))}};

    UIEdgeInsets padding =
            (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeTop)),
                    HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeLeft)),
                    HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeBottom)),
                    HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetPadding(yogaNode, YGEdgeRight))};

    UIEdgeInsets borderWidth =
            (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeTop)),
                    HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeLeft)),
                    HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeBottom)),
                    HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetBorder(yogaNode, YGEdgeRight))};

    UIEdgeInsets compoundInsets = (UIEdgeInsets) {borderWidth.top + padding.top,
            borderWidth.left + padding.left,
            borderWidth.bottom + padding.bottom,
            borderWidth.right + padding.right};

    CGRect bounds = (CGRect) {CGPointZero, frame.size};
    CGRect contentFrame = UIEdgeInsetsInsetRect(bounds, compoundInsets);

    layoutMetrics.frame = frame;
    layoutMetrics.borderWidth = borderWidth;
    layoutMetrics.contentFrame = contentFrame;
    layoutMetrics.displayType = HMReactDisplayTypeFromYogaDisplayType(YGNodeStyleGetDisplay(yogaNode));
    layoutMetrics.layoutDirection = HMUIKitLayoutDirectionFromYogaLayoutDirection(YGNodeLayoutGetDirection(yogaNode));

    return layoutMetrics;
}

/**
 * Yoga and CoreGraphics have different opinions about how "infinity" value
 * should be represented.
 * Yoga uses `NAN` which requires additional effort to compare all those values,
 * whereas GoreGraphics uses `CGFLOAT_MAX` which can be easily compared with
 * standard `==` operator.
 */

float HMYogaFloatFromCoreGraphicsFloat(CGFloat value) {
    if (value == CGFLOAT_MAX || isnan(value) || isinf(value)) {
        return YGUndefined;
    }

    return (float) value;
}

CGFloat HMCoreGraphicsFloatFromYogaFloat(float value) {
    if (value == YGUndefined || isnan(value) || isinf(value)) {
        return CGFLOAT_MAX;
    }

    return value;
}

CGFloat HMCoreGraphicsFloatFromYogaValue(YGValue value, CGFloat baseFloatValue) {
    switch (value.unit) {
        case YGUnitPoint:
            return HMCoreGraphicsFloatFromYogaFloat(value.value);
        case YGUnitPercent:
            return HMCoreGraphicsFloatFromYogaFloat(value.value) * baseFloatValue;
        case YGUnitAuto:
        case YGUnitUndefined:
            return baseFloatValue;
    }

    return 0;
}

YGDirection HMYogaLayoutDirectionFromUIKitLayoutDirection(UIUserInterfaceLayoutDirection direction) {
    switch (direction) {
        case UIUserInterfaceLayoutDirectionRightToLeft:
            return YGDirectionRTL;
        case UIUserInterfaceLayoutDirectionLeftToRight:
            return YGDirectionLTR;
    }

    return YGDirectionLTR;
}

UIUserInterfaceLayoutDirection HMUIKitLayoutDirectionFromYogaLayoutDirection(YGDirection direction) {
    switch (direction) {
        case YGDirectionInherit:
        case YGDirectionLTR:
            return UIUserInterfaceLayoutDirectionLeftToRight;
        case YGDirectionRTL:
            return UIUserInterfaceLayoutDirectionRightToLeft;
    }

    return UIUserInterfaceLayoutDirectionRightToLeft;
}

YGDisplay HMYogaDisplayTypeFromReactDisplayType(HMDisplayType displayType) {
    switch (displayType) {
        case HMDisplayTypeInline:
        case HMDisplayTypeNone:
            return YGDisplayNone;
        case HMDisplayTypeFlex:
            return YGDisplayFlex;
    }

    return YGDisplayNone;
}

HMDisplayType HMReactDisplayTypeFromYogaDisplayType(YGDisplay displayType) {
    switch (displayType) {
        case YGDisplayFlex:
            return HMDisplayTypeFlex;
        case YGDisplayNone:
            return HMDisplayTypeNone;
    }

    return HMDisplayTypeNone;
}
