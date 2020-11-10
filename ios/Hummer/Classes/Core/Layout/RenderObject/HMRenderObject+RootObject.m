//
//  HMRenderObject+RootObject.m
//  Hummer
//
//  Created by didi on 2020/9/27.
//

#import "HMRenderObject+RootObject.h"
#import <objc/runtime.h>

@implementation HMRenderObject (RootObject)

- (void)setMinimumSize:(CGSize)minimumSize {
    objc_setAssociatedObject(self, @selector(minimumSize), [NSValue valueWithCGSize:minimumSize], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CGSize)minimumSize {
    if (!objc_getAssociatedObject(self, _cmd)) {
        return CGSizeZero;
    }

    return [objc_getAssociatedObject(self, _cmd) CGSizeValue];
}

- (void)setAvailableSize:(CGSize)availableSize {
    objc_setAssociatedObject(self, @selector(availableSize), [NSValue valueWithCGSize:availableSize], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CGSize)availableSize {
    if (!objc_getAssociatedObject(self, _cmd)) {
        return CGSizeMake(INFINITY, INFINITY);
    }

    return [objc_getAssociatedObject(self, _cmd) CGSizeValue];
}

- (void)setBaseDirection:(YGDirection)baseDirection {
    objc_setAssociatedObject(self, @selector(baseDirection), @(baseDirection), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (YGDirection)baseDirection {
    if (!objc_getAssociatedObject(self, _cmd)) {
        return YGDirectionLTR;
    }

    return (YGDirection) [objc_getAssociatedObject(self, _cmd) intValue];
}

- (void)layoutWithAffectedShadowViews:(NSHashTable<HMRenderObject *> *)affectedShadowViews {
    NSHashTable<NSString *> *other = [NSHashTable new];

    HMLayoutContext layoutContext = {};
    layoutContext.absolutePosition = CGPointZero;
    layoutContext.affectedShadowViews = affectedShadowViews;
    layoutContext.other = other;

    [self layoutWithMinimumSize:self.minimumSize
                    maximumSize:self.availableSize
                layoutDirection:HMUIKitLayoutDirectionFromYogaLayoutDirection(self.baseDirection)
                  layoutContext:layoutContext];
}

@end
