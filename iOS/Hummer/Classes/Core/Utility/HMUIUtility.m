//
//  HMUIUtility.m
//  Hummer
//
//  Created by litianhao on 2021/7/28.
//

#import "HMUIUtility.h"
#import "HMBaseValue.h"

CGRect HMCanvasCGRectMake(HMBaseValue *x , HMBaseValue *y , HMBaseValue *w , HMBaseValue *h) {
    return CGRectMake(HMPointWithString(x.toString),
                      HMPointWithString(y.toString),
                      HMPointWithString(w.toString),
                      HMPointWithString(h.toString));
}

// left top right bottom
CGRect HMCanvasCGRectMakeByTrail(HMBaseValue *x , HMBaseValue *y , HMBaseValue *trailX , HMBaseValue *trailY)  {
    CGFloat xValue = HMPointWithString(x.toString);
    CGFloat yValue = HMPointWithString(y.toString);
    CGFloat trailXValue = HMPointWithString(trailX.toString);
    CGFloat trailYValue = HMPointWithString(trailY.toString);

    return CGRectMake(xValue,
                      yValue,
                      trailXValue - xValue,
                      trailYValue - yValue);
}

CGPoint HMCanvasCGPointMake(HMBaseValue *x , HMBaseValue *y) {
    return CGPointMake(HMPointWithString(x.toString),
                      HMPointWithString(y.toString));
}

CGSize HMCanvasCGSizeMake(HMBaseValue *w , HMBaseValue *h) {
    return CGSizeMake(HMPointWithString(w.toString),
                      HMPointWithString(h.toString));
}
