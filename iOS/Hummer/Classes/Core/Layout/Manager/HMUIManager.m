//
//  HMUIManager.m
//  Hummer
//
//  Created by didi on 2020/9/27.
//

#import "HMUIManager.h"
#import "HMRenderObject.h"
#import "HMRootRenderObject.h"
#import "UIView+HMRenderObject.h"
#import "HMUtility.h"
#import "HMLabel.h"
#import "HMInput.h"
#import "HMTextArea.h"
#import "HMImageView.h"
#import "HMSwitch.h"
#import "HMMeasureRenderObject.h"
#import "HMCompatibleRenderObject.h"
#import "HMTextRenderObject.h"
#import "UIView+HMDom.h"
#import "HMYogaUtility.h"
#import "UIView+HMAnimation.h"
#import "UIView+HMAttribute.h"

NS_ASSUME_NONNULL_BEGIN

// 使用双属性控制显示，只对非 YogaKit 模式生效
const BOOL HMUseDoubleAttributeControlHidden = YES;

@interface HMUIManager ()

@property (nonatomic, nullable, copy) NSDictionary<NSString *, Class> *renderObjectMap;

- (nullable Class)renderObjectForView:(Class)viewCls;

@end

NS_ASSUME_NONNULL_END

@implementation HMUIManager

- (instancetype)init {
    self = [super init];
    if (self) {
        _renderObjectMap = @{};
        if (hm_get_layout_engine() != HMLayoutEngineRenderObjectCompatible) {
            [self registerRenderObject:HMTextRenderObject.class forView:HMLabel.class];
            [self registerRenderObject:HMTextRenderObject.class forView:HMInput.class];
            [self registerRenderObject:HMTextRenderObject.class forView:HMTextArea.class];
            [self registerRenderObject:HMMeasureRenderObject.class forView:HMImageView.class];
            [self registerRenderObject:HMMeasureRenderObject.class forView:HMSwitch.class];
        }
    }

    return self;
}

- (void)registerRenderObject:(Class)cls forView:(Class)viewCls {
    NSMutableDictionary<NSString *, Class> *renderObjectMap = _renderObjectMap.mutableCopy;
    _renderObjectMap = nil;
    renderObjectMap[NSStringFromClass(viewCls)] = cls;
    _renderObjectMap = renderObjectMap.copy;
}

- (nullable Class)renderObjectForView:(Class)viewCls {
    return self.renderObjectMap[NSStringFromClass(viewCls)];
}

+ (instancetype)sharedInstance {
    static id _sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });

    return _sharedInstance;
}

- (HMRenderObject *)createRenderObjectWithView:(UIView *)view {
    Class renderObjectCls = [self renderObjectForView:view.class];
    if (!renderObjectCls) {
        if (hm_get_layout_engine() == HMLayoutEngineRenderObjectCompatible) {
            renderObjectCls = HMCompatibleRenderObject.class;
        } else {
            renderObjectCls = HMRenderObject.class;
        }
    }
    HMRenderObject *render = (HMRenderObject *) [[renderObjectCls alloc] init];
    render.view = view;

    return render;
}

- (void)applyLayout:(UIView *)rootView preservingOrigin:(BOOL)preserveOrigin size:(CGSize)size affectedShadowViews:(nullable NSHashTable<HMRenderObject *> *)affectedShadowViews {
    [self applyLayoutPreservingOrigin:preserveOrigin view:rootView affectedShadowViews:affectedShadowViews];
}

