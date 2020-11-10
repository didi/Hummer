//
//  HMUIManager.m
//  Hummer
//
//  Created by didi on 2020/9/27.
//

#import "HMUIManager.h"
#import "HMRenderObject.h"
#import "HMRenderObject+RootObject.h"
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

NS_ASSUME_NONNULL_BEGIN

@interface HMUIManager ()

@property (nonatomic, nullable, copy) NSDictionary<NSString *, Class> *renderObjectMap;

- (nullable Class)renderObjectForView:(Class)viewCls;

@end

NS_ASSUME_NONNULL_END

@implementation HMUIManager

- (instancetype)init {
    self = [super init];
    if (self) {
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

- (CGSize)calculateLayout:(UIView *)view minimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize {
    [self attachRenderObjectFromViewHierarchyForRootView:view];

    return [((HMRenderObject *) view.hm_renderObject) sizeThatFitsMinimumSize:minimumSize maximumSize:maximumSize];
}

- (void)applyLayout:(UIView *)rootView preservingOrigin:(BOOL)preserveOrigin size:(CGSize)size {
    [self attachRenderObjectFromViewHierarchyForRootView:rootView];

    NSHashTable<HMRenderObject *> *affectedShadowViews = [NSHashTable weakObjectsHashTable];
    HMRenderObject *rootObj = (HMRenderObject *) rootView.hm_renderObject;
    rootObj.minimumSize = size;
    rootObj.availableSize = size;
    [rootObj layoutWithAffectedShadowViews:affectedShadowViews];

    if (affectedShadowViews.count <= 0) {
        // no frame change results in no UI update block
        return;
    }
    for (HMRenderObject *shadowView in affectedShadowViews) {
        HMLayoutMetrics layoutMetrics = shadowView.layoutMetrics;
        UIView *view = shadowView.view;
        hm_safe_main_thread(^{
            CGRect frame = layoutMetrics.frame;
            BOOL isHidden = layoutMetrics.displayType == HMDisplayTypeNone;
            if (view.isHidden != isHidden) {
                view.hidden = isHidden;
            }
            if (rootView == view) {
                // 需要继承上次的 origin
                if (preserveOrigin) {
                    frame = (CGRect) {
                            .origin = {
                                    .x = (CGRectGetMinX(frame) + view.frame.origin.x),
                                    .y = (CGRectGetMinX(frame) + view.frame.origin.y),
                            },
                            .size = frame.size
                    };
                }
            }
            [view hummerSetFrame:frame];
        });
    }
}

- (void)attachRenderObjectFromViewHierarchyForRootView:(UIView *)rootView {
    if (!rootView) {
        return;
    }
    HMRenderObject *const yoga = rootView.hm_renderObject;

    if (hm_get_layout_engine() == HMLayoutEngineRenderObjectCompatible) {
        // Only leaf nodes should have a measure function
        const YGNodeRef node = yoga.yogaNode;
        if (yoga.isLeaf) {
            [yoga removeAllSubviews];
            YGNodeSetMeasureFunc(node, HMCompatibleMeasure);
        } else {
            YGNodeSetMeasureFunc(node, NULL);
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
            [yoga addSubview:obj];
        }];
    }

    [subviewsToInclude enumerateObjectsUsingBlock:^(HMRenderObject *obj, NSUInteger idx, BOOL *stop) {
        [self attachRenderObjectFromViewHierarchyForRootView:obj.view];
    }];
}

@end
