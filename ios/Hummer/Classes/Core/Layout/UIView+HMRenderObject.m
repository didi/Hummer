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
#import "HMBaseValue.h"
#import "UIView+HMDom.h"
#import "HMUIManager.h"
#import "HMJSGlobal.h"
#import <YogaKit/UIView+Yoga.h>
#import "YGLayout+Hummer.h"
#import "HMRenderObject.h"

static const char SHADOW_VIEW_KEY;

// 默认兼容模式
static HMLayoutEngine _layoutEngine = HMLayoutEngineRenderObjectCompatible;

HMLayoutEngine hm_get_layout_engine() {
    return _layoutEngine;
}

void hm_change_layout_engine(HMLayoutEngine layoutEngine) {
    _layoutEngine = layoutEngine;
}

YGValue HMPointValueMake(CGFloat value) {
    return (YGValue) {.value = value, .unit = YGUnitPoint};
}

YGValue HMPercentValueMake(CGFloat value) {
    return (YGValue) {.value = value, .unit = YGUnitPercent};
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
    if (hm_get_layout_engine() != HMLayoutEngineYogaKit) {
        if (!objc_getAssociatedObject(self, &SHADOW_VIEW_KEY)) {
            HMRenderObject *renderObj = [HMUIManager.sharedInstance createRenderObjectWithView:self];
            objc_setAssociatedObject(self, &SHADOW_VIEW_KEY, renderObj, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
            
            return renderObj;
        }
        
        return objc_getAssociatedObject(self, &SHADOW_VIEW_KEY);
    }

    return (id <HMLayoutStyleProtocol>) self.yoga;
}

- (BOOL)isHmLayoutEnabled {
    if (hm_get_layout_engine() != HMLayoutEngineYogaKit) {
        return objc_getAssociatedObject(self, &SHADOW_VIEW_KEY) != nil;
    } else {
        // 存在 yoga 对象
        if (self.isYogaEnabled) {
            YGLayout *layout = ((YGLayout *) self.hm_renderObject);
            
            return layout.isEnabled && layout.isIncludedInLayout;
        } else {
            //兼容
            return NO;
        }
    }
}

- (void)hm_disableIncludedInLayout {
    if (hm_get_layout_engine() == HMLayoutEngineYogaKit) {
        self.isHmLayoutEnabled = NO;
    }
}

- (void)setIsHmLayoutEnabled:(BOOL)isHmLayoutEnabled {
    if (isHmLayoutEnabled) {
        if (hm_get_layout_engine() != HMLayoutEngineYogaKit) {
            [self hm_renderObject];
        } else {
            ((YGLayout *) self.hm_renderObject).isEnabled = YES;
            ((YGLayout *) self.hm_renderObject).isIncludedInLayout = YES;
        }
    } else {
        if (hm_get_layout_engine() != HMLayoutEngineYogaKit) {
            objc_setAssociatedObject(self, &SHADOW_VIEW_KEY, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        } else {
            ((YGLayout *) self.hm_renderObject).isEnabled = NO;
            ((YGLayout *) self.hm_renderObject).isIncludedInLayout = NO;
        }
    }
}

- (void)hm_configureLayoutWithBlock:(HMLayoutConfigurationBlock)block {
    if (block == nil) {
        return;
    }
    self.isHmLayoutEnabled = YES;
    if (hm_get_layout_engine() != HMLayoutEngineYogaKit) {
        block(self.hm_renderObject);
    } else {
        [self configureLayoutWithBlock:^(YGLayout * _Nonnull layout) {
            block(self.hm_renderObject);
        }];
    }
}

#pragma mark - interface compatible

- (CGSize)hm_sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize {
    if (hm_get_layout_engine() != HMLayoutEngineYogaKit) {
        return [HMUIManager.sharedInstance calculateLayout:self minimumSize:minimumSize maximumSize:maximumSize];
    } else {
        return [((YGLayout *) self.hm_renderObject) sizeThatFitsMinimumSize:minimumSize maximumSize:maximumSize];
    }
}

- (CGSize)hm_sizeThatFits:(CGSize)size {
    return [self hm_sizeThatFitsMinimumSize:CGSizeZero maximumSize:size];
}

- (void)hm_applyLayoutPreservingOrigin:(BOOL)preserveOrigin {
    if (hm_get_layout_engine() != HMLayoutEngineYogaKit) {
        [HMUIManager.sharedInstance applyLayout:self preservingOrigin:preserveOrigin size:self.bounds.size];
    } else {
        [((YGLayout *) self.hm_renderObject) applyLayoutPreservingOrigin:preserveOrigin];
    }
}

@end
