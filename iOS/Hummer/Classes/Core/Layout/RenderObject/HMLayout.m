//
//  HMLayout.m
//  yogaDemo1
//
//  Created by didi on 2020/9/18.
//  Copyright © 2020 didi. All rights reserved.
//

#import "HMLayout.h"

HMLayoutMetrics HMLayoutMetricsFromYogaNode(YOGA_TYPE_WRAPPER(YGNodeRef) yogaNode) {
    HMLayoutMetrics layoutMetrics;
    CGRect frame = (CGRect) {(CGPoint) {HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetLeft)(yogaNode)),
            HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetTop)(yogaNode))},
            (CGSize) {HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetWidth)(yogaNode)),
                    HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetHeight)(yogaNode))}};

    UIEdgeInsets padding =
            (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop))),
                    HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft))),
                    HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom))),
                    HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetPadding)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight)))};

    UIEdgeInsets borderWidth =
            (UIEdgeInsets) {HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeTop))),
                    HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeLeft))),
                    HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeBottom))),
                    HMCoreGraphicsFloatFromYogaFloat(YOGA_TYPE_WRAPPER(YGNodeLayoutGetBorder)(yogaNode, YOGA_TYPE_WRAPPER(YGEdgeRight)))};

    UIEdgeInsets compoundInsets = (UIEdgeInsets) {borderWidth.top + padding.top,
            borderWidth.left + padding.left,
            borderWidth.bottom + padding.bottom,
            borderWidth.right + padding.right};

    CGRect bounds = (CGRect) {CGPointZero, frame.size};
    CGRect contentFrame = UIEdgeInsetsInsetRect(bounds, compoundInsets);

    layoutMetrics.frame = frame;
    layoutMetrics.borderWidth = borderWidth;
    layoutMetrics.contentFrame = contentFrame;
    layoutMetrics.displayType = HMReactDisplayTypeFromYogaDisplayType(YOGA_TYPE_WRAPPER(YGNodeStyleGetDisplay)(yogaNode));
    layoutMetrics.layoutDirection = HMUIKitLayoutDirectionFromYogaLayoutDirection(YOGA_TYPE_WRAPPER(YGNodeLayoutGetDirection)(yogaNode));

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
        return YOGA_TYPE_WRAPPER(YGUndefined);
    }

    return (float) value;
}

CGFloat HMCoreGraphicsFloatFromYogaFloat(float value) {
    if (value == YOGA_TYPE_WRAPPER(YGUndefined) || isnan(value) || isinf(value)) {
        return CGFLOAT_MAX;
    }

    return value;
}

CGFloat HMCoreGraphicsFloatFromYogaValue(YOGA_TYPE_WRAPPER(YGValue) value, CGFloat baseFloatValue) {
    switch (value.unit) {
        case YOGA_TYPE_WRAPPER(YGUnitPoint):
            return HMCoreGraphicsFloatFromYogaFloat(value.value);
        case YOGA_TYPE_WRAPPER(YGUnitPercent):
            return HMCoreGraphicsFloatFromYogaFloat(value.value) * baseFloatValue;
        case YOGA_TYPE_WRAPPER(YGUnitAuto):
        case YOGA_TYPE_WRAPPER(YGUnitUndefined):
            return baseFloatValue;
    }

    return 0;
}

YOGA_TYPE_WRAPPER(YGDirection) HMYogaLayoutDirectionFromUIKitLayoutDirection(UIUserInterfaceLayoutDirection direction) {
    switch (direction) {
        case UIUserInterfaceLayoutDirectionRightToLeft:
            return YOGA_TYPE_WRAPPER(YGDirectionRTL);
        case UIUserInterfaceLayoutDirectionLeftToRight:
            return YOGA_TYPE_WRAPPER(YGDirectionLTR);
    }

    return YOGA_TYPE_WRAPPER(YGDirectionLTR);
}

UIUserInterfaceLayoutDirection HMUIKitLayoutDirectionFromYogaLayoutDirection(YOGA_TYPE_WRAPPER(YGDirection) direction) {
    switch (direction) {
        case YOGA_TYPE_WRAPPER(YGDirectionInherit):
        case YOGA_TYPE_WRAPPER(YGDirectionLTR):
            return UIUserInterfaceLayoutDirectionLeftToRight;
        case YOGA_TYPE_WRAPPER(YGDirectionRTL):
            return UIUserInterfaceLayoutDirectionRightToLeft;
    }

    return UIUserInterfaceLayoutDirectionRightToLeft;
}

YOGA_TYPE_WRAPPER(YGDisplay) HMYogaDisplayTypeFromReactDisplayType(HMDisplayType displayType) {
    switch (displayType) {
        case HMDisplayTypeInline:
        case HMDisplayTypeNone:
            return YOGA_TYPE_WRAPPER(YGDisplayNone);
        case HMDisplayTypeFlex:
            return YOGA_TYPE_WRAPPER(YGDisplayFlex);
    }

    return YOGA_TYPE_WRAPPER(YGDisplayNone);
}

HMDisplayType HMReactDisplayTypeFromYogaDisplayType(YOGA_TYPE_WRAPPER(YGDisplay) displayType) {
    switch (displayType) {
        case YOGA_TYPE_WRAPPER(YGDisplayFlex):
            return HMDisplayTypeFlex;
        case YOGA_TYPE_WRAPPER(YGDisplayNone):
            return HMDisplayTypeNone;
    }

    return HMDisplayTypeNone;
}
