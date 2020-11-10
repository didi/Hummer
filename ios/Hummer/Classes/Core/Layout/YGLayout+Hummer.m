//
//  YGLayout+Hummer.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import "YGLayout+Hummer.h"
#import <YogaKit/YGLayout+Private.h>
#import <Hummer/HMUtility.h>
#import "UIView+HMRenderObject.h"
#import "HMCompatibleRenderObject.h"
#import "HMYogaUtility.h"

static void YGRemoveAllChildren(const YGNodeRef node) {
    if (node == NULL) {
        return;
    }

    YGNodeRemoveAllChildren(node);
}

static BOOL YGNodeHasExactSameChildren(const YGNodeRef node, NSArray<UIView *> *subviews) {
    if (YGNodeGetChildCount(node) != subviews.count) {
        return NO;
    }

    for (int i = 0; i < subviews.count; i++) {
        if (YGNodeGetChild(node, (uint32_t) i) != ((YGLayout *) subviews[(NSUInteger) i].hm_renderObject).node) {
            return NO;
        }
    }

    return YES;
}

static void YGAttachNodesFromViewHierarchy(UIView *const view) {
    YGLayout *const yoga = view.hm_renderObject;
    const YGNodeRef node = yoga.node;

    // Only leaf nodes should have a measure function
    if (yoga.isLeaf) {
        YGRemoveAllChildren(node);
        YGNodeSetMeasureFunc(node, HMCompatibleMeasure);
    } else {
        YGNodeSetMeasureFunc(node, NULL);

        NSMutableArray<UIView *> *subviewsToInclude = [[NSMutableArray alloc] initWithCapacity:view.subviews.count];
        for (UIView *subview in view.subviews) {
            if (((YGLayout *) subview.hm_renderObject).isEnabled && ((YGLayout *) subview.hm_renderObject).isIncludedInLayout) {
                [subviewsToInclude addObject:subview];
            }
        }

        if (!YGNodeHasExactSameChildren(node, subviewsToInclude)) {
            YGRemoveAllChildren(node);
            for (int i = 0; i < subviewsToInclude.count; i++) {
                YGNodeInsertChild(node, ((YGLayout *) subviewsToInclude[(NSUInteger) i].hm_renderObject).node, (uint32_t) i);
            }
        }

        for (UIView *const subview in subviewsToInclude) {
            YGAttachNodesFromViewHierarchy(subview);
        }
    }
}

static YGConfigRef get_global_config(void) {
    static YGConfigRef yogaConfig;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        yogaConfig = YGConfigNew();
        YGConfigSetPointScaleFactor(yogaConfig, (float) HMScreenScale());
        YGConfigSetExperimentalFeatureEnabled(yogaConfig, YGExperimentalFeatureWebFlexBasis, true);
    });

    return yogaConfig;
}

@implementation YGLayout (Hummer)

@dynamic view;
@dynamic top;
@dynamic left;
@dynamic bottom;
@dynamic right;
@dynamic start;
@dynamic end;
@dynamic width;
@dynamic height;
@dynamic minWidth;
@dynamic maxWidth;
@dynamic minHeight;
@dynamic maxHeight;
@dynamic borderWidth;
@dynamic borderTopWidth;
@dynamic borderLeftWidth;
@dynamic borderBottomWidth;
@dynamic borderRightWidth;
@dynamic borderStartWidth;
@dynamic borderEndWidth;
@dynamic margin;
@dynamic marginVertical;
@dynamic marginHorizontal;
@dynamic marginTop;
@dynamic marginLeft;
@dynamic marginBottom;
@dynamic marginRight;
@dynamic marginStart;
@dynamic marginEnd;
@dynamic padding;
@dynamic paddingVertical;
@dynamic paddingHorizontal;
@dynamic paddingTop;
@dynamic paddingLeft;
@dynamic paddingBottom;
@dynamic paddingRight;
@dynamic paddingStart;
@dynamic paddingEnd;
@dynamic flexDirection;
@dynamic justifyContent;
@dynamic alignSelf;
@dynamic alignItems;
@dynamic alignContent;
@dynamic position;
@dynamic flexWrap;
@dynamic display;
@dynamic flex;
@dynamic flexGrow;
@dynamic flexShrink;
@dynamic flexBasis;
@dynamic aspectRatio;
@dynamic direction;
@dynamic overflow;
@dynamic numberOfChildren;
@dynamic isDirty;
@dynamic isLeaf;

- (CGSize)sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize {
    // 标脏
    YGAttachNodesFromViewHierarchy(self.view);

    YGNodeRef clonedYogaNode = YGNodeClone(self.node);
    YGNodeRef constraintYogaNode = YGNodeNewWithConfig(get_global_config());

    YGNodeInsertChild(constraintYogaNode, clonedYogaNode, 0);
    YGNodeStyleSetMinWidth(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.width));
    YGNodeStyleSetMinHeight(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(minimumSize.height));
    YGNodeStyleSetMaxWidth(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(maximumSize.width));
    YGNodeStyleSetMaxHeight(constraintYogaNode, HMYogaFloatFromCoreGraphicsFloat(maximumSize.height));
    UIUserInterfaceLayoutDirection userInterfaceLayoutDirection;
    if (@available(iOS 10.0, *)) {
        userInterfaceLayoutDirection = self.view.effectiveUserInterfaceLayoutDirection;
    } else {
        // Fallback on earlier versions
        userInterfaceLayoutDirection = UIApplication.sharedApplication.userInterfaceLayoutDirection;
    }
    YGNodeCalculateLayout(
            constraintYogaNode,
            YGUndefined,
            YGUndefined,
            HMYogaLayoutDirectionFromUIKitLayoutDirection(userInterfaceLayoutDirection));

    CGSize measuredSize = (CGSize) {
            YGNodeLayoutGetWidth(constraintYogaNode),
            HMCoreGraphicsFloatFromYogaFloat(YGNodeLayoutGetHeight(constraintYogaNode)),
    };
    // 如果使用如下代码会泄漏
//    YGNodeRemoveChild(constraintYogaNode, clonedYogaNode);
//    YGNodeFree(constraintYogaNode);
//    YGNodeFree(clonedYogaNode);
    hm_yoga_node_free_recursive(constraintYogaNode);

    return measuredSize;
}

@end
