//
//  HMToastView.h
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMToastViewDelegate <NSObject>

- (void)hm_didToastViewHide;

@end

@interface HMToastView : UIView

@property (nonatomic,   weak) id<HMToastViewDelegate> delegate;
/** 设置上下左右的padding */
@property (nonatomic, assign) UIEdgeInsets insets;

/** Toast初始化方法，view的bound将用于Toast计算frame */
- (instancetype)initWithView:(UIView *)view;

- (void)updateWithText:(NSString *)text;
- (void)updateWithView:(UIView *)view;

- (void)showWithDuration:(NSTimeInterval)duration;
- (void)hide:(BOOL)animated;

@end

NS_ASSUME_NONNULL_END
