//
//  UIView+HMLayout.h
//  Hummer
//
//  Created by didi on 2020/9/25.
//

#import <UIKit/UIKit.h>
#import "HMLayoutProtocol.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMLayoutEngine) {
    HMLayoutEngineRenderObject = 0,
    HMLayoutEngineRenderObjectCompatible,
    HMLayoutEngineYogaKit,
};

FOUNDATION_EXTERN YGValue HMPointValueMake(CGFloat value);
FOUNDATION_EXTERN YGValue HMPercentValueMake(CGFloat value);

FOUNDATION_EXTERN HMLayoutEngine hm_get_layout_engine(void);

FOUNDATION_EXTERN void hm_change_layout_engine(HMLayoutEngine layoutEngine);

FOUNDATION_EXTERN UIView *_Nullable hm_yoga_get_root_view(UIView *_Nullable currentView);

@interface UIView (HMRenderObject) <HMLayoutProtocol>

/**
 * 区分使用 yoga 布局，直接访问 hm_layout 会导致创建 HMShadowView 对象。
 * 当 <hm_renderObject> 为 YGLayout 时：isHmLayoutEnabled = layout.isEnabled && layout.isIncludedInLayout
 */
@property (nonatomic, assign) BOOL isHmLayoutEnabled;

@property (nonatomic, strong, readonly) id<HMLayoutStyleProtocol> hm_renderObject;

/**
 *  兼容 Yoga 1.7.0 版本的布局判断问题 仅在 HMLayoutEngineYogaKit 时生效
 */
- (void)hm_disableIncludedInLayout;

- (void)hm_configureLayoutWithBlock:(HMLayoutConfigurationBlock)block;

@end

NS_ASSUME_NONNULL_END
