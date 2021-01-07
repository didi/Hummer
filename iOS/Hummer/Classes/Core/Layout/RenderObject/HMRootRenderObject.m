//
//  HMRootRenderObject.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/29.
//

#import "HMRootRenderObject.h"

@implementation HMRootRenderObject

- (instancetype)init {
    if (self = [super init]) {
        _baseDirection = YOGA_TYPE_WRAPPER(YGDirectionLTR);
        _minimumSize = CGSizeZero;
        _availableSize = CGSizeMake(INFINITY, INFINITY);
    }

    return self;
}

- (void)layoutWithAffectedShadowViews:(NSHashTable<HMRenderObject *> *)affectedShadowViews {
    NSHashTable<NSString *> *other = [NSHashTable new];

    HMLayoutContext layoutContext = {};
    layoutContext.absolutePosition = CGPointZero;
    layoutContext.affectedShadowViews = affectedShadowViews;
    layoutContext.other = other;

    [self.renderObject layoutWithMinimumSize:_minimumSize
                                 maximumSize:_availableSize
                             layoutDirection:HMUIKitLayoutDirectionFromYogaLayoutDirection(_baseDirection)
                               layoutContext:layoutContext];
}

@end
