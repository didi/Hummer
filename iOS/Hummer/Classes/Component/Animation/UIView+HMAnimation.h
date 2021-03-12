//
//  UIView+HMAnimation.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <HMTransform.h>

@interface UIView (HMAnimation)

@property (nonatomic, strong) NSMutableDictionary *hm_animationMap;

@property (nonatomic, strong) HMTransform *hm_transform;

// 设置size 动画时，由于无法获取独立获取 affectedViews 和 对应 View 的size。因此通过下面的属性保留 hummerSetFrame 之前的 size。
@property (nonatomic, assign) CGPoint hm_animationPropertyCenter;
@property (nonatomic, assign) CGRect hm_animationPropertyBounds;

@end
