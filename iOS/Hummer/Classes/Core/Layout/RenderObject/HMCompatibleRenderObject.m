//
//  HMMeasureRenderObject.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import "HMCompatibleRenderObject.h"
#import "HMScrollView.h"

CGFloat HMSanitizeMeasurement(CGFloat constrainedSize, CGFloat measuredSize, YOGA_TYPE_WRAPPER(YGMeasureMode) measureMode) {
    CGFloat result;
    if (measureMode == YOGA_TYPE_WRAPPER(YGMeasureModeExactly)) {
        result = constrainedSize;
    } else if (measureMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost)) {
        result = MIN(constrainedSize, measuredSize);
    } else {
        result = measuredSize;
    }

    return result;
}

YOGA_TYPE_WRAPPER(YGSize) HMCompatibleMeasure(YOGA_TYPE_WRAPPER(YGNodeRef) node, float width, YOGA_TYPE_WRAPPER(YGMeasureMode) widthMode, float height, YOGA_TYPE_WRAPPER(YGMeasureMode) heightMode) {
    const CGFloat constrainedWidth = (widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined)) ? CGFLOAT_MAX : width;
    const CGFloat constrainedHeight = (heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined)) ? CGFLOAT_MAX : height;

    HMRenderObject *shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(node);
    UIView *view = shadowView.view;
    CGSize sizeThatFits = CGSizeZero;

    // The default implementation of sizeThatFits: returns the existing size of
    // the view. That means that if we want to layout an empty UIView, which
    // already has got a frame set, its measured size should be CGSizeZero, but
    // UIKit returns the existing size.
    //
    // See https://github.com/facebook/yoga/issues/606 for more information.
    if (![view isMemberOfClass:UIView.class] || [view.subviews count] > 0) {
        sizeThatFits = [view sizeThatFits:(CGSize) {
                .width = constrainedWidth,
                .height = constrainedHeight,
        }];
    }

    return (YOGA_TYPE_WRAPPER(YGSize)) {
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
    const YOGA_TYPE_WRAPPER(YGNodeRef) node = self.yogaNode;
    if (!YOGA_TYPE_WRAPPER(YGNodeHasMeasureFunc)(node)) {
        // 还有 attach 需要置为 NULL 或者 HMCompatibleMeasure
        YOGA_TYPE_WRAPPER(YGNodeSetMeasureFunc)(node, HMCompatibleMeasure);
    }

    YOGA_TYPE_WRAPPER(YGNodeMarkDirty)(node);
}

@end
