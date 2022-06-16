//
//  UIView+HMLayout.h
//  Hummer
//
//  Created by didi on 2020/9/25.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMLayoutStyleProtocol.h>
#import <Hummer/HMLayout.h>

NS_ASSUME_NONNULL_BEGIN


FOUNDATION_EXTERN UIView *_Nullable hm_yoga_get_root_view(UIView *_Nullable currentView);

@interface UIView (HMRenderObject)

/**
 * 区分使用 yoga 布局，直接访问 hm_layout 会导致创建 HMShadowView 对象。
 * 当 <hm_renderObject> 为 YGLayout 时：isHmLayoutEnabled = layout.isEnabled && layout.isIncludedInLayout
 */
@property (nonatomic, assign) BOOL isHmLayoutEnabled;

@property (nonatomic, strong, readonly) id<HMLayoutStyleProtocol> hm_renderObject;

- (CGSize)hm_sizeThatFits:(CGSize)size;

- (CGSize)hm_sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize;

- (void)hm_applyLayoutPreservingOrigin:(BOOL)preserveOrigin affectedShadowViews:(nullable NSHashTable<id<HMLayoutStyleProtocol>> *)affectedShadowViews;
/**
 *  兼容 YogaKit 的布局判断问题 仅在 HMLayoutEngineYogaKit 时生效
 */
- (void)hm_disableIncludedInLayout DEPRECATED_MSG_ATTRIBUTE("YogaKit 遗留，已经废弃，业务方可以直接删除");

- (void)hm_configureLayoutWithBlock:(nullable HMLayoutConfigurationBlock)block;

@end

NS_ASSUME_NONNULL_END
