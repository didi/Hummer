//
//  HMMeasureRenderObject.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import "HMRenderObject.h"

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN YGSize HMCompatibleMeasure(YGNodeRef node, float width, YGMeasureMode widthMode, float height, YGMeasureMode heightMode);

FOUNDATION_EXTERN CGFloat HMSanitizeMeasurement(
                                                CGFloat constrainedSize,
                                                CGFloat measuredSize,
                                                YGMeasureMode measureMode);

/**
 * 兼容 YogaKit 而用
 */
@interface HMCompatibleRenderObject : HMRenderObject

@end

NS_ASSUME_NONNULL_END
