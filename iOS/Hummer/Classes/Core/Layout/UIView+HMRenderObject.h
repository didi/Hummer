//
//  UIView+HMLayout.h
//  Hummer
//
//  Created by didi on 2020/9/25.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMLayoutStyleProtocol.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^HMLayoutConfigurationBlock)(id<HMLayoutStyleProtocol> layout);

typedef NS_ENUM(NSUInteger, HMLayoutEngine) {
    HMLayoutEngineRenderObject = 0,
    HMLayoutEngineRenderObjectCompatible
};

FOUNDATION_EXTERN YOGA_TYPE_WRAPPER(YGValue) HMPointValueMake(CGFloat value);
FOUNDATION_EXTERN YOGA_TYPE_WRAPPER(YGValue) HMPercentValueMake(CGFloat value);

FOUNDATION_EXTERN HMLayoutEngine hm_get_layout_engine(void);

FOUNDATION_EXTERN void hm_change_layout_engine(HMLayoutEngine layoutEngine);

FOUNDATION_EXTERN UIView *_Nullable hm_yoga_get_root_view(UIView *_Nullable currentView);

@interface UIView (HMRenderObject)

/**
 * 区分使用 yoga 布局，直接访问 hm_layout 会导致创建 HMShadowView 对象。
 * 当 <hm_renderObject> 为 YGLayout 时：isHmLayoutEnabled = layout.isEnabled && layout.isIncludedInLayout
 */
@property (nonatomic, assign) BOOL isHmLayoutEnabled;

@property (nonatomic, strong, readonly) id<HMLayoutStyleProtocol> hm_renderObject;

- (CGSize)hm_sizeThatFits:(CGSize)size;

- (CGSize)hm_sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize DEPRECATED_MSG_ATTRIBUTE("该方法会导致计算出的大小包含 margin，或者如果节点本身为 absolute，没法自撑开，业务方最好使用 - hm_sizeThatFits: 替代，并且将自撑开大小结果和业务方需要的 minWidth/Height 做比较");

- (void)hm_applyLayoutPreservingOrigin:(BOOL)preserveOrigin affectedShadowViews:(nullable NSHashTable<id<HMLayoutStyleProtocol>> *)affectedShadowViews;
/**
 *  兼容 YogaKit 的布局判断问题 仅在 HMLayoutEngineYogaKit 时生效
 */
- (void)hm_disableIncludedInLayout DEPRECATED_MSG_ATTRIBUTE("YogaKit 遗留，已经废弃，业务方可以直接删除");

- (void)hm_configureLayoutWithBlock:(nullable HMLayoutConfigurationBlock)block;

@end

NS_ASSUME_NONNULL_END
