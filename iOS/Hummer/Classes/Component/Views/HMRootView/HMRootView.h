//
//  HMRootVIew.h
//  Hummer
//
//  Created by didi on 2023/6/13.
//

#import <UIKit/UIKit.h>
#import "HMUIManager.h"
#import "HMJSContext.h"

NS_ASSUME_NONNULL_BEGIN
@class HMRootView;

@protocol HMRootViewDelegate <NSObject>

@optional
/**
 * 每当布局完成时，调用该方法。如subviews为0，则没有进行实际大小变化（设置了不影响布局的 style，如 alpha）
 */
- (void)rootView:(HMRootView *)rootView didLayoutSubviews:(NSArray *)subviews;
@end

@interface HMRootView : UIView

/**
 * @param context HMJSContext，如果 HMRootView 不作为根节点使用，则不要传入该参数，否则会内存泄漏。
 */
- (instancetype)initWithFrame:(CGRect)frame context:(nullable HMJSContext *)context;

/**
 * 弹性模型，默认HummerDimensionFlexibilityNone.
 */
@property (nonatomic, assign) HummerDimensionFlexibility sizeFlexibility;

/*
 * The minimum size of the root view, defaults to CGSizeZero.
 */
@property (nonatomic, assign) CGSize minimumSize;

@property (nonatomic, weak, nullable) id<HMRootViewDelegate> delegate;

@property (nonatomic, strong, readonly) HMJSContext *context;

@end

NS_ASSUME_NONNULL_END
