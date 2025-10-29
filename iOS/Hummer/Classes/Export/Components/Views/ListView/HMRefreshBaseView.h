//
//  HMRefreshBaseView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
@class HMBaseValue;
typedef NS_ENUM(NSUInteger, HMRefreshType) {
    HMRefreshTypeNormal = 0,  // 正常状态
    HMRefreshTypeWillRefresh, // 将要刷新
    HMRefreshTypeRefreshing  // 正在刷新
};

typedef NS_ENUM(NSUInteger, HMLoadType) {
    HMLoadTypeNormal = 0,  // 正常状态
    HMLoadTypeRefreshing,   // 正在刷新
    HMLoadTypeNoMoreData   // 展示，但不再触发回调
};

typedef void (^HMStateRefreshChangedBlock)(HMRefreshType state);
typedef void (^HMStateLoadChangedBlock)(HMLoadType state);

NS_ASSUME_NONNULL_BEGIN

@interface HMRefreshBaseView : UIView

@property (nonatomic, strong , readonly) UIView * contentView;
@property (nonatomic, nullable, strong) HMBaseValue *contentViewValue;

@property (nonatomic, assign ) UIEdgeInsets insets;

- (void)removeObserver;

@end

@interface HMRefreshHeaderView : HMRefreshBaseView

- (instancetype)initWithScrollView:(UIScrollView *)scrollView
                          callback:(HMStateRefreshChangedBlock)callback;
/// 设置高度
- (void)setFreshHeight:(CGFloat)freshHeight;
/// 结束刷新
- (void)endRefresh;

@end

@interface HMLoadFooterView : HMRefreshBaseView

- (instancetype)initWithScrollView:(UIScrollView *)scrollView
                          callback:(HMStateLoadChangedBlock)callback;
/// 设置加载更多高度
- (void)setLoadHeight:(CGFloat)height;
/**
 * 设置上拉加载控件
 * @param enable 下次能否继续触发加载更多
 */
- (void)endLoad:(BOOL)enabled;
/// 重置状态
- (void)reset;

@end

NS_ASSUME_NONNULL_END
