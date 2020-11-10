//
//  HMTextRenderObject.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import "HMTextRenderObject.h"

static YGSize HMCommonMeasure(YGNodeRef node, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode) {
    CGSize maximumSize = (CGSize) {
            widthMode == YGMeasureModeUndefined ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(width),
            heightMode == YGMeasureModeUndefined ? CGFLOAT_MAX : HMCoreGraphicsFloatFromYogaFloat(height),
    };

    HMRenderObject *shadowView = (__bridge HMRenderObject *) YGNodeGetContext(node);

    CGSize size = [shadowView.view sizeThatFits:maximumSize];

    // Adding epsilon value illuminates problems with converting values from
    // `double` to `float`, and then rounding them to pixel grid in Yoga.
    CGFloat epsilon = 0.001;

    return (YGSize) {
            HMYogaFloatFromCoreGraphicsFloat(size.width + epsilon),
            HMYogaFloatFromCoreGraphicsFloat(size.height + epsilon)
    };
}

@implementation HMTextRenderObject

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
