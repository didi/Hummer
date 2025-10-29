//
//  HMRootVIew.m
//  Hummer
//
//  Created by didi on 2023/6/13.
//

#import "HMRootVIew.h"
#import "UIView+HMRenderObject.h"
#import "HMAnimationManager.h"
#import "UIView+HMDom.h"

@implementation HMRootView

- (instancetype)initWithFrame:(CGRect)frame context:(HMJSContext *)context {
    self = [super initWithFrame:frame];
    if(self){
        _context = context;
        [self hm_configureLayoutWithBlock:nil];
    }
    return self;
}

- (void)hm_layoutYogaRootView {
    NSAssert(NSThread.isMainThread, @"必须是主线程");
    // 如果本视图位于 Yoga 视图树中
    // isYogaEnabled 防止多余 YGLayout 创建
    if (self.isHmLayoutEnabled) {
        NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
        [self hm_applyLayoutPreservingOrigin:YES affectedShadowViews:affectedShadowViews];
        NSMutableArray *subviews = [NSMutableArray new];
        [HMAnimationManager notifyStartAnimation];
        if (affectedShadowViews.count > 0) {
            NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;
            id<HMLayoutStyleProtocol> value = nil;
            while ((value = enumerator.nextObject)) {
                [value.view hm_layoutBackgroundColorImageBorderShadowCornerRadius];
                [subviews addObject:value.view];
            }
        }
        if(self.delegate && [self.delegate respondsToSelector:@selector(rootView:didLayoutSubviews:)]){

            HMSafeMainThread(^{
                [self.delegate rootView:self didLayoutSubviews:subviews];
            });
        }
    }
}
@end
