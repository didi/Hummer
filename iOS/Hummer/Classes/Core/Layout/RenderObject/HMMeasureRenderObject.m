//
//  HMMeasureRenderObject.m
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import "HMMeasureRenderObject.h"

static YOGA_TYPE_WRAPPER(YGSize) HMCommonMeasure(YOGA_TYPE_WRAPPER(YGNodeRef) node, float width, YOGA_TYPE_WRAPPER(YGMeasureMode) widthMode, float height, YOGA_TYPE_WRAPPER(YGMeasureMode) heightMode) {
    CGSize maximumSize = (CGSize) {
            widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(width),
            heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(height),
    };

    HMRenderObject *shadowView = (__bridge HMRenderObject *) YOGA_TYPE_WRAPPER(YGNodeGetContext)(node);

    CGSize size = [shadowView.view sizeThatFits:maximumSize];

    return (YOGA_TYPE_WRAPPER(YGSize)) {
            HMYogaFloatFromCoreGraphicsFloat(size.width),
            HMYogaFloatFromCoreGraphicsFloat(size.height)
    };
}

@implementation HMMeasureRenderObject

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
