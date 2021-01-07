//
//  HMMeasureRenderObject.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import <Hummer/HMRenderObject.h>
#import <Hummer/HMYogaUtility.h>

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN YOGA_TYPE_WRAPPER(YGSize) HMCompatibleMeasure(YOGA_TYPE_WRAPPER(YGNodeRef) node, float width, YOGA_TYPE_WRAPPER(YGMeasureMode) widthMode, float height, YOGA_TYPE_WRAPPER(YGMeasureMode) heightMode);

FOUNDATION_EXTERN CGFloat HMSanitizeMeasurement(CGFloat constrainedSize, CGFloat measuredSize, YOGA_TYPE_WRAPPER(YGMeasureMode) measureMode);

/**
 * 兼容 YogaKit 而用
 */
@interface HMCompatibleRenderObject : HMRenderObject

@end

NS_ASSUME_NONNULL_END
