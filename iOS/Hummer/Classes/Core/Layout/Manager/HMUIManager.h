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
    HummerDimensionFlexibilityNone = 0,
    HummerDimensionFlexibilityWidth = 1 << 0,
    HummerDimensionFlexibilityHeight = 1 << 1,
    HummerDimensionFlexibilityWidthAndHeight = HummerDimensionFlexibilityWidth | HummerDimensionFlexibilityHeight,

};
@class HMRootView;
@class HMRenderObject;

@interface HMUIManager : NSObject

+ (instancetype)sharedInstance;

- (void)registerRenderObject:(Class)cls forView:(Class)viewCls;

- (HMRenderObject *)createRenderObjectWithView:(UIView *)view;

- (void)attachRenderObjectFromViewHierarchyForRootView:(nullable UIView *)rootView;

- (void)applyLayoutPreservingOrigin:(BOOL)preserveOrigin dimensionFlexibility:(HummerDimensionFlexibility)dimensionFlexibility view:(UIView *)view affectedShadowViews:(nullable NSHashTable<HMRenderObject *> *)affectedShadowViews;

- (void)applyLayoutPreservingOrigin:(BOOL)preserveOrigin view:(HMRootView *)view affectedShadowViews:(nullable NSHashTable<HMRenderObject *> *)affectedShadowViews;

@end

NS_ASSUME_NONNULL_END