- (void)applyLayoutPreservingOrigin:(BOOL)preserveOrigin dimensionFlexibility:(HummerDimensionFlexibility)dimensionFlexibility view:(UIView *)view affectedShadowViews:(NSHashTable<HMRenderObject *> *)affectedShadowViews {
    [self attachRenderObjectFromViewHierarchyForRootView:view];

    if (!affectedShadowViews) {
        affectedShadowViews = [NSHashTable weakObjectsHashTable];
    }
    HMRenderObject *renderObject = (HMRenderObject *) view.hm_renderObject;
    HMRootRenderObject *rootRenderObject = [[HMRootRenderObject alloc] init];
    rootRenderObject.renderObject = renderObject;
    
    // 最小大小直接忽略
    CGSize oldMinimumSize = CGSizeMake(HMCoreGraphicsFloatFromYogaValue(YOGA_TYPE_WRAPPER(YGNodeStyleGetMinWidth)(renderObject.yogaNode), 0), HMCoreGraphicsFloatFromYogaValue(YOGA_TYPE_WRAPPER(YGNodeStyleGetMinHeight)(renderObject.yogaNode), 0));
    if (!CGSizeEqualToSize(oldMinimumSize, rootRenderObject.minimumSize)) {
        rootRenderObject.minimumSize = oldMinimumSize;
    }
    // 默认直接使用 rootView 大小
    rootRenderObject.availableSize = view.bounds.size;
    if (dimensionFlexibility & HummerDimensionFlexibilityWidth) {
        CGSize availableSize = rootRenderObject.availableSize;
        availableSize.width = CGFLOAT_MAX;
        rootRenderObject.availableSize = availableSize;
    }
    if (dimensionFlexibility & HummerDimensionFlexibilityHeight) {
        CGSize availableSize = rootRenderObject.availableSize;
        availableSize.height = CGFLOAT_MAX;
        rootRenderObject.availableSize = availableSize;
    }
    [rootRenderObject layoutWithAffectedShadowViews:affectedShadowViews];

    if (affectedShadowViews.count <= 0) {
        // no frame change results in no UI update block
        return;
    }
    for (HMRenderObject *shadowView in affectedShadowViews) {
        HMLayoutMetrics layoutMetrics = shadowView.layoutMetrics;
        UIView *inlineView = shadowView.view;
        hm_safe_main_thread(^{
            inlineView.hm_animationPropertyBounds = inlineView.bounds;
            inlineView.hm_animationPropertyCenter = inlineView.center;
            CGRect frame = layoutMetrics.frame;
            // 只有在 HMDisplayTypeNone 或 visibility: hidden 情况下，隐藏视图
            BOOL isHidden = layoutMetrics.displayType == HMDisplayTypeNone || inlineView.hm_visibility == YES;
            if (inlineView.isHidden != isHidden) {
                inlineView.hidden = isHidden;
            }
            if (view == inlineView) {
                // 需要继承上次的 origin
                if (preserveOrigin) {
                    frame = (CGRect) {
                            .origin = {
                                    .x = (CGRectGetMinX(frame) + inlineView.frame.origin.x),
                                    .y = (CGRectGetMinY(frame) + inlineView.frame.origin.y),
                            },
                            .size = frame.size
                    };
                }
            }
            [inlineView hummerSetFrame:frame];
        });
    }
}

- (void)applyLayoutPreservingOrigin:(BOOL)preserveOrigin view:(UIView *)view affectedShadowViews:(NSHashTable<HMRenderObject *> *)affectedShadowViews {
    [self applyLayoutPreservingOrigin:preserveOrigin dimensionFlexibility:0 view:view affectedShadowViews:affectedShadowViews];
}

- (void)attachRenderObjectFromViewHierarchyForRootView:(UIView *)rootView {
    if (!rootView) {
        return;
    }
    HMRenderObject *const yoga = rootView.hm_renderObject;

    if (hm_get_layout_engine() == HMLayoutEngineRenderObjectCompatible) {
        // Only leaf nodes should have a measure function
        const YOGA_TYPE_WRAPPER(YGNodeRef) node = yoga.yogaNode;
        if (yoga.isLeaf) {
            [yoga removeAllSubviews];
            YOGA_TYPE_WRAPPER(YGNodeSetMeasureFunc)(node, HMCompatibleMeasure);
        } else {
            YOGA_TYPE_WRAPPER(YGNodeSetMeasureFunc)(node, NULL);
        }
    }
    NSMutableArray<HMRenderObject *> *subviewsToInclude = rootView.subviews.count > 0 ? [[NSMutableArray alloc] initWithCapacity:rootView.subviews.count] : nil;
    [rootView.subviews enumerateObjectsUsingBlock:^(__kindof UIView *obj, NSUInteger idx, BOOL *stop) {
        if (obj.isHmLayoutEnabled) {
            [subviewsToInclude addObject:obj.hm_renderObject];
        }
    }];

    if (![yoga hasExactSameChildren:subviewsToInclude]) {
        [yoga removeAllSubviews];
        [subviewsToInclude enumerateObjectsUsingBlock:^(HMRenderObject *obj, NSUInteger idx, BOOL *stop) {
            [obj.superview removeSubview:obj];
            [yoga addSubview:obj];
        }];
    }

    [subviewsToInclude enumerateObjectsUsingBlock:^(HMRenderObject *obj, NSUInteger idx, BOOL *stop) {
        [self attachRenderObjectFromViewHierarchyForRootView:obj.view];
    }];
}

@end
