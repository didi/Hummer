//
//  HMMeasureRenderObject.m
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import "HMMeasureRenderObject.h"

static YGSize HMCommonMeasure(YGNodeRef node, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode) {
    CGSize maximumSize = (CGSize) {
            widthMode == YGMeasureModeUndefined ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(width),
            heightMode == YGMeasureModeUndefined ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(height),
    };

    HMRenderObject *shadowView = (__bridge HMRenderObject *) YGNodeGetContext(node);

    CGSize size = [shadowView.view sizeThatFits:maximumSize];

    return (YGSize) {
            HMYogaFloatFromCoreGraphicsFloat(size.width),
            HMYogaFloatFromCoreGraphicsFloat(size.height)
    };
}

@implementation HMMeasureRenderObject

- (instancetype)init {
    if (self = [super init]) {
        YGNodeSetMeasureFunc(self.yogaNode, HMCommonMeasure);
    }

    return self;
}

- (BOOL)isYogaLeafNode {
    return YES;
}

- (void)markDirty {
    YGNodeMarkDirty(self.yogaNode);
}

@end
