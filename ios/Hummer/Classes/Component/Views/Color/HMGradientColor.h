//
//  HMGradientColor.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMGradientColor : UIColor

@property (nonatomic, copy) UIColor *beginColor;
@property (nonatomic, copy) UIColor *endColor;
@property (nonatomic, assign) CGPoint beginPoint;
@property (nonatomic, assign) CGPoint endPoint;

@end

NS_ASSUME_NONNULL_END
