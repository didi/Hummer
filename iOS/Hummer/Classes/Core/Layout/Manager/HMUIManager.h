//
//  HMUIManager.h
//  Hummer
//
//  Created by didi on 2020/9/27.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN const BOOL HMUseDoubleAttributeControlHidden;

typedef NS_OPTIONS(NSInteger, HummerDimensionFlexibility) {
    HummerDimensionFlexibilityWidth = 1 << 0,
    HummerDimensionFlexibilityHeight = 1 << 1,
};

@class HMRenderObject;

@interface HMUIManager : NSObject

+ (instancetype)sharedInstance;

- (void)registerRenderObject:(Class)cls forView:(Class)viewCls;

- (HMRenderObject *)createRenderObjectWithView:(UIView *)view;

- (void)attachRenderObjectFromViewHierarchyForRootView:(nullable UIView *)rootView;

- (void)applyLayout:(UIView *)rootView preservingOrigin:(BOOL)preserveOrigin size:(CGSize)size affectedShadowViews:(nullable NSHashTable<HMRenderObject *> *)affectedShadowViews DEPRECATED_MSG_ATTRIBUTE("原先该方法会导致 size 影响 minWidth/Height，应当改用 - applyLayoutPreservingOrigin:dimensionFlexibility:view:affectedShadowViews: 替代");

- (void)applyLayoutPreservingOrigin:(BOOL)preserveOrigin dimensionFlexibility:(HummerDimensionFlexibility)dimensionFlexibility view:(UIView *)view affectedShadowViews:(nullable NSHashTable<HMRenderObject *> *)affectedShadowViews;

- (void)applyLayoutPreservingOrigin:(BOOL)preserveOrigin view:(UIView *)view affectedShadowViews:(nullable NSHashTable<HMRenderObject *> *)affectedShadowViews;

@end

NS_ASSUME_NONNULL_END
