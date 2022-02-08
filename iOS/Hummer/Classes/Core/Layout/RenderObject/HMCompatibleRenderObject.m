//
//  HMMeasureRenderObject.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import "HMCompatibleRenderObject.h"
#import "HMScrollView.h"
#import <Hummer/HMImageView.h>

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
    if ([view isKindOfClass:HMImageView.class]) {
        // UIImageView sizeThatFits: 方法永远返回 .image.size
        // width + height
        // 1. YGMeasureModeUndefined + YGMeasureModeUndefined -> .image.size
        // 2. YGMeasureModeUndefined + YGMeasureModeExactly -> .image.size 缩放
        // 3. YGMeasureModeUndefined + YGMeasureModeAtMost
        //   3.1 图片比约束小 -> .image.size
        //   3.2 图片比约束大 -> 缩放
        
        // 4. YGMeasureModeExactly + YGMeasureModeUndefined -> 缩放
        // 5. YGMeasureModeExactly + YGMeasureModeExactly -> 固定大小
        // 6. YGMeasureModeExactly + YGMeasureModeAtMost -> 缩放
        
        // 7. YGMeasureModeAtMost + YGMeasureModeUndefined
        //   7.1 图片比约束小 -> .image.size
        //   7.2 图片比约束大 -> 缩放
        // 8. YGMeasureModeAtMost + YGMeasureModeExactly -> 缩放
        // 9. YGMeasureModeAtMost + YGMeasureModeAtMost
        //   9.1 足够小 -> .image.size
        //   9.2 一边比约束大 -> 缩放
        //   9.3 两边都比约束大 -> 两边都计算缩放 -> 取最小
        
        if (((UIImageView *) view).image) {
            CGSize imageSize = ((UIImageView *) view).image.size;
            
            if ((widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined)) || (widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && height >= imageSize.height) || (heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) && widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && width >= imageSize.width) || (widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && width >= imageSize.width && height >= imageSize.height)) {
                // 1. 无约束
                // 2. 一边无约束，一边 atMost，并且图片更小
                // 3. 两边 atMost，并且图片更小
                sizeThatFits = imageSize;
            } else if ((widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeExactly)) || (widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeExactly))) {
                // 根据 height 缩放
                // 1. YGMeasureModeUndefined + YGMeasureModeExactly
                // 2. YGMeasureModeAtMost + YGMeasureModeExactly
                if (ABS(height - imageSize.height) < 0.0001) {
                    sizeThatFits = imageSize;
                } else {
                    // 宽 / height == imageSize.width / imageSize.height -> 宽 = imageSize.width / imageSize.height * height
                    sizeThatFits = CGSizeMake(imageSize.width / imageSize.height * height, height);
                }
            } else if ((widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && height < imageSize.height) || (widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && width >= imageSize.width && height < imageSize.height)) {
                // 根据 height 缩放
                // 1. YGMeasureModeUndefined + YGMeasureModeAtMost + height < imageSize.height
                // 2. YGMeasureModeAtMost + YGMeasureModeAtMost + width >= imageSize.width + height < imageSize.height
                sizeThatFits = CGSizeMake(imageSize.width / imageSize.height * height, height);
            } else if ((heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) && widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeExactly)) || (heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeExactly))) {
                if (ABS(width - imageSize.width) < 0.0001) {
                    sizeThatFits = imageSize;
                } else {
                    // 高 / width == imageSize.height / imageSize.width -> 高 = imageSize.height / imageSize.width * width
                    sizeThatFits = CGSizeMake(width, imageSize.height / imageSize.width * width);
                }
            } else if ((heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeUndefined) && widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && width < imageSize.width) || (heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && height >= imageSize.height && width < imageSize.width)) {
                sizeThatFits = CGSizeMake(width, imageSize.height / imageSize.width * width);
            } else if (widthMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && heightMode == YOGA_TYPE_WRAPPER(YGMeasureModeAtMost) && width < imageSize.width && height < imageSize.height) {
                // YGMeasureModeAtMost + YGMeasureModeAtMost + width < imageSize.width + height < imageSize.height
                // min(width)
                // 根据 height 缩放
                CGFloat newWidth = imageSize.width / imageSize.height * height;
                if (newWidth < width) {
                    sizeThatFits = CGSizeMake(newWidth, height);
                } else {
                    sizeThatFits = CGSizeMake(width, imageSize.height / imageSize.width * width);
                }
            }
        }
    } else if (![view isMemberOfClass:UIView.class] || [view.subviews count] > 0) {
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

- (nullable NSArray <HMRenderObject *>*)layoutSubviewsWithContext:(HMLayoutContext)layoutContext {

    NSArray *affectedObjects = [super layoutSubviewsWithContext:layoutContext];
    if ([self.view isKindOfClass:HMScrollView.class] && affectedObjects.count>0) {
        [layoutContext.affectedShadowViews addObject:self];
    }
    return affectedObjects;
}
@end
