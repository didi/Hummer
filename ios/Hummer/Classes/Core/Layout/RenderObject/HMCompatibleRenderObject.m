//
//  HMMeasureRenderObject.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import "HMCompatibleRenderObject.h"

CGFloat HMSanitizeMeasurement(
        CGFloat constrainedSize,
        CGFloat measuredSize,
        YGMeasureMode measureMode) {
    CGFloat result;
    if (measureMode == YGMeasureModeExactly) {
        result = constrainedSize;
    } else if (measureMode == YGMeasureModeAtMost) {
        result = MIN(constrainedSize, measuredSize);
    } else {
        result = measuredSize;
    }

    return result;
}

YGSize HMCompatibleMeasure(YGNodeRef node, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode) {
    const CGFloat constrainedWidth = (widthMode == YGMeasureModeUndefined) ? CGFLOAT_MAX : width;
    const CGFloat constrainedHeight = (heightMode == YGMeasureModeUndefined) ? CGFLOAT_MAX : height;

    HMRenderObject *shadowView = (__bridge HMRenderObject *) YGNodeGetContext(node);
    UIView *view = shadowView.view;
    CGSize sizeThatFits = CGSizeZero;

    // The default implementation of sizeThatFits: returns the existing size of
    // the view. That means that if we want to layout an empty UIView, which
    // already has got a frame set, its measured size should be CGSizeZero, but
    // UIKit returns the existing size.
    //
    // See https://github.com/facebook/yoga/issues/606 for more information.
    if ([view.subviews count] > 0) {
        sizeThatFits = [view sizeThatFits:(CGSize) {
                .width = constrainedWidth,
                .height = constrainedHeight,
        }];
    }

    return (YGSize) {
            .width = (float) HMSanitizeMeasurement(constrainedWidth, sizeThatFits.width, widthMode),
            .height = (float) HMSanitizeMeasurement(constrainedHeight, sizeThatFits.height, heightMode),
    };
}

@implementation HMCompatibleRenderObject

- (void)markDirty {
    if (self.isDirty || !self.isLeaf) {
        return;
    }

    // Yoga is not happy if we try to mark a node as "dirty" before we have set
    // the measure function. Since we already know that this is a leaf,
    // this *should* be fine. Forgive me Hack Gods.
    const YGNodeRef node = self.yogaNode;
#if __has_include(<yoga/Yoga.h>)
    if (!YGNodeHasMeasureFunc(node)) {
#elif __has_include(<YogaKit/Yoga.h>)
    if (!YGNodeGetMeasureFunc(node)) {
#endif
        // 还有 attach 需要置为 NULL 或者 HMCompatibleMeasure
        YGNodeSetMeasureFunc(node, HMCompatibleMeasure);
    }

    YGNodeMarkDirty(node);
}

@end
