//
//  HMTextRenderObject.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import "HMTextRenderObject.h"
#import "HMYogaUtility.h"

static YOGA_TYPE_WRAPPER(YGSize) HMCommonMeasure(YOGA_TYPE_WRAPPER(YGNodeRef) node, float width, YOGA_TYPE_WRAPPER(YGMeasureMode) widthMode, float height, YOGA_TYPE_WRAPPER(YGMeasureMode) heightMode) {
    CGSize maximumSize = (CGSize) {
            widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(width),
            heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(height),
    };

    HMRenderObject *shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(node);

    CGSize size = [shadowView.view sizeThatFits:maximumSize];

    // Adding epsilon value illuminates problems with converting values from
    // `double` to `float`, and then rounding them to pixel grid in Yoga.
    CGFloat epsilon = 0.001;

    return (YOGA_TYPE_WRAPPER(YGSize)) {
            HMYogaFloatFromCoreGraphicsFloat(size.width + epsilon),
            HMYogaFloatFromCoreGraphicsFloat(size.height + epsilon)
    };
}

@implementation HMTextRenderObject

- (instancetype)init {
    if (self = [super init]) {
        YOGA_TYPE_WRAPPER(YGNodeSetMeasureFunc)(self.yogaNode, HMCommonMeasure);
    }

    return self;
}

- (BOOL)isYogaLeafNode {
    return YES;
}

- (void)markDirty {
    YOGA_TYPE_WRAPPER(YGNodeMarkDirty)(self.yogaNode);
}

@end
