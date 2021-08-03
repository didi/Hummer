//
//  HMUIUtility.h
//  Hummer
//
//  Created by litianhao on 2021/7/28.
//

#import "HMUtility.h"

@class HMBaseValue;

NS_ASSUME_NONNULL_BEGIN

UIKIT_EXTERN CGRect HMCanvasCGRectMake(HMBaseValue *x , HMBaseValue *y , HMBaseValue *w , HMBaseValue *h) ;

// left top right bottom
UIKIT_EXTERN CGRect HMCanvasCGRectMakeByTrail(HMBaseValue *x , HMBaseValue *y , HMBaseValue *trailX , HMBaseValue *trailY) ;

UIKIT_EXTERN CGPoint HMCanvasCGPointMake(HMBaseValue *x , HMBaseValue *y) ;

UIKIT_EXTERN CGSize HMCanvasCGSizeMake(HMBaseValue *w , HMBaseValue *h) ;

NS_ASSUME_NONNULL_END
