//
//  UIView+HMLayout.m
//  Hummer
//
//  Created by didi on 2020/9/25.
//

#import "UIView+HMRenderObject.h"
#import <objc/runtime.h>
#import "HMUtility.h"
#import "HMYogaConfig.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "UIView+HMDom.h"
#import "HMUIManager.h"
#import "HMJSGlobal.h"
#import "HMRenderObject.h"

static const char SHADOW_VIEW_KEY;

// 默认兼容模式
static HMLayoutEngine layoutEngine = HMLayoutEngineRenderObjectCompatible;

static HMSizeThatFitsMode sizeThatFitsMode = HMSizeThatFitsModePreferNative;

HMSizeThatFitsMode HMGetSizeThatFitsMode() {
    return sizeThatFitsMode;
}

HMLayoutEngine hm_get_layout_engine() {
    return layoutEngine;
}

void HMChangeSizeThatFitsMode(HMSizeThatFitsMode newSizeThatFitsMode) {
    sizeThatFitsMode = newSizeThatFitsMode;
}

void hm_change_layout_engine(HMLayoutEngine layoutEngine) {
    layoutEngine = layoutEngine;
}

YOGA_TYPE_WRAPPER(YGValue) HMPointValueMake(CGFloat value) {
    return (YOGA_TYPE_WRAPPER(YGValue)) {.value = value, .unit = YOGA_TYPE_WRAPPER(YGUnitPoint)};
}

YOGA_TYPE_WRAPPER(YGValue) HMPercentValueMake(CGFloat value) {
    return (YOGA_TYPE_WRAPPER(YGValue)) {.value = value, .unit = YOGA_TYPE_WRAPPER(YGUnitPercent)};
}
YOGA_TYPE_WRAPPER(YGValue) HMAutoValueMake() {
    return (YOGA_TYPE_WRAPPER(YGValue)) {.value = 0, .unit = YOGA_TYPE_WRAPPER(YGUnitAuto)};
}


@implementation UIView (HMShadowView)

UIView *hm_yoga_get_root_view(UIView *currentView) {
    if (!currentView.isHmLayoutEnabled) {
        return nil;
    }
    // 需要驱动根视图做一次布局
    // 1. 获取根视图
    UIView *rootView = currentView;
    // 循环结束条件一：没有父视图了
    while (rootView.superview) {
        UIView *superView = rootView.superview;
        // 使用 isHmLayoutEnabled 防止额外的（不必要的）YGLayout 被创建
        if (superView.isHmLayoutEnabled) {
            // 父视图启用 Yoga 布局，包含在布局中，说明视图在视图树中，存在是根视图的可能
            rootView = superView;
        } else {
            // 循环结束条件二：当前视图已经超出 Yoga 视图树了
            break;
        }
    }

    return rootView;
}

- (id <HMLayoutStyleProtocol>)hm_renderObject {
    if (!objc_getAssociatedObject(self, &SHADOW_VIEW_KEY)) {
        HMRenderObject *renderObj = [HMUIManager.sharedInstance createRenderObjectWithView:self];
        objc_setAssociatedObject(self, &SHADOW_VIEW_KEY, renderObj, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        
        return renderObj;
    }
    
    return objc_getAssociatedObject(self, &SHADOW_VIEW_KEY);
}

- (BOOL)isHmLayoutEnabled {
    return objc_getAssociatedObject(self, &SHADOW_VIEW_KEY) != nil;
}

- (void)hm_disableIncludedInLayout {
}

- (void)setIsHmLayoutEnabled:(BOOL)isHmLayoutEnabled {
    if (isHmLayoutEnabled) {
        [self hm_renderObject];
    } else {
        objc_setAssociatedObject(self, &SHADOW_VIEW_KEY, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
}

- (void)hm_configureLayoutWithBlock:(HMLayoutConfigurationBlock)block {
    self.isHmLayoutEnabled = YES;
    block ? block(self.hm_renderObject) : nil;
}

#pragma mark - interface compatible

- (CGSize)hm_sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize {
    [HMUIManager.sharedInstance attachRenderObjectFromViewHierarchyForRootView:self];
    
    return [((HMRenderObject *) self.hm_renderObject) sizeThatFitsMinimumSize:minimumSize maximumSize:maximumSize];
}

- (CGSize)hm_sizeThatFits:(CGSize)size {
    [HMUIManager.sharedInstance attachRenderObjectFromViewHierarchyForRootView:self];
    
    return [((HMRenderObject *) self.hm_renderObject) sizeThatFitsMaximumSize:size];
}

- (void)hm_applyLayoutPreservingOrigin:(BOOL)preserveOrigin affectedShadowViews:(nullable NSHashTable<id<HMLayoutStyleProtocol>> *)affectedShadowViews {
    [HMUIManager.sharedInstance applyLayout:self preservingOrigin:preserveOrigin size:self.bounds.size affectedShadowViews:(NSHashTable<HMRenderObject *> *) affectedShadowViews];
}

@end
